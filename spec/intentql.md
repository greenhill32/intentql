# IntentQL Language Specification

**Version:** 0.1  
**Status:** Draft  
**Author:** Lee Manley
**Last Updated:** July 31, 2025

## Overview

IntentQL is a declarative query language designed for AI agents to discover and interact with web capabilities. It uses familiar SQL-like syntax to express intent and retrieve structured data from websites that expose their capabilities through standardized configuration files.

## Design Principles

- **Familiar**: Leverage SQL syntax that millions of developers already know
- **Declarative**: Express what you want, not how to get it
- **Cross-platform**: Query multiple websites with unified syntax
- **Permission-based**: Respect website boundaries and authentication
- **Future-proof**: Designed for native website implementation

## Basic Syntax

### SELECT Statements

Query data from website capabilities:

```sql
SELECT column1, column2, ...
FROM website.capability
WHERE condition
ORDER BY column
LIMIT number;
```

**Example:**
```sql
SELECT name, price, rating 
FROM amazon.products 
WHERE category = 'laptops' 
  AND price < 1000 
ORDER BY rating DESC 
LIMIT 10;
```

### INSERT Statements

Trigger actions on websites:

```sql
INSERT INTO website.capability (column1, column2, ...)
VALUES (value1, value2, ...);
```

**Example:**
```sql
INSERT INTO github.issues (repository, title, body, labels)
VALUES ('myorg/myrepo', 'Bug report', 'Description here', ['bug', 'urgent']);
```

### UPDATE Statements

Modify existing data:

```sql
UPDATE website.capability 
SET column1 = value1, column2 = value2
WHERE condition;
```

**Example:**
```sql
UPDATE shopify.products 
SET price = 29.99, inventory = 100
WHERE sku = 'ITEM-123';
```

### DELETE Statements

Remove data:

```sql
DELETE FROM website.capability
WHERE condition;
```

**Example:**
```sql
DELETE FROM twitter.tweets
WHERE id = '1234567890' AND author = 'me';
```

## Data Types

### Supported Types

- **STRING**: Text values, enclosed in single quotes
- **NUMBER**: Integer or decimal values
- **BOOLEAN**: `true` or `false`
- **DATE**: ISO 8601 format (`'2025-07-31'` or `'2025-07-31T10:30:00Z'`)
- **ARRAY**: JSON array syntax (`['item1', 'item2']`)
- **OBJECT**: JSON object syntax (`{'key': 'value'}`)

### Type Coercion

IntentQL automatically coerces compatible types:
- Numbers to strings when necessary
- String dates to DATE objects when in valid format
- Single values to arrays when capability expects arrays

## Operators

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equal | `price = 100` |
| `!=` or `<>` | Not equal | `status != 'sold'` |
| `<` | Less than | `price < 50` |
| `<=` | Less than or equal | `rating <= 4.0` |
| `>` | Greater than | `views > 1000` |
| `>=` | Greater than or equal | `date >= '2025-01-01'` |

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `AND` | Logical AND | `price < 100 AND rating > 4` |
| `OR` | Logical OR | `category = 'books' OR category = 'ebooks'` |
| `NOT` | Logical NOT | `NOT discontinued` |

### String Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `LIKE` | Pattern matching with `%` wildcards | `title LIKE '%python%'` |
| `ILIKE` | Case-insensitive LIKE | `name ILIKE '%SMITH%'` |
| `CONTAINS` | Substring search | `description CONTAINS 'machine learning'` |
| `STARTS_WITH` | Prefix match | `email STARTS_WITH 'admin'` |
| `ENDS_WITH` | Suffix match | `filename ENDS_WITH '.pdf'` |

### Array Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `IN` | Value in list | `status IN ['active', 'pending']` |
| `NOT IN` | Value not in list | `category NOT IN ['adult', 'restricted']` |
| `ANY` | Any array element matches | `ANY(tags) = 'urgent'` |
| `ALL` | All array elements match | `ALL(scores) > 0.8` |

## Functions

### Aggregate Functions

- `COUNT(*)`: Count rows
- `SUM(column)`: Sum numeric values
- `AVG(column)`: Average of numeric values
- `MIN(column)`: Minimum value
- `MAX(column)`: Maximum value

