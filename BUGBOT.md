# BUGBOT — appcharge-agent-node-public
> Auto-generated from PR review analysis. Do not edit manually.
> Last updated: 2026-03-23

## Overview
PR reviews reveal three recurring themes: redundant HMAC signature headers being sent on outbound HTTP requests (even after the auth middleware already validates them), dead/unused code left in service and schema files, and overly complex request abstractions that make the sample code hard to follow. A single large PR (#3, 62 files) also drew direct feedback about PR size and missing unit tests.

## Issue Categories

### Security — Redundant Signature on Outbound Requests
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| Signature header sent on outbound calls to gateways/reporting/assets when publisher token alone should be sufficient | `src/order/service.js`, `src/order/router.js`, `src/player/player.service.js` | ~3 comments |

**Example review comment:**
> "remove all signatures from requests to the gateways, publisher token should be enough"

> "you already verify the signature in auth middleware, why do you need to send it again?"

---

### Code Quality — Dead / Unused Code
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| Unused `secretsService` object defined inline in router but never used | `src/order/router.js` | ~2 comments |
| `CreateOfferSchema` defined in schemas file but never referenced | `src/offer/schemas.js` | ~1 comment |
| Removed features/fields still present in service code | `src/offer/service.js` | ~1 comment |

**Example review comment:**
> "it was written by a long time ago, I didn't touch this. I can remove this to make it easier to understand" (on `secretsService` in router.js)

> "what CreateOfferSchema is used for?" (on an apparently unreferenced Joi schema)

---

### Code Quality — Over-engineering / Example Complexity
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| Double-layer validation + model parsing makes example code hard to read; plain objects would be clearer for a public sample repo | `src/order/router.js`, `src/offer/service.js` | ~2 comments |

**Example review comment:**
> "wouldn't it make more sense to put examples with plain objects instead of doing double validations on the input and letting them figure out the request body from the Joi validation?"

> "looks complicated to understand what the object should look like, maybe we should put plain objects instead"

---

### Code Style — Incorrect `module.exports` Placement
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| `module.exports = router` placed at the top of the file, before route handlers are registered | `src/order/router.js` | ~1 comment |

**Example review comment:**
> "move to bottom of the file" (on `module.exports` placed at line 7, before route registrations)

---

### Process — PR Size & Missing Tests
| Pattern | Affected Paths | Frequency |
|---------|---------------|-----------|
| Single PRs with 60+ file changes are unreviable; no unit tests accompany new services | Entire repo (PR #3) | ~1 PR-level review |

**Example review comment:**
> "there are 62 files changes in this PR. i have no idea how to review it like this or how to run sanity on that amount of changes. can you please open new PRs with smaller amount of changes? and please add unit tests if needed"

---

## Most Reviewed Areas
| Directory | Comment Count | Main Theme |
|-----------|--------------|------------|
| `src/order/` | 7 | Redundant signatures, dead code, over-engineering, export placement |
| `src/offer/` | 3 | Unused schema, complexity, dead code |
| `src/player/` | 2 | Redundant signature forwarding |

## Action Items
- [ ] Remove `signature` header from all outbound HTTP calls to reporting, assets-upload, and gateway services — publisher token (`x-publisher-token`) is the correct auth mechanism
- [ ] Delete unused code: `secretsService` object in `src/order/router.js` and `CreateOfferSchema` in `src/offer/schemas.js`
- [ ] Simplify example code (router and service layers) to use plain JSON objects rather than Joi validation + model classes, making the sample repo easier to follow
- [ ] Move all `module.exports` statements to the bottom of each file (after all route/class definitions)
- [ ] Break large PRs into focused, smaller changesets and add unit tests for new services
