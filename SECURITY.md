# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Circular Protocol team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the project maintainers.

Please include the following information:

- Type of issue (e.g., code injection, improper validation, etc.)
- Full paths of source file(s) related to the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt within 48 hours
2. **Investigation**: We will investigate and determine severity
3. **Updates**: We will keep you informed about progress
4. **Resolution**: Once fixed, we will release a security patch

## Security Best Practices

### 1. API Keys and Secrets

- **Never commit API keys or private keys** to version control
- Use environment variables or secure secret management
- Rotate API keys regularly

```javascript
// Good: Load from environment
const api = new CircularProtocolAPI(
    process.env.CIRCULAR_NAG_URL,
    process.env.CIRCULAR_API_KEY
);

// Bad: Hardcoded credentials
const api = new CircularProtocolAPI(
    "https://nag.circularlabs.io/NAG.php?cep=",
    "my-secret-key-123" // Don't do this!
);
```

### 2. Private Key Management

- **Never expose private keys** in logs or client-side code
- Store private keys securely
- Never transmit private keys over insecure channels

### 3. Input Validation

- Always validate and sanitize user inputs
- Verify addresses are properly formatted
- Check transaction amounts are within expected ranges

### 4. Network Security

- Always use HTTPS for API communications
- Verify SSL/TLS certificates
- Use timeouts to prevent hanging connections

### 5. Transaction Security

- Always verify transaction details before signing
- Use nonces correctly to prevent replay attacks
- Double-check recipient addresses

## Security Updates

Security updates will be announced through:

- GitHub Security Advisories
- Release notes
- Project README

---

**Last Updated**: November 2024
