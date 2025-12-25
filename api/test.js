module.exports = async function handler(req, res) {
  // Set CORS headers for flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let query;

  // Try POST body first (most common for GraphQL)
  if (req.body && typeof req.body === 'object' && req.body.query) {
    query = req.body.query;
  }
  // Try GET query param
  else if (req.query && req.query.query) {
    query = req.query.query;
  }
  // Try parsing raw body if it's a string
  else if (req.body && typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      query = parsed.query;
    } catch (e) {
      // Not JSON, ignore
    }
  }

  // If still no query, return helpful error
  if (!query) {
    return res.status(400).json({
      error: 'Missing GraphQL query',
      usage: 'POST with JSON body: { "query": "{ shop { name } }" }',
      received: {
        method: req.method,
        bodyType: typeof req.body,
        hasQuery: !!req.query?.query
      }
    });
  }

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

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Shopify API call failed',
      message: error.message
    });
  }
};
