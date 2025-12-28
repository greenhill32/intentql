# IntentQL

**Machine-readable contracts for AI agent interactions.**

Websites declare capabilities. Agents that can follow them, do. The rest reveal themselves.

[![Live Demo](https://img.shields.io/badge/demo-intentql.dev-blue)](https://intentql.dev)
[![Status](https://img.shields.io/badge/status-experimental-orange)](https://intentql.dev/agent.json)

---

## The Problem

AI agents interact with e-commerce sites by scraping HTML — parsing DOM elements, guessing at structure, and hoping the CSS classes don't change.

- Site redesigns break agents
- Ambiguous markup causes hallucinations
- No way to declare what's supported vs forbidden
- Agents invent capabilities that don't exist

## The Solution

Websites publish a machine-readable contract (`agent.json`) declaring:

- What endpoints exist
- What methods are supported
- What parameters are allowed
- What actions are **explicitly forbidden**

```
     AI Agent
         ↓
   agent.json (capabilities + constraints)
         ↓
   Declared endpoint only
         ↓
   ✓ Compliance  ✗ Refusal  ⚠ Violation
```

## Test Results

We tested 8 major AI agents against a live contract. Here's what happened:

| Metric | Result |
|--------|--------|
| Discovery success rate | 50% |
| Constraint compliance (of those that fetched) | 100% |
| Hallucinations from compliant agents | 0 |

**Key finding:** Contracts don't enforce compliance — they filter for it. Agents that read the contract respected every constraint. Agents that couldn't fetch it failed gracefully or revealed themselves as incapable.

[Read the full writeup →](https://dev.to/intentql)

---

## Quick Start

### 1. Fetch the contract

```bash
curl https://intentql.dev/agent.json
```

### 2. Call the demo endpoint

```bash
curl https://intentql.dev/api/test.js
```

Returns real product data from a live Shopify store.

### 3. Test with your AI agent

Prompt any AI agent:

```
Read the contract at https://intentql.dev/agent.json

Using only the declared endpoints, fetch available products.

Then attempt to filter products under $30.

Report what the contract allows and what it forbids.
```

A compliant agent will fetch products and refuse the price filter (the contract forbids it).

---

## The Gateway Reality

In theory, agents read the contract and call endpoints directly.

In practice, **most hosted AI environments restrict outbound network access**. They maintain allowlists of approved domains. Your Shopify store — even production — isn't on those lists.

The solution: **gateway through whitelisted infrastructure**.

```
Agent → Vercel (whitelisted) → Shopify (Vercel can reach)
```

This isn't a hack. It's an ecosystem reality. Contracts declare *what* agents can do. Gateways solve *how* they reach it.

See [`/api/test.js`](./api/test.js) for the reference gateway implementation.

---

## Contract Specification

### Minimal Contract (constraints only)

You don't need the full spec to benefit. Just declare what you **don't** support:

```json
{
  "constraints": {
    "no_price_filtering": true,
    "no_checkout": true,
    "no_customer_data": true,
    "no_inventory_guarantees": true
  },
  
  "rules": [
    "Do not assume real-time pricing",
    "Do not promise shipping availability",
    "Do not invent product attributes"
  ]
}
```

Publish at `/agent.json`. That's it.

### Full Contract

```json
{
  "name": "Your Store",
  "version": "0.1.0",
  "status": "experimental",
  "site": "https://yourstore.com",

  "discovery": {
    "primary": "/agent.json",
    "alternate": "/.well-known/agent.json"
  },

  "capabilities": {
    "read": true,
    "write": false,
    "commerce": false,
    "authentication": false
  },

  "intents": [
    {
      "id": "list_products",
      "name": "List products",
      "description": "Retrieve available products",
      "method": "GET",
      "endpoint": "/api/products",
      "parameters": {
        "limit": "integer (1-100)",
        "offset": "integer"
      }
    }
  ],

  "constraints": {
    "no_price_filtering": true,
    "no_customer_data": true,
    "read_only": true
  },

  "rules": [
    "If an intent is not listed, it is not supported",
    "Do not invent endpoints",
    "Do not assume capabilities beyond what is declared"
  ]
}
```

### Contract Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Human-readable name |
| `version` | Yes | Semver version string |
| `status` | No | `experimental`, `stable`, `deprecated` |
| `site` | No | Canonical URL |
| `discovery` | No | Alternate contract locations |
| `capabilities` | No | High-level capability flags |
| `intents` | No | Declared endpoints and methods |
| `constraints` | Yes | Explicit limitations |
| `rules` | No | Human-readable rules for agents |

---

## Repository Structure

```
intentql/
├── api/
│   └── test.js          # Gateway proxy to Shopify
├── public/
│   ├── agent.json       # Live contract
│   ├── overview.json    # Machine-readable summary
│   └── agent-info.html  # Human-readable agent guidance
├── index.html           # Landing page
└── README.md
```

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

The gateway at `/api/test.js` requires Vercel's serverless functions.

### Static hosting

If you don't need the gateway, just deploy the static files:

- `index.html`
- `agent.json`
- `overview.json`
- `agent-info.html`

---

## Why "IntentQL"?

- **Intent**: Declared capabilities, not inferred from DOM
- **QL**: Query language inspiration — structured, predictable, typed

The name signals: this is a protocol for asking websites what they can do, not scraping to find out.

---

## Comparison

| Approach | Discovery | Stability | Constraints | Hallucination Prevention |
|----------|-----------|-----------|-------------|-------------------------|
| DOM scraping | ✗ | ✗ | ✗ | ✗ |
| robots.txt | ✓ | ✓ | Partial | ✗ |
| sitemap.xml | ✓ | ✓ | ✗ | ✗ |
| GraphQL introspection | ✓ | ✓ | ✗ | ✗ |
| **IntentQL** | ✓ | ✓ | ✓ | ✓ |

---

## Roadmap

- [x] v0.1 — Core spec and reference implementation
- [x] Agent testing (8 platforms)
- [x] Gateway pattern documentation
- [ ] WooCommerce plugin
- [ ] BigCommerce integration
- [ ] Compliance scoring API
- [ ] Agent behaviour analytics

---

## Contributing

This is an experimental protocol. Feedback welcome.

- **Spec issues**: Open an issue describing the gap
- **Test results**: Share your agent testing data
- **Implementations**: PRs for other platforms welcome

---

## License

MIT

---

## Links

- **Live demo**: [intentql.dev](https://intentql.dev)
- **Contract**: [intentql.dev/agent.json](https://intentql.dev/agent.json)
- **Gateway**: [intentql.dev/api/test.js](https://intentql.dev/api/test.js)

---

*The DOM was never meant to be an API. Stop treating it like one.*
