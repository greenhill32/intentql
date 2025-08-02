# IntentQL
**Making Websites Agent-Ready**  
*The protocol for AI-first web interaction*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-0.2.0-blue.svg)](https://github.com/greenhill32/intentql/releases)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)](https://github.com/greenhill32/intentql)

## The Problem

AI agents are everywhere, but the web isn't ready for them.

Today's agents scrape HTML, guess at button meanings, and break every time you update your CSS. Your servers get hammered by inefficient crawlers trying to extract simple data like product prices or availability.

**There has to be a better way.**

## The Solution

IntentQL is the missing link between AI agents and websites.

Instead of agents scraping your HTML, they send clean requests for exactly what they need. Instead of building complex query infrastructure, you expose the APIs you already have.

**Your elevator pitch:** "Your website breaks every AI agent. We fix that in 5 minutes."

## Evolution: From Vision to Reality

**Original Vision (Early 2025):** 
SQL-like queries for agent-web interaction - a completely new protocol for the agentic web.

**Breakthrough (August 2025):**
Most websites already expose the data agents need through existing APIs. We don't need to reinvent infrastructure - we just need to make it discoverable.

## How It Works

### 1. Websites Publish Intent Maps
```json
// agent.json - your AI cheat sheet
{
  "intents": {
    "product_search": "/api/products?category={category}&max_price={price}",
    "order_status": "/api/orders/{order_id}",
    "inventory_check": "/api/inventory?sku={sku}"
  }
}
```

### 2. Agents Send Natural Language
```
User: "Show me red shoes under £100"
Agent: Understands intent → product_search
Maps to: /api/products?category=shoes&color=red&max_price=100
```

### 3. Clean, Structured Responses
```json
{
  "products": [
    {"name": "Red Nike Air", "price": 89.99, "stock": 12},
    {"name": "Crimson Boots", "price": 75.00, "stock": 3}
  ]
}
```

## Why This Changes Everything

**For Website Owners:**
- ✅ 5-minute setup using APIs you already have
- ✅ Reduce scraping load by 90%
- ✅ Turn AI traffic into revenue instead of costs
- ✅ Control exactly what agents can access

**For AI Developers:**
- ✅ Reliable data instead of fragile scraping
- ✅ Structured responses, not HTML parsing
- ✅ No more breaking when sites update
- ✅ Cross-site queries become possible

**For Users:**
- ✅ AI agents that actually work
- ✅ Faster, more accurate responses
- ✅ Better shopping, booking, research experiences

## Implementation Phases

**Phase 1: API Discovery (Current Focus)**
Map natural language intents to existing API endpoints. Quick wins, immediate adoption.

**Phase 2: Advanced Querying (Original Vision)**
Full SQL-like syntax for complex cross-site queries and advanced agent interactions.

## Quick Start

### For E-commerce Sites
```json
{
  "intents": {
    "search_products": "/api/products?q={query}&category={category}&max_price={max_price}",
    "check_stock": "/api/products/{product_id}/stock",
    "get_reviews": "/api/products/{product_id}/reviews?limit={limit}"
  }
}
```

### For Content Sites
```json
{
  "intents": {
    "search_articles": "/api/articles?q={query}&category={category}&since={date}",
    "get_article": "/api/articles/{article_id}",
    "trending_topics": "/api/trending?period={timeframe}"
  }
}
```

## Current Status

🚀 **Active Development** - Real implementations happening now

**Completed:**
- [x] Core concept and specification
- [x] API-first implementation strategy
- [x] Community building and feedback
- [x] Early adopter outreach

**In Progress:**
- [ ] Reference implementations for major platforms
- [ ] WordPress plugin for easy adoption
- [ ] Shopify app for e-commerce sites
- [ ] Developer tools and documentation

**Coming Soon:**
- [ ] Interactive playground and demos
- [ ] Integration with major AI platforms
- [ ] Enterprise tooling and analytics

## Get Involved

**I'm looking for:**
- Technical co-founders excited about this vision
- Early adopter websites willing to implement
- AI developers wanting reliable web data
- Contributors to help build the ecosystem

**This isn't just a project - it's the infrastructure layer for the agentic web.**

## Real Talk

I had this idea because I saw the future: billions of AI agents trying to interact with websites built for humans. The current approach (scraping) doesn't scale.

The breakthrough was realizing we don't need to rebuild the web - we just need to make existing APIs discoverable to agents.

If you're building AI agents, you need this.
If you're running websites, you need this.
If you see the agentic web coming, you need this.

## Contact & Community

- **Creator:** Lee Manley
- **Email:** [your-email]
- **Website:** https://intentql.dev
- **GitHub:** https://github.com/greenhill32/intentql
- **Twitter:** [your-twitter] - Follow the journey

---

**"We built HTML for humans. Now we're building IntentQL for agents."**

*Join us in making the web agent-ready.*
