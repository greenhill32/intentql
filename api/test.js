module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

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
```

Click **Save** (Vercel auto-deploys).

Wait 10 seconds for green checkmark.

---

### Step 2: Test with Claude (2 minutes)

Create a **new Claude conversation** (important: new chat, not this one).

Paste this prompt exactly:
```
You are an AI agent testing a GraphQL gateway to Shopify.

Endpoint: https://intentql-dev-git-main-yourname.vercel.app/api/test

Send a POST request with this GraphQL query:
{
  products(first: 3) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}

Report:
1. Did the request succeed?
2. What products came back?
3. Any errors?
