module.exports = async function handler(req, res) {
  // Accept both GET and POST
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get query from POST body or GET params
  const query = req.method === 'POST' ? req.body.query : req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing GraphQL query' });
  }

  try {
    // Call Shopify Storefront API
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
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
