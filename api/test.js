module.exports = async function handler(req, res) {
  let query;

  // Try to get query from POST body (JSON)
  if (req.body && req.body.query) {
    query = req.body.query;
  } 
  // Try to get query from GET params
  else if (req.query && req.query.query) {
    query = req.query.query;
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing GraphQL query. Send as POST with { "query": "..." }' });
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
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

Click **Save**.

Then test with Claude:
```
Send a POST request to https://intentql.dev/api/test.js

Body (JSON):
{
  "query": "{ products(first: 3) { edges { node { id title handle } } } }"
}

What comes back?
