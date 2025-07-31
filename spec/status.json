# Status Endpoint Specification (status.json)

**Version:** 0.1  
**Status:** Draft  
**Last Updated:** July 31, 2025

## Overview

The status endpoint provides real-time information about a website's current state, availability, and operational status. This allows AI agents to make informed decisions about when and how to interact with site capabilities.

## Endpoint Location

The status endpoint should be accessible at:
```
https://example.com/.well-known/status.json
```

## Schema

### Root Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | Yes | IntentQL specification version |
| `timestamp` | string | Yes | ISO 8601 timestamp of status update |
| `status` | string | Yes | Overall site status: "operational", "degraded", "maintenance", "offline" |
| `capabilities` | object | No | Status of individual capabilities |
| `rate_limits` | object | No | Current rate limiting information |
| `maintenance` | object | No | Planned maintenance information |
| `errors` | array | No | Current error conditions |

### Capabilities Status

For each capability defined in agent.json:

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | "available", "limited", "unavailable" |
| `response_time_ms` | number | Average response time in milliseconds |
| `success_rate` | number | Success rate as decimal (0.0-1.0) |
| `last_updated` | string | ISO 8601 timestamp of last successful operation |

### Rate Limits

| Field | Type | Description |
|-------|------|-------------|
| `requests_per_minute` | number | Current rate limit per minute |
| `requests_remaining` | number | Requests remaining in current window |
| `reset_time` | string | ISO 8601 timestamp when limits reset |

### Maintenance

| Field | Type | Description |
|-------|------|-------------|
| `scheduled` | boolean | Whether maintenance is scheduled |
| `start_time` | string | ISO 8601 timestamp of maintenance start |
| `end_time` | string | ISO 8601 timestamp of maintenance end |
| `description` | string | Human-readable maintenance description |
| `affected_capabilities` | array | List of capabilities that will be affected |

## Examples

### Basic Status

```json
{
  "version": "0.1.0",
  "timestamp": "2025-07-31T14:30:00Z",
  "status": "operational"
}
```

### Detailed E-commerce Status

```json
{
  "version": "0.1.0",
  "timestamp": "2025-07-31T14:30:00Z",
  "status": "operational",
  "capabilities": {
    "search": {
      "status": "available",
      "response_time_ms": 125,
      "success_rate": 0.998,
      "last_updated": "2025-07-31T14:29:45Z"
    },
    "purchase": {
      "status": "limited",
      "response_time_ms": 2500,
      "success_rate": 0.892,
      "last_updated": "2025-07-31T14:28:12Z"
    },
    "inventory": {
      "status": "available",
      "response_time_ms": 89,
      "success_rate": 0.999,
      "last_updated": "2025-07-31T14:29:58Z"
    }
  },
  "rate_limits": {
    "requests_per_minute": 100,
    "requests_remaining": 73,
    "reset_time": "2025-07-31T14:31:00Z"
  }
}
```

### Maintenance Mode

```json
{
  "version": "0.1.0",
  "timestamp": "2025-07-31T14:30:00Z",
  "status": "maintenance",
  "maintenance": {
    "scheduled": true,
    "start_time": "2025-07-31T15:00:00Z",
    "end_time": "2025-07-31T17:00:00Z",
    "description": "Database migration and performance improvements",
    "affected_capabilities": ["purchase", "inventory"]
  },
  "capabilities": {
    "search": {
      "status": "available",
      "response_time_ms": 98,
      "success_rate": 1.0,
      "last_updated": "2025-07-31T14:29:55Z"
    },
    "purchase": {
      "status": "unavailable",
      "response_time_ms": 0,
      "success_rate": 0.0,
      "last_updated": "2025-07-31T13:45:22Z"
    }
  }
}
```

### Error Conditions

```json
{
  "version": "0.1.0",
  "timestamp": "2025-07-31T14:30:00Z",
  "status": "degraded",
  "capabilities": {
    "search": {
      "status": "limited",
      "response_time_ms": 3200,
      "success_rate": 0.756,
      "last_updated": "2025-07-31T14:29:12Z"
    }
  },
  "errors": [
    {
      "code": "EXTERNAL_API_TIMEOUT",
      "message": "Third-party search service experiencing delays",
      "severity": "warning",
      "timestamp": "2025-07-31T14:15:33Z"
    }
  ]
}
```

## Implementation Guidelines

### Update Frequency

- **High-traffic sites**: Update every 30-60 seconds
- **Medium-traffic sites**: Update every 2-5 minutes  
- **Low-traffic sites**: Update every 5-15 minutes
- **During incidents**: Update every 15-30 seconds

### Caching

- Set appropriate HTTP cache headers
- Recommend `Cache-Control: max-age=60` for normal operations
- Reduce cache time during incidents or maintenance

### Monitoring Integration

The status endpoint should reflect actual system health:

```javascript
// Example: Generate status from monitoring data
{
  "search": {
    "status": searchLatency < 1000 && searchSuccessRate > 0.95 ? "available" : "limited",
    "response_time_ms": calculateAverageLatency(searchMetrics),
    "success_rate": calculateSuccessRate(searchMetrics)
  }
}
```

### Agent Behavior

Agents should:

1. **Check status before queries**: Verify capability availability
2. **Respect rate limits**: Honor the specified request limits
3. **Handle degraded states**: Implement fallback strategies
4. **Cache status responses**: Avoid excessive status checks
5. **Graceful failure**: Handle offline/maintenance states appropriately

## Status Codes

| Status | Description | Agent Behavior |
|--------|-------------|----------------|
| `operational` | All systems functioning normally | Proceed with requests |
| `degraded` | Some capabilities limited | Check individual capability status |
| `maintenance` | Planned maintenance in progress | Defer non-critical requests |
| `offline` | Site unavailable | Retry later with exponential backoff |

## Security Considerations

- Status endpoints should not expose sensitive internal information
- Rate limit the status endpoint itself to prevent abuse
- Consider authentication for detailed operational metrics
- Sanitize error messages to avoid information leakage

## Future Extensions

Potential additions in future versions:

- **Geographic regions**: Status per region/datacenter
- **Service dependencies**: Status of external services
- **Historical data**: Basic uptime/performance history
- **Webhooks**: Real-time status change notifications

---

*This specification is part of the IntentQL standard for AI-first websites.*
