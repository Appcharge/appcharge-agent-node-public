# BUGBOT — appcharge-agent-node-public

> Watches for auth header misuse, dead code, and over-engineered examples across this Node.js SDK sample repo.

## Security
- **Redundant signature on outbound calls**: Remove `signature` header from gateway/reporting requests — publisher token is sufficient.

## Code Quality
- **Dead code in router**: Delete unused objects and variables defined but never referenced by route handlers.
- **Unreferenced schema definitions**: Remove or wire up any Joi schema defined in `schemas.js` that nothing imports.
- **Stale references**: Audit service files for fields/methods that were removed elsewhere but still appear in code.
- **Over-engineered examples**: Use plain inline objects instead of Joi validation + model classes — this is a sample repo.
- **`module.exports` placement**: Always place `module.exports` at the bottom of the file, after all definitions.

## Process
- **PR size**: Keep PRs focused and small; large changesets are unreviable and block sanity checks.
- **Missing tests**: Accompany new services with unit tests.

## Checklist
- [ ] No `signature` header on outbound HTTP calls — use `x-publisher-token` only
- [ ] No unused variables, objects, or schema definitions in router/service files
- [ ] `module.exports` appears at the bottom of every file
- [ ] Example payloads use plain JSON objects, not validation layers
- [ ] PRs are scoped to a single concern with tests included