### String Functions

- `UPPER(column)`: Convert to uppercase
- `LOWER(column)`: Convert to lowercase
- `LENGTH(column)`: String length
- `TRIM(column)`: Remove whitespace

### Date Functions

- `NOW()`: Current timestamp
- `TODAY()`: Current date
- `DATE_ADD(date, interval)`: Add time interval
- `DATE_SUB(date, interval)`: Subtract time interval

**Example:**
```sql
SELECT title, UPPER(category), DATE_ADD(created_at, '7 days') as expires
FROM blog.posts 
WHERE created_at > DATE_SUB(NOW(), '30 days');
```

## Cross-Site Queries

Query multiple websites in a single statement:

```sql
SELECT site, product_name, price
FROM amazon.products, ebay.products, shopify.products
WHERE category = 'electronics' 
  AND price < 100
ORDER BY price ASC;
```

**Union queries:**
```sql
SELECT name, price FROM amazon.products WHERE category = 'books'
UNION
SELECT title as name, cost as price FROM library.books WHERE available = true;
```

## Authentication

Queries requiring authentication use the `AUTH` clause:

```sql
SELECT * FROM github.repositories 
WHERE owner = 'me' 
AUTH 'github-token-123';
```

Or with named authentication:

```sql
SELECT * FROM shopify.orders
WHERE status = 'pending'
AUTH USING 'shopify-admin';
```

## Error Handling

### Common Errors

- **Capability Not Found**: `404: github.nonexistent not found`
- **Authentication Required**: `401: github.repositories requires authentication`
- **Permission Denied**: `403: Cannot access private repositories`
- **Invalid Syntax**: `400: Invalid WHERE clause syntax`
- **Rate Limited**: `429: Too many requests, retry after 60 seconds`

### Error Response Format

```json
{
  "error": {
    "code": 404,
    "message": "Capability not found",
    "details": "amazon.invalidcapability does not exist",
    "suggestion": "Try: amazon.products, amazon.orders, amazon.reviews"
  }
}
```

## Capability Discovery

Discover available capabilities for a website:

```sql
DESCRIBE amazon;
```

Returns:
```json
{
  "capabilities": [
    "products",
    "orders", 
    "reviews",
    "cart"
  ],
  "auth_required": ["orders", "cart"]
}
```

Get detailed capability information:

```sql
DESCRIBE amazon.products;
```

Returns schema information including available fields, filters, and operations.

## Limitations

### Current Limitations

- **No JOINs**: Cross-site relationships not supported in v0.1
- **No Subqueries**: Nested queries not implemented
- **Limited Transactions**: Multi-step operations not atomic
- **No Stored Procedures**: Custom logic not supported

### Future Considerations

- **GraphQL Integration**: Potential mapping from IntentQL to GraphQL
- **Real-time Subscriptions**: WebSocket-based live queries
- **Batch Operations**: Multiple operations in single request
- **Custom Functions**: Website-specific function extensions

## Implementation Notes

### For Website Developers

1. **Capability Definition**: Define capabilities in `agent.json`
2. **Query Parsing**: Parse IntentQL and convert to native operations
3. **Response Format**: Return structured JSON responses
4. **Error Handling**: Implement standard error codes and messages
5. **Rate Limiting**: Protect against abuse with appropriate limits

### For Agent Developers

1. **Discovery**: Always check `agent.json` before querying
2. **Authentication**: Handle auth flows gracefully
3. **Error Recovery**: Implement retry logic for rate limits
4. **Caching**: Cache capability definitions and common queries
5. **Fallbacks**: Graceful degradation when IntentQL unavailable

## Version History

- **v0.1** (July 2025): Initial specification
  - Basic CRUD operations
  - SQL-like syntax
  - Cross-site queries
  - Authentication framework

## Contributing

This specification is open source and community-driven. Contributions welcome:

- **GitHub**: [github.com/intentql/spec](https://github.com/intentql/spec)
- **Discussions**: Use GitHub Discussions for proposals
- **Issues**: Report problems or suggest improvements
- **Pull Requests**: Submit changes with clear rationale

---

*IntentQL is an open standard for the agentic web. Join us in building the future of human-AI-web interaction.*
