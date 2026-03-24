# BUGBOT — src/offer/

> Watches for unused schema definitions, stale code, and example clarity in offer service files.

## Code Quality
- **Unreferenced schema**: Delete `CreateOfferSchema` if nothing imports it — dead exports create confusion.
- **File-backed example payloads**: Replace JSON file reads with inline plain objects for readability.
- **Stale code**: Remove references to fields or methods that were already deleted elsewhere.

## Checklist
- [ ] All schemas in `schemas.js` are imported and used somewhere
- [ ] Example payloads are inline plain objects, not loaded from files
- [ ] No references to removed fields or methods remain in `service.js`
