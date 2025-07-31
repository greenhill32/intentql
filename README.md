# IntentQL

**SQL for the Agentic Web**  
*An open standard for AI-first websites*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue.svg)](https://github.com/intentql/spec/releases)
[![Status](https://img.shields.io/badge/Status-Draft-orange.svg)](https://github.com/intentql/spec)

## The Problem

AI agents today interact with websites by scraping HTML, parsing DOM structures, and simulating user interactions. This approach is brittle, inefficient, and breaks whenever sites update their UI. The web needs a better way for agents to discover and interact with website capabilities.

## The Solution

IntentQL defines a standard for AI-first websites. Sites expose their capabilities through structured metadata, and agents express their intent using familiar SQL-like syntax.

```sql
-- Instead of fragile HTML scraping...
SELECT name, price, rating 
FROM ecommerce.products 
WHERE category = 'laptops' 
  AND price < 1000 
ORDER BY rating DESC;
```

## Core Components

### 1. [IntentQL Query Language](spec/intentql.md)
SQL-like syntax for expressing agent intent across websites.

### 2. [Agent Metadata (agent.json)](spec/agent.json.md)  
How websites expose their capabilities to AI agents.

### 3. [Status Endpoints (status.json)](spec/status.json.md)
How websites communicate real-time state and availability.

## Quick Example

**Website exposes capabilities:**
```json
// agent.json
{
  "version": "0.1.0",
  "capabilities": {
    "search": {
      "table": "products",
      "fields": ["name", "price", "rating", "category"],
      "filters": ["category", "price", "rating"]
    }
  }
}
```

**Agent queries the site:**
```sql
SELECT name, price FROM products WHERE category = 'books' AND price < 20;
```

**Website returns structured data:**
```json
{
  "data": [
    {"name": "Python Crash Course", "price": 15.99},
    {"name": "Clean Code", "price": 18.50}
  ]
}
```

## Why IntentQL?

- **🧠 AI-Native**: Designed for the agentic web that's coming
- **📊 Familiar**: Leverages SQL, the world's most popular query language  
- **🔗 Cross-Platform**: Query multiple websites in a single statement
- **🛡️ Permission-Based**: Sites control what agents can access
- **⚡ Future-Proof**: Built for native website implementation

## Specification Status

🚧 **Draft Phase** - Seeking feedback and early adopters

- [x] Core language specification
- [x] Agent metadata format
- [x] Status endpoint specification  
- [ ] Reference implementation
- [ ] Demo websites
- [ ] Interactive playground

## Get Involved

### For Website Owners
- Implement `agent.json` to expose your site's capabilities
- Add IntentQL query endpoints to your API
- Join the early adopter program

### For AI Developers  
- Build IntentQL support into your agents
- Contribute to the specification
- Help design the standard

### For Contributors
- Review the [specification documents](spec/)
- Open issues for feedback and suggestions
- Submit PRs for improvements
- Join our [community discussions](https://github.com/intentql/spec/discussions)

## Roadmap

**v0.1** (Current)
- Basic query syntax
- Core metadata format
- Initial specification

**v0.2** (Next)
- Reference implementation
- Demo websites
- Interactive documentation

**v1.0** (Goal)
- Stable specification
- Production-ready tooling
- Industry adoption

## Contact

- **Email**: lee@intentql.dev
- **Website**: https://intentql.dev
- **GitHub**: https://github.com/intentql/spec

## License

This specification is released under the [MIT License](LICENSE).

---

*IntentQL is an open standard. Join us in building the infrastructure layer for the agentic web.*
