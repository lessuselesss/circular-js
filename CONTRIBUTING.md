# Contributing to Circular Protocol JavaScript SDK

Thank you for your interest in contributing to the Circular Protocol JavaScript SDK! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 14+ or Bun/Deno
- Git
- Basic understanding of the Circular Protocol blockchain

### Setting Up Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/circular-js.git
   cd circular-js
   ```

3. Add the upstream repository as a remote:
   ```bash
   git remote add upstream https://github.com/circular-protocol/circular-js.git
   ```

4. Install dependencies (when tests are added):
   ```bash
   npm install
   ```

## Development Workflow

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Write tests** for your changes (tests coming soon)

4. **Update documentation** as needed

5. **Commit your changes** using conventional commits

6. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```

7. **Open a Pull Request** against the `main` branch

## Coding Standards

### JavaScript Style Guidelines

- Use ES6+ features where appropriate
- Follow existing code style in CircularProtocolAPI.js
- Use meaningful variable and function names
- Add JSDoc comments for all public methods
- Keep functions focused and small

### Code Organization

- Group related functionality together
- Separate helper methods from core API methods
- Use consistent naming conventions (camelCase for methods)

### Example JSDoc Documentation

```javascript
/**
 * Check if a wallet exists on the blockchain
 * @param {Object} params - Request parameters
 * @param {string} params.Address - Wallet address (with or without 0x prefix)
 * @param {string} params.Blockchain - Blockchain network identifier
 * @param {string} [params.Version] - API version (auto-injected if not provided)
 * @returns {Promise<Object>} API response with wallet existence status
 * @throws {Error} If the API request fails
 */
async checkWallet(params) {
    // Implementation
}
```

## Testing

### Test Requirements (Coming Soon)

- All new features must include tests
- Aim for high test coverage (>80%)
- Include unit tests, integration tests, and e2e tests where appropriate

## Submitting Changes

### Pull Request Process

1. **Ensure compatibility** with Node.js, Bun, and Deno

2. **Update the README.md** if you're adding new features

3. **Update CHANGELOG.md** with your changes following [Keep a Changelog](https://keepachangelog.com/) format

4. **Ensure 100% backward compatibility** unless this is a major version bump

5. **Write a comprehensive PR description** including:
   - Overview of changes
   - Why the changes were made
   - Examples of usage (before/after if applicable)
   - Migration guide (if breaking changes)

### PR Title Format

Use conventional commits format:

```
<type>: <description>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests

**Examples:**
- `feat: add cryptographic helper methods`
- `fix: correct hex string preprocessing`
- `docs: add comprehensive API reference to README`

### PR Checklist

Your PR should include:

- [ ] Code follows JavaScript best practices
- [ ] Documentation updated (README, JSDoc comments)
- [ ] CHANGELOG.md updated
- [ ] No breaking changes (or clearly documented if unavoidable)
- [ ] Commit messages follow conventional commits
- [ ] Examples added for new features

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Examples

```
feat(helpers): add cryptographic helper methods

Add signMessage, verifySignature, getPublicKey, and hashString
methods for ECDSA secp256k1 operations.
```

```
fix(api): correct parameter preprocessing

Added hexFix utility to normalize hex strings by removing
0x prefix before sending to API.

Fixes #123
```

## Questions or Need Help?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Refer to the [official documentation](https://circular-protocol.gitbook.io)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Circular Protocol JavaScript SDK! 🎉
