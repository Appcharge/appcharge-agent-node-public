# BUGBOT — src/order/
> Auto-generated from PR review analysis. Do not edit manually.
> Last updated: 2026-03-23

This directory received the most review feedback in the repo (7 inline comments across `router.js` and `service.js`).

## Issue Categories

### Security — Redundant Signature Header on Outbound Calls
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| `signature` header included in requests to the reporting API even though it was removed from that contract; publisher token is sufficient | `router.js`, `service.js` | ~2 comments |

**Example review comment:**
> "I believe we removed the signature when sending requests to reporting api and assets upload services"

> "remove all signatures from requests to the gateways, publisher token should be enough"

---

### Code Quality — Dead `secretsService` Object
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| A `secretsService` object that wraps env vars is defined inline at the top of the router but is never used by route handlers | `router.js` | ~2 comments |

**Example review comment:**
> "it was written a long time ago, I didn't touch this. I can remove this to make it easier to understand"

---

### Code Quality — Over-engineering for a Sample Repo
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| Joi schema validation + `GetOrdersRequest` model parsing layers add complexity that makes the example hard to read; plain objects would communicate intent more clearly | `router.js` | ~1 comment |

**Example review comment:**
> "wouldn't it make more sense to put examples with plain objects instead of doing double validations on the input and letting them figure out the request body from the Joi validation?"

---

### Code Style — `module.exports` at Top of File
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| `module.exports = router` appears at line 7, before any route handlers are defined | `router.js` | ~1 comment |

**Example review comment:**
> "move to bottom of the file"

## Action Items
- [ ] Remove the `signature` header from all axios calls in `service.js` and `router.js`
- [ ] Delete the unused `secretsService` inline object from `router.js`
- [ ] Move `module.exports = router` to the bottom of `router.js`
- [ ] Simplify the route handler to use a plain JSON body example rather than Joi + model parsing
