# BUGBOT — src/order/

> Watches for auth header leaks, dead code, export placement, and example complexity in order router and service.

## Security
- **Redundant signature header**: Remove `signature` from all outbound axios calls — publisher token is the only required auth.

## Code Quality
- **Dead inline objects**: Delete any helper object (e.g. env-var wrappers) defined at the top of the router but never used.
- **Over-engineered route handlers**: Use plain JSON body examples — avoid Joi + model parsing layers in sample code.
- **`module.exports` at top**: Move `module.exports = router` to the last line, after all route registrations.

## Checklist
- [ ] No `signature` header in any axios request in `router.js` or `service.js`
- [ ] No unused inline objects or variables in `router.js`
- [ ] `module.exports` is the last statement in `router.js`
- [ ] Route handlers use plain objects, not Joi schema + model parsing
