
# Circular Layer 1 Blockchain Protocol Interface Library

The **Circular Layer 1 Blockchain Protocol Interface Library** is a powerful JavaScript library developed by Circular Global Ledgers, Inc. for seamless integration with the Circular blockchain ecosystem. This open-source library offers a comprehensive suite of tools designed for efficient and secure interaction with blockchain networks, managing wallets, assets, smart contracts, and more.

## 🔥 **Key Features**

- **Blockchain Interaction**: Effortlessly connect and interact with Circular's blockchain networks, enabling various network operations.
- **Smart Contracts**: Deploy, test, and interact with smart contracts with ease and efficiency.
- **Wallet Management**: Create, retrieve, and manage blockchain wallets, track balances, and execute wallet operations.
- **Asset Management**: Issue and manage assets, handle transfers, and retrieve detailed information about assets and their supply.
- **Domain Management**: Resolve blockchain domain names to wallet addresses, ensuring a secure and reliable address lookup.
- **Transaction Management**: Send transactions, track status, search and validate transactions within the blockchain.
- **Analytics**: Access and retrieve analytical data and insights related to blockchain performance and activities.

## 🚀 **Getting Started**

### Installation

To integrate the Circular library into your project, include the library directly in your HTML or JavaScript files:

```html
<script src="path_to_circular_library.js"></script>
```

Ensure you also load dependencies like `crypto-js`, `elliptic` and `sha256` from CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/elliptic/6.5.4/elliptic.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/build/sha256.min.js"></script>
```

## 📜 **API Reference**

For detailed information on all available methods and parameters, refer to the [API Documentation](https://circular-protocol.gitbook.io/circular-sdk/api-docs/javascript). Below is a summary of key functions:

- **`setNAGKey(key)`**: Sets the Network Access Gateway key.
- **`registerWallet(blockchain, publicKey)`**: Registers a wallet on the specified blockchain.
- **`getWalletBalance(blockchain, address, asset)`**: Retrieves the balance of a specific asset for the given wallet.
- **`sendTransaction(id, from, to, timestamp, type, payload, nonce, signature, blockchain)`**: Sends a transaction on the specified blockchain.

... and many more!

## Testing

The SDK includes comprehensive test coverage:

### Unit Tests
Test individual API methods with mocked network calls:
```bash
npm test
```

### Integration Tests  
Test multiple components working together:
```bash
npm test -- __tests__/integration.test.js
```

### E2E Tests
Test against real NAG endpoints (requires test wallet address):
```bash
# Set test wallet address
export CIRCULAR_TEST_ADDRESS=0x742d35Cc6634C0532925a3b8...

# Run E2E tests
npm run test:e2e
```

#### E2E Configuration
- `CIRCULAR_TEST_ADDRESS` (required) - Test wallet address
- `CIRCULAR_NAG_URL` (optional) - Custom NAG endpoint
- `CIRCULAR_TEST_BLOCKCHAIN` (optional) - Blockchain ID
- `CIRCULAR_API_KEY` (optional) - API key

For more details, see [E2E_TESTING.md](./E2E_TESTING.md).

### Coverage
View test coverage report:
```bash
npm run test:coverage
```

## 🤝 **Contributing**

Contributions to the Circular Library are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

Ensure to follow the contribution guidelines and code of conduct.

## 📄 **License**

This project is open-source and available under the MIT License for both private and commercial use.

## 📌 **Version**

- Current Version: **1.0.8**
- Last Update: **10/18/2024**

## 👥 **Authors and Acknowledgment**

- **Originator**: Gianluca De Novi, PhD
- **Contributors**: Danny De Novi, Ashley Barr

## 📧 **Contact**

For support or collaboration opportunities, please reach out to [info@circularlabs.io](mailto:info@circularlabs.io).
