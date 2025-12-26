// IntentQL Gateway - Shopify Storefront API Proxys
// With 3-stage tracking and agent identification

const SUPABASE_URL = 'https://vkhdclatcbszacdhmvhb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AgyxOAz7AUdQ82pgDGhKCg_yEvtHlVy';

// Fire-and-forget logging to Supabase
async function logRequest(data) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/agent_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
  } catch (e) {
    // Silent fail - don't block response
    console.error('[LOG_ERROR]', e.message);
  }
}

module.exports = async function handler(req, res) {
  const startTime = Date.now();
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Agent-Identity');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // === CAPTURE AGENT IDENTIFICATION ===
  // Priority: query param > header > unknown
  const agentIdentity = 
    req.query?.agent || 
    req.headers?.['x-agent-identity'] || 
    null;
  
  // === CAPTURE SOURCE (Stage 1 tracking) ===
  // If they came from reading the contract, source=contract
  const source = req.query?.source || 'direct';
  const stage1Pass = source === 'contract';

  // === GET QUERY ===
  let query;
  if (req.body && typeof req.body === 'object' && req.body.query) {
    query = req.body.query;
  } else if (req.query && req.query.query) {
    query = req.query.query;
  } else if (req.body && typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      query = parsed.query;
    } catch (e) {}
  }

  // Default query if none provided
  const isDefaultQuery = !query;
  if (!query) {
    query = `{
      products(first: 30, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }`;
  }

  // Determine query type for logging
  let queryType = 'custom';
  if (isDefaultQuery) {
    queryType = 'list_products';
  } else if (query.includes('query:')) {
    queryType = 'search';
  } else if (query.includes('product(')) {
    queryType = 'get_product';
  } else if (query.includes('products(')) {
    queryType = 'list_products';
  }

  // === CALL SHOPIFY ===
  let success = false;
  let productsReturned = 0;
  let errorMessage = null;
  let responseData = null;

  try {
    const shopifyUrl = 'https://intentql-demo-greenhill.myshopify.com/api/2024-01/graphql.json';

    const response = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '04739b9bd7254b9a6260d251ab16644e',
      },
      body: JSON.stringify({ query }),
    });

    responseData = await response.json();
    
    // Check for success and count products
    if (responseData?.data?.products?.edges) {
      productsReturned = responseData.data.products.edges.length;
      success = true;
    } else if (responseData?.data?.product) {
      productsReturned = 1;
      success = true;
    } else if (responseData?.errors) {
      errorMessage = responseData.errors[0]?.message || 'GraphQL error';
    } else {
      success = true; // Other valid response
    }

  } catch (error) {
    errorMessage = error.message;
    responseData = {
      error: 'Shopify API call failed',
      message: error.message
    };
  }

  const responseTime = Date.now() - startTime;

  // === Stage 3: Accuracy ===
  // Pass if we got real data back (success + products OR valid response)
  const stage3Pass = success && (productsReturned > 0 || !errorMessage);

  // === FIRE-AND-FORGET LOGGING ===
  // Don't await - let it run in background
  logRequest({
    user_agent: req.headers?.['user-agent'] || null,
    referer: req.headers?.['referer'] || null,
    agent_identity: agentIdentity,
    source: source,
    stage_1_discovery: stage1Pass,
    stage_2_execution: true, // Always true - they hit the right endpoint
    stage_3_accuracy: stage3Pass,
    query_type: queryType,
    query_text: query.substring(0, 500), // Truncate long queries
    success: success,
    products_returned: productsReturned,
    response_time_ms: responseTime,
    error_message: errorMessage
  });

  // Also log to Vercel console for debugging
  console.log('[AGENT_REQUEST]', JSON.stringify({
    time: new Date().toISOString(),
    agent: agentIdentity || 'unknown',
    source: source,
    stages: `${stage1Pass ? '✓' : '✗'}${true ? '✓' : '✗'}${stage3Pass ? '✓' : '✗'}`,
    products: productsReturned,
    ms: responseTime
  }));

  // === RETURN RESPONSE ===
  if (errorMessage && !success) {
    return res.status(500).json(responseData);
  }
  
  return res.status(200).json(responseData);
};
