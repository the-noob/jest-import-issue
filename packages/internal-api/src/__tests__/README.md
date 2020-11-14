
## Structure
Tests are separated in 2 categories 
- `schema` - making sure that no unintended changes are introduced to the previously advertised schema
- `validation` - tests for the static validation (`Joi`) rules

## Conventions

A test suite description has the name of the entity quoted as the first word.  
Tests just describe the situation without reference to the entity.

```
 PASS packages/internal-api/src/__tests__/bookingType/validation/AddArrangementTypeInput.js
  "AddArrangementTypeInput" validation rules
    ✓ Fails with empty input (14ms)
    ✓ Fails with invalid name null [Null] (2ms)
    ✓ Fails with invalid name '' [empty string] (1ms)
    ✓ Fails with invalid name "q" [string] (1ms)
    ✓ Passes with valid input {"id":"9cecd97e-204b-41eb-a3bf-12eca1a71ce5","name":"Disco"} [object] (1ms)

```