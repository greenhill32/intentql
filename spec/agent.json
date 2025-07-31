# agent.json Specification

**Version:** 0.1  
**Status:** Draft  
**Last Updated:** July 31, 2025

## Overview

The `agent.json` file is a standardized configuration that websites use to expose their capabilities to AI agents. It defines what actions agents can perform, what data they can access, and how to authenticate and interact with the website programmatically.

## File Location

The `agent.json` file must be hosted at the root of the website:

```
https://example.com/agent.json
```

Alternative locations (in order of precedence):
```
https://example.com/.well-known/agent.json
https://example.com/api/agent.json
```

## Schema Structure

### Root Object

```json
{
  "name": "string",
  "version": "string", 
  "description": "string",
  "base_url": "string",
  "capabilities": {},
  "auth": {},
  "rate_limits": {},
  "metadata": {}
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Human-readable website name |
| `version` | string | Specification version (semver) |
| `capabilities` | object | Available agent capabilities |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Website description for agents |
| `base_url` | string | Base URL for API endpoints |
| `auth` | object | Authentication configuration |
| `rate_limits` | object | Rate limiting information |
| `metadata` | object | Additional metadata |

## Capabilities

Each capability defines an action agents can perform:

```json
{
  "capabilities": {
    "search_products": {
      "description": "Search for products",
      "method": "GET",
      "endpoint": "/api/products",
      "parameters": {
        "query": {"type": "string", "required": true},
        "category": {"type": "string", "required": false},
        "min_price": {"type": "number", "required": false},
        "max_price": {"type": "number", "required": false}
      },
      "returns": {
        "id": {"type": "string"},
        "name": {"type": "string"},
        "price": {"type": "number"},
        "category": {"type": "string"},
        "image_url": {"type": "string"},
        "in_stock": {"type": "boolean"}
      },
      "auth_required": false,
      "rate_limit": "100/hour"
    }
  }
}
```

### Capability Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `description` | string | Yes | Human-readable capability description |
| `method` | string | Yes | HTTP method (GET, POST, PUT, DELETE) |
| `endpoint` | string | Yes | API endpoint path |
| `parameters` | object | No | Input parameters schema |
| `returns` | object | No | Response schema |
| `auth_required` | boolean | No | Whether authentication required (default: false) |
| `rate_limit` | string | No | Specific rate limit for this capability |

## Parameter Types

### Basic Types

```json
{
  "parameter_name": {
    "type": "string|number|boolean|date|array|object",
    "required": true|false,
    "description": "Parameter description",
    "default": "default_value",
    "enum": ["option1", "option2"],
    "min": 0,
    "max": 100,
    "pattern": "regex_pattern"
  }
}
```

### Array Parameters

```json
{
  "tags": {
    "type": "array",
    "items": {"type": "string"},
    "min_items": 1,
    "max_items": 10,
    "required": false
  }
}
```

### Object Parameters

```json
{
  "address": {
    "type": "object",
    "properties": {
      "street": {"type": "string", "required": true},
      "city": {"type": "string", "required": true},
      "postal_code": {"type": "string", "required": true}
    },
    "required": true
  }
}
```

## Authentication

### API Key Authentication

```json
{
  "auth": {
    "type": "api_key",
    "header": "X-API-Key",
    "description": "Get API key from account settings"
  }
}
```

### OAuth 2.0

```json
{
  "auth": {
    "type": "oauth2",
    "authorization_url": "https://example.com/oauth/authorize",
    "token_url": "https://example.com/oauth/token",
    "scopes": {
      "read": "Read access to public data",
      "write": "Create and modify data",
      "admin": "Full administrative access"
    }
  }
}
```

### Bearer Token

```json
{
  "auth": {
    "type": "bearer",
    "header": "Authorization",
    "format": "Bearer {token}",
    "description": "JWT token from login endpoint"
  }
}
```

### Basic Authentication

```json
{
  "auth": {
    "type": "basic",
    "description": "Username and password"
  }
}
```

## Rate Limits

### Global Rate Limits

```json
{
  "rate_limits": {
    "default": "1000/hour",
    "authenticated": "5000/hour", 
    "burst": "100/minute",
    "reset_header": "X-RateLimit-Reset",
    "remaining_header": "X-RateLimit-Remaining"
  }
}
```

### Rate Limit Formats

- `{number}/{period}`: e.g., `"100/hour"`, `"10/minute"`, `"1000/day"`
- Period units: `second`, `minute`, `hour`, `day`

## Response Format

### Successful Response

```json
{
  "data": [
    {
      "id": "123",
      "name": "Product Name",
      "price": 29.99,
      "category": "electronics",
      "image_url": "https://example.com/image.jpg",
      "in_stock": true
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}
```

### Error Response

```json
{
  "error": {
    "code": 400,
    "message": "Invalid parameter",
    "details": "Parameter 'category' must be one of: electronics, books, clothing",
    "field": "category"
  }
}
```

## Complete Examples

### E-commerce Site

```json
{
  "name": "Example Shop",
  "version": "1.0.0",
  "description": "Online retail store with products and orders",
  "base_url": "https://shop.example.com/api",
  "capabilities": {
    "search_products": {
      "description": "Search for products by various criteria",
      "method": "GET",
      "endpoint": "/products",
      "parameters": {
        "q": {"type": "string", "description": "Search query"},
        "category": {"type": "string", "enum": ["electronics", "books", "clothing"]},
        "min_price": {"type": "number", "min": 0},
        "max_price": {"type": "number", "min": 0},
        "in_stock": {"type": "boolean", "default": true}
      },
      "returns": {
        "id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"},
        "price": {"type": "number"},
        "category": {"type": "string"},
        "image_url": {"type": "string"},
        "in_stock": {"type": "boolean"},
        "rating": {"type": "number", "min": 0, "max": 5}
      }
    },
    "get_product": {
      "description": "Get detailed product information",
      "method": "GET", 
      "endpoint": "/products/{id}",
      "parameters": {
        "id": {"type": "string", "required": true}
      },
      "returns": {
        "id": {"type": "string"},
        "name": {"type": "string"},
        "description": {"type": "string"},
        "price": {"type": "number"},
        "category": {"type": "string"},
        "images": {"type": "array", "items": {"type": "string"}},
        "specifications": {"type": "object"},
        "reviews_count": {"type": "number"},
        "average_rating": {"type": "number"}
      }
    },
    "add_to_cart": {
      "description": "Add product to shopping cart",
      "method": "POST",
      "endpoint": "/cart/items",
      "parameters": {
        "product_id": {"type": "string", "required": true},
        "quantity": {"type": "number", "required": true, "min": 1}
      },
      "returns": {
        "cart_id": {"type": "string"},
        "item_count": {"type": "number"},
        "total_price": {"type": "number"}
      },
      "auth_required": true
    },
    "get_orders": {
      "description": "Get user's order history",
      "method": "GET",
      "endpoint": "/orders",
      "parameters": {
        "status": {"type": "string", "enum": ["pending", "shipped", "delivered", "cancelled"]},
        "limit": {"type": "number", "default": 10, "max": 100}
      },
      "returns": {
        "id": {"type": "string"},
        "status": {"type": "string"},
        "total": {"type": "number"},
        "created_at": {"type": "date"},
        "items": {"type": "array"}
      },
      "auth_required": true
    }
  },
  "auth": {
    "type": "api_key",
    "header": "X-API-Key",
    "description": "Get your API key from the account settings page"
  },
  "rate_limits": {
    "default": "1000/hour",
    "authenticated": "5000/hour"
  },
  "metadata": {
    "contact": "api@example.com",
    "documentation": "https://shop.example.com/api/docs",
    "terms_of_service": "https://shop.example.com/terms"
  }
}
```

### Social Media Platform

```json
{
  "name": "Social Platform",
  "version": "1.0.0",
  "description": "Social media platform for sharing and discovering content",
  "base_url": "https://social.example.com/api/v1",
  "capabilities": {
    "search_posts": {
      "description": "Search for posts by content or hashtags",
      "method": "GET",
      "endpoint": "/posts/search",
      "parameters": {
        "q": {"type": "string", "required": true},
        "hashtags": {"type": "array", "items": {"type": "string"}},
        "author": {"type": "string"},
        "since": {"type": "date"},
        "limit": {"type": "number", "default": 20, "max": 100}
      },
      "returns": {
        "id": {"type": "string"},
        "content": {"type": "string"},
        "author": {"type": "string"},
        "created_at": {"type": "date"},
        "likes": {"type": "number"},
        "replies": {"type": "number"},
        "hashtags": {"type": "array", "items": {"type": "string"}}
      }
    },
    "create_post": {
      "description": "Create a new post",
      "method": "POST",
      "endpoint": "/posts",
      "parameters": {
        "content": {"type": "string", "required": true, "max": 280},
        "hashtags": {"type": "array", "items": {"type": "string"}},
        "reply_to": {"type": "string"}
      },
      "returns": {
        "id": {"type": "string"},
        "content": {"type": "string"},
        "created_at": {"type": "date"},
        "url": {"type": "string"}
      },
      "auth_required": true,
      "rate_limit": "50/hour"
    }
  },
  "auth": {
    "type": "oauth2",
    "authorization_url": "https://social.example.com/oauth/authorize",
    "token_url": "https://social.example.com/oauth/token",
    "scopes": {
      "read": "Read posts and profile information",
      "write": "Create posts and interact with content"
    }
  }
}
```

## Validation

### JSON Schema

The `agent.json` format should validate against the official JSON Schema:

```
https://schema.intentql.dev/agent.json
```

### Validation Tools

- **Online Validator**: https://validator.intentql.dev
- **CLI Tool**: `npm install -g @intentql/validator`
- **GitHub Action**: Automatic validation in CI/CD

## Security Considerations

### Best Practices

1. **Principle of Least Privilege**: Only expose necessary capabilities
2. **Input Validation**: Validate all parameters server-side
3. **Rate Limiting**: Implement appropriate rate limits
4. **Authentication**: Require auth for sensitive operations
5. **HTTPS Only**: Always serve agent.json over HTTPS
6. **CORS**: Configure appropriate CORS headers

### Security Headers

```json
{
  "metadata": {
    "security": {
      "require_https": true,
      "cors_origins": ["https://trusted-agent.com"],
      "content_security_policy": "default-src 'self'"
    }
  }
}
```

## Implementation Checklist

### For Website Owners

- [ ] Create `agent.json` file
- [ ] Implement API endpoints
- [ ] Add authentication handling
- [ ] Set up rate limiting
- [ ] Add error handling
- [ ] Test with IntentQL queries
- [ ] Document capabilities
- [ ] Monitor usage and performance

### For Agent Developers

- [ ] Fetch and parse `agent.json`
- [ ] Validate capability requirements
- [ ] Implement authentication flows
- [ ] Handle rate limits gracefully
- [ ] Parse response formats
- [ ] Implement error recovery
- [ ] Cache capability definitions
- [ ] Respect website terms of service

## Versioning

### Semantic Versioning

agent.json follows semantic versioning:

- **Major** (1.0.0): Breaking changes to capabilities
- **Minor** (1.1.0): New capabilities or non-breaking changes
- **Patch** (1.1.1): Bug fixes and clarifications

### Compatibility

Agents should handle version differences gracefully:

```json
{
  "version": "1.2.0",
  "min_client_version": "1.0.0",
  "deprecated_capabilities": ["old_search"],
  "breaking_changes": []
}
```

## Future Extensions

### Planned Features

- **Webhooks**: Real-time notifications
- **Batch Operations**: Multiple operations in single request
- **GraphQL Integration**: Native GraphQL endpoint support
- **OpenAPI Integration**: Generate from OpenAPI specs
- **Caching Directives**: Response caching instructions

---

*The agent.json specification is part of the IntentQL open standard. Contribute at [github.com/intentql/spec](https://github.com/intentql/spec)*
