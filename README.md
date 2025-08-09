# IntentQL

## Making Websites Agent-Ready

**The open protocol for AI-first web interaction.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-0.2.0-blue.svg)](https://github.com/greenhill32/intentql/releases)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)](https://github.com/greenhill32/intentql)




## 🚨 The Problem

AI agents are everywhere — but the web isn't built for them.

Today’s agents scrape HTML, guess at button meanings, and break every time you update your CSS. Meanwhile, your servers get hammered by inefficient crawlers just to extract simple data like product prices or content availability.

There has to be a better way.

---

## 💡 The Solution

**IntentQL** is the missing link between AI agents and websites.

Instead of scraping HTML, agents can send clean, structured requests for exactly what they need. Instead of building new infrastructure, websites expose the APIs they already use.

**Elevator pitch:** *"Your website breaks every AI agent. We fix that in 5 minutes."*

---

## 🛠 How It Works

### 1. Websites Publish Intent Maps

A simple `agent.json` file describes what your site allows agents to do:

```json
{
  "intents": {
    "product_search": "/api/products?category={category}&max_price={price}",
    "order_status": "/api/orders/{order_id}",
    "inventory_check": "/api/inventory?sku={sku}"
  }
}
```

### 2. Agents Send Natural Language

User: *"Show me red shoes under £100"*
Agent understands intent → `product_search`
Mapped to: `/api/products?category=shoes&color=red&max_price=100`

### 3. Sites Respond with Structured Data

```json
{
  "products": [
    {"name": "Red Nike Air", "price": 89.99, "stock": 12},
    {"name": "Crimson Boots", "price": 75.00, "stock": 3}
  ]
}
```

---

## 🚀 Why This Changes Everything

### For Website Owners:

* ✅ 5-minute setup using APIs you already have
* ✅ Reduce scraping load dramatically
* ✅ Turn AI traffic into revenue instead of costs
* ✅ Control exactly what agents can access

### For AI Developers:

* ✅ Reliable data instead of fragile scraping
* ✅ Structured responses, not HTML parsing
* ✅ No breakage when sites update
* ✅ Enables cross-site queries as adoption grows

### For Users:

* ✅ Agents that actually work
* ✅ Faster, more accurate results
* ✅ Better shopping, booking, research experiences

---

## 📈 Evolution: From Vision to Reality

**Original Vision (Early 2025):** A new declarative query language — SQL for the agentic web.
**Breakthrough (August 2025):** Most sites already expose the needed data — we just need to make it discoverable.

---

## 🔄 Implementation Phases

* **Phase 1 (Now):** Intent mapping to existing APIs — fast, practical, deployable.
* **Phase 2 (Next):** Advanced SQL-like querying across multiple sites and data domains.

---

## ⚡ Quick Start Examples

### E-commerce

```json
{
  "intents": {
    "search_products": "/api/products?q={query}&category={category}&max_price={max_price}",
    "check_stock": "/api/products/{product_id}/stock",
    "get_reviews": "/api/products/{product_id}/reviews?limit={limit}"
  }
}
```

### Content Sites

```json
{
  "intents": {
    "search_articles": "/api/articles?q={query}&category={category}&since={date}",
    "get_article": "/api/articles/{article_id}",
    "trending_topics": "/api/trending?period={timeframe}"
  }
}
```

---
## 📌 Current Status

**Active Development — early stage**

### ✅ Completed
- Initial protocol concept (`agent.json`, `IntentQL` format)
- Draft specification published on GitHub
- Public website live ([intentql.dev](https://intentql.dev))

### 🔄 Early Work
- Reference examples (Next.js, Flask)
- Outreach to developers and AI builders
- Testing integration patterns with real APIs

### 🔜 Next Steps
- WordPress plugin
- Shopify app
- Developer tools and docs
- Interactive playground and testbed
## 🙌 Get Involved

We’re looking for:

* Developers and early adopters
* AI builders and agent developers
* Contributors and spec collaborators

📩 Contact: lee@intentql.dev
🌐 Website: [https://intentql.dev](https://intentql.dev)
🐙 GitHub: [https://github.com/greenhill32/intentql](https://github.com/greenhill32/intentql)

> *"We built HTML for humans. Now we’re building IntentQL for agents."*

Join us in making the web agent-ready.
