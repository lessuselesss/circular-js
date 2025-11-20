/**
 * End-to-End Tests for Circular Protocol JavaScript SDK
 * 
 * These tests run against REAL NAG endpoints to verify actual API functionality.
 * 
 * Environment Variables Required:
 * - CIRCULAR_TEST_ADDRESS: Test wallet address (required)
 * - CIRCULAR_NAG_URL: NAG endpoint URL (default: https://nag.circularlabs.io/NAG.php?cep=)
 * - CIRCULAR_TEST_BLOCKCHAIN: Blockchain ID (default: 0x8a20...)
 * - CIRCULAR_API_KEY: API key (optional)
 * 
 * Run: npm run test:e2e
 */

const CircularProtocolAPI = require('../CircularProtocolAPI');

// Skip E2E tests if test address is not provided
const TEST_ADDRESS = process.env.CIRCULAR_TEST_ADDRESS;
const describeIfAddress = TEST_ADDRESS ? describe : describe.skip;

describeIfAddress('Circular Protocol E2E Tests', () => {
    const NAG_URL = process.env.CIRCULAR_NAG_URL || 'https://nag.circularlabs.io/NAG.php?cep=';
    const BLOCKCHAIN = process.env.CIRCULAR_TEST_BLOCKCHAIN || '0x8a20bad5d22a2c9627543c5a27e5280d592eadd1feb5ce5ab1c399078ab53c02';
    const API_KEY = process.env.CIRCULAR_API_KEY || '';

    beforeAll(() => {
        CircularProtocolAPI.setNAGURL(NAG_URL);
        CircularProtocolAPI.setNAGKey(API_KEY);

        console.log('E2E Test Configuration:');
        console.log(`  NAG URL: ${NAG_URL}`);
        console.log(`  Blockchain: ${BLOCKCHAIN}`);
        console.log(`  Test Address: ${TEST_ADDRESS}`);
        console.log(`  API Key: ${API_KEY ? 'Set' : 'Not set'}`);
    });

    describe('Wallet Operations', () => {
        test('should check if wallet exists', async () => {
            const result = await CircularProtocolAPI.checkWallet(BLOCKCHAIN, TEST_ADDRESS);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('checkWallet result:', result);
        }, 30000); // 30s timeout for network calls

        test('should get wallet details', async () => {
            const result = await CircularProtocolAPI.getWallet(BLOCKCHAIN, TEST_ADDRESS);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getWallet result:', result);
        }, 30000);

        test('should get wallet balance', async () => {
            const result = await CircularProtocolAPI.getWalletBalance(BLOCKCHAIN, TEST_ADDRESS, 'CIRX');

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getWalletBalance result:', result);
        }, 30000);

        test('should get wallet nonce', async () => {
            const result = await CircularProtocolAPI.getWalletNonce(BLOCKCHAIN, TEST_ADDRESS);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getWalletNonce result:', result);
        }, 30000);

        test('should get latest transactions', async () => {
            const result = await CircularProtocolAPI.getLatestTransactions(BLOCKCHAIN, TEST_ADDRESS);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getLatestTransactions result:', result);
        }, 30000);
    });

    describe('Block Operations', () => {
        test('should get block count', async () => {
            const result = await CircularProtocolAPI.getBlockCount(BLOCKCHAIN);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            expect(result.Response).toBeDefined();
            console.log('getBlockCount result:', result);
        }, 30000);

        test('should get specific block', async () => {
            const result = await CircularProtocolAPI.getBlock(BLOCKCHAIN, 1);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getBlock result:', result);
        }, 30000);

        test('should get block range', async () => {
            const result = await CircularProtocolAPI.getBlockRange(BLOCKCHAIN, 1, 5);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getBlockRange result:', result);
        }, 30000);
    });

    describe('Network Operations', () => {
        test('should get analytics', async () => {
            const result = await CircularProtocolAPI.getAnalytics(BLOCKCHAIN);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getAnalytics result:', result);
        }, 30000);

        test('should get blockchains', async () => {
            const result = await CircularProtocolAPI.getBlockchains();

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getBlockchains result:', result);
        }, 30000);
    });

    describe('Asset Operations', () => {
        test('should get asset list', async () => {
            const result = await CircularProtocolAPI.getAssetList(BLOCKCHAIN);

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getAssetList result:', result);
        }, 30000);

        test('should get specific asset', async () => {
            const result = await CircularProtocolAPI.getAsset(BLOCKCHAIN, 'CIRX');

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getAsset result:', result);
        }, 30000);

        test('should get asset supply', async () => {
            const result = await CircularProtocolAPI.getAssetSupply(BLOCKCHAIN, 'CIRX');

            expect(result).toBeDefined();
            expect(result.Result).toBeDefined();
            console.log('getAssetSupply result:', result);
        }, 30000);
    });

    describe('Helper Functions', () => {
        test('should get formatted timestamp', () => {
            const timestamp = CircularProtocolAPI.getFormattedTimestamp();

            expect(timestamp).toBeDefined();
            expect(typeof timestamp).toBe('string');
            expect(timestamp).toMatch(/^\d{4}:\d{2}:\d{2}-\d{2}:\d{2}:\d{2}$/);
            console.log('getFormattedTimestamp result:', timestamp);
        });

        test('should convert string to hex and back', () => {
            const original = 'Hello, Circular!';
            const hex = CircularProtocolAPI.stringToHex(original);
            const decoded = CircularProtocolAPI.hexToString(hex);

            expect(hex).toBeDefined();
            expect(decoded).toBe(original);
            console.log(`stringToHex('${original}') = ${hex}`);
            console.log(`hexToString('${hex}') = ${decoded}`);
        });
    });
});
