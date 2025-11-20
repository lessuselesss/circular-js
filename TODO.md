# TODO

## High Priority

- [ ] Add testing infrastructure (Jest or similar)
- [ ] Add unit tests for all API methods
- [ ] Add integration tests
- [ ] Add E2E tests against live endpoints
- [ ] Add cryptographic helper methods (signMessage, verifySignature, getPublicKey, hashString)
- [ ] Add encoding helper methods (hexFix, stringToHex, hexToString, padNumber)
- [ ] Add advanced helper methods (getError, handleError, getTransactionOutcome)
- [ ] Add convenience method (registerWallet)
- [ ] Add JSDoc documentation for all methods
- [ ] Add TypeScript type definitions (.d.ts file)

## Medium Priority

- [ ] Improve error handling and validation
- [ ] Add request/response example documentation
- [ ] Create comprehensive README with all method signatures
- [ ] Add GitHub Actions for CI/CD
- [ ] Set up automated testing
- [ ] Add code coverage reporting
- [ ] Publish to npm registry

## Low Priority

- [ ] Add support for custom headers
- [ ] Add request retry logic
- [ ] Add rate limiting support
- [ ] Create detailed API reference documentation
- [ ] Add migration guide from v0.x to v1.x
- [ ] Consider dual API pattern (raw + convenience methods) like Go SDK

## Documentation

- [x] Add LICENSE
- [x] Add CONTRIBUTING.md
- [x] Add CODE_OF_CONDUCT.md
- [x] Add SECURITY.md
- [x] Add CHANGELOG.md
- [ ] Add AGENTS.md for AI agent collaboration guidelines
- [ ] Improve README with badges, installation instructions, and examples

## Notes

- This SDK is currently in a basic state (scored 26/100 on FOSS standards)
- Goal is to bring it to 90+ score by implementing the above items
- Maintain backwards compatibility with existing API
- Follow patterns established in other circular-* SDKs (Go, Python, TypeScript)
