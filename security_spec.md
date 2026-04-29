# Security Specification: Matdan Pledge Counter

## 1. Data Invariants
- **Immutability**: Counter document ID must be a valid alphanumeric string.
- **Monotonicity**: The `count` field must only increase by exactly 1 during an update.
- **Integrity**: `updatedAt` must always match `request.time`.
- **Strict Schema**: No keys other than `count` and `updatedAt` are permitted.

## 2. Dirty Dozen Payloads (Expect PERMISSION_DENIED)

| Test Case | Payload | Reason |
|-----------|---------|--------|
| 1. Decrease Count | `update({count: existingCount - 1})` | Violates monotonicity |
| 2. Jump Count | `update({count: existingCount + 5})` | Violates atomic increment (+1) |
| 3. Ghost Fields | `update({count: next, admin: true})` | Violates strict schema (hasOnly) |
| 4. Client Timestamp | `update({count: next, updatedAt: '2020-01-01'})` | Violates server timestamp rule |
| 5. Junk ID | `get('/counters/--INVALID--')` | Violates `isValidId` regex |
| 6. Negative Init | `create({count: -1})` | Violates `count >= 0` |
| 7. Wrong Type | `create({count: "1"})` | Violates type safety (is int) |
| 8. Missing Fields | `create({count: 1})` | Missing `updatedAt` key |
| 9. Excessive Size | `get('/counters/' + 'A' * 200)` | Violates ID size limit |
| 10. Shadow Create | `create({count: 1, dev: true})` | Violates exact size (2) |
| 11. List Denial | `list('/counters')` | List access is closed for privacy/cost |
| 12. Delete Denial | `delete('/counters/pledges')` | Delete is globally disabled |

## 3. Test Runner
See `firestore.rules.test.ts`.
