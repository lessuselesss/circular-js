# E2E Testing Standards for Circular Protocol SDKs

## Overview

All Circular Protocol SDKs follow standardized E2E testing patterns based on the Go SDK's implementation. This ensures consistent testing methodology across all language implementations.

## Common Patterns

### 1. Environment-Based Configuration

All E2E tests use environment variables for configuration:

#### Required Variables
- `CIRCULAR_TEST_ADDRESS` - Test wallet address (must exist on blockchain)

#### Optional Variables
- `CIRCULAR_NAG_URL` - NAG endpoint URL (default: `https://nag.circularlabs.io/NAG.php?cep=`)
- `CIRCULAR_TEST_BLOCKCHAIN` - Blockchain ID (default: MainNet ID)
- `CIRCULAR_API_KEY` - API key for authenticated requests

### 2. Test Organization

E2E tests are organized by functional area:
- **Wallet Operations**: checkWallet, getWallet, getWalletBalance, getWalletNonce
- **Block Operations**: getBlock, getBlockRange, getBlockCount
- **Transaction Operations**: getTransactionbyID, getPendingTransaction, etc.
- **Asset Operations**: getAsset, getAssetList, getAssetSupply
- **Network Operations**: getAnalytics, getBlockchains
- **Domain Operations**: getDomain

### 3. Assertion Patterns

All E2E tests verify:
1. Response is defined
2. `Result` field is present and defined
3. Additional context-specific assertions

Example:
```javascript
expect(result).toBeDefined();
expect(result.Result).toBeDefined();
// Context-specific checks
```

### 4. Timeout Configuration

- Default timeout: 30 seconds per test
- Configurable via environment: `CIRCULAR_E2E_TIMEOUT`

## SDK-Specific Implementation

### Go SDK
- **Test File**: `circular_protocol_e2e_test.go`
- **Run Command**: `CIRCULAR_TEST_ADDRESS=0x... go test -v -tags=e2e`
- **Skip Behavior**: Automatically skips if env vars not present

### JavaScript SDK
- **Test File**: `__tests__/e2e.test.js`
- **Run Command**: `CIRCULAR_TEST_ADDRESS=0x... npm run test:e2e`
- **Skip Behavior**: Uses `describe.skip` if TEST_ADDRESS not set

### Python SDK
- **Test File**: `tests/test_e2e.py`
- **Run Command**: `CIRCULAR_TEST_ADDRESS=0x... pytest tests/test_e2e.py -v`
- **Skip Behavior**: Uses `pytest.mark.skipif` decorator

### PHP SDK
- **Test Files**: `tests/CircularProtocolE2ETest.php`
- **Run Command**: `CIRCULAR_TEST_ADDRESS=0x... phpunit tests/CircularProtocolE2ETest.php`
- **Skip Behavior**: Checks env vars in setUp()

### TypeScript SDK
- **Test Files**: `__tests__/e2e/*.test.ts`
- **Run Command**: `CIRCULAR_TEST_ADDRESS=0x... npm run test:e2e`
- **Skip Behavior**: Conditional test execution

### Dart SDK
- **Test Files**: `test/e2e_test.dart`
- **Run Command**: `CIRCULAR_TEST_ADDRESS=0x... dart test test/e2e_test.dart`
- **Skip Behavior**: Skips via testOn condition

## Running E2E Tests

### Quick Start (All SDKs)

```bash
# Set test address
export CIRCULAR_TEST_ADDRESS=0x742d35Cc6634C0532925a3b8...

# Optional: Use custom endpoint
export CIRCULAR_NAG_URL=https://custom-nag.example.com/

# Run tests (SDK-specific commands)
npm run test:e2e          # JavaScript/TypeScript
pytest tests/test_e2e.py  # Python  
go test -v -tags=e2e      # Go
phpunit tests/*E2ETest.php # PHP
dart test test/e2e_test.dart # Dart
```

### CI/CD Integration

E2E tests should:
1. Only run when `CIRCULAR_TEST_ADDRESS` is set
2. Use secrets management for sensitive values
3. Run against staging/test environment (not production)
4. Have longer timeouts than unit tests

Example GitHub Actions:
```yaml
- name: Run E2E Tests
  env:
    CIRCULAR_TEST_ADDRESS: ${{ secrets.TEST_ADDRESS }}
    CIRCULAR_NAG_URL: https://staging.nag.example.com/
  run: npm run test:e2e
```

## Best Practices

1. **Never commit test credentials** - Always use environment variables
2. **Use test wallets only** - Never use production wallets
3. **Expect network variability** - E2E tests may be slower/flaky
4. **Document test setup** - Include setup instructions in SDK READMEs
5. **Verify assertions** - Always check `Result` field in responses

## Adding New E2E Tests

When adding new API methods:

1. Add E2E test to appropriate test suite
2. Use environment-based configuration pattern
3. Add realistic assertions based on expected response
4. Update this document with new test coverage
5. Ensure backward compatibility

## Test Coverage Goals

Target coverage for E2E tests:
- ✅ All wallet operations
- ✅ All transaction query operations
- ✅ All block operations
- ✅ All asset operations
- ✅ Network/analytics operations
- ✅ Domain resolution
- ⚠️ Smart contract operations (limited - requires deployed contracts)
- ⚠️ Transaction submission (limited - requires signing)

## Troubleshooting

### Tests timeout
- Increase `CIRCULAR_E2E_TIMEOUT` environment variable
- Check NAG endpoint connectivity
- Verify blockchain is responsive

### Tests skip automatically
- Ensure `CIRCULAR_TEST_ADDRESS` is set
- Check environment variable names (case-sensitive)

### Unexpected failures
- Verify test address exists on blockchain
- Check NAG endpoint URL format
- Review API version compatibility
