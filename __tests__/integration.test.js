/**
 * Integration Tests for Circular Protocol JavaScript SDK
 * 
 * These tests verify that multiple SDK components work together correctly.
 * They use mocked network calls but test real integration scenarios.
 */

const CircularProtocolAPI = require('../CircularProtocolAPI');

// Mock fetch globally
global.fetch = jest.fn();

describe('Circular Protocol Integration Tests', () => {
    beforeEach(() => {
        fetch.mockClear();
        CircularProtocolAPI.setNAGURL('https://test.nag.url/');
        CircularProtocolAPI.setNAGKey('test-key');
    });

    describe('Wallet Registration Flow', () => {
        test('should register a wallet with proper payload structure', async () => {
            const mockResponse = {
                Result: 200,
                Response: { Status: 'Pending', TransactionID: 'reg123' }
            };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const publicKey = '04abcd1234ef...';
            const blockchain = 'MainNet';

            const result = await CircularProtocolAPI.registerWallet(blockchain, publicKey);

            expect(result.Result).toBe(200);
            expect(fetch).toHaveBeenCalledTimes(1);

            // Verify the transaction was properly formatted
            const callArgs = fetch.mock.calls[0];
            const body = JSON.parse(callArgs[1].body);

            expect(body.Type).toBe('C_TYPE_REGISTERWALLET');
            expect(body.Nonce).toBe('0');
            expect(body.Blockchain).toBe(blockchain);
        });
    });

    describe('Transaction Query Flow', () => {
        test('should search for transaction by ID across pending and blockchain', async () => {
            const mockResponse = {
                Result: 200,
                Response: {
                    ID: 'tx123',
                    Status: 'Confirmed',
                    BlockNumber: 100
                }
            };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await CircularProtocolAPI.getTransactionbyID(
                'MainNet',
                'tx123',
                0,
                10
            );

            expect(result.Result).toBe(200);
            expect(result.Response.Status).toBe('Confirmed');
        });
    });

    describe('Asset Management Flow', () => {
        test('should retrieve asset list and then specific asset details', async () => {
            // First call: get asset list
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    Result: 200,
                    Response: ['CIRX', 'TOKEN1', 'TOKEN2']
                }),
            });

            const assetList = await CircularProtocolAPI.getAssetList('MainNet');
            expect(assetList.Response).toContain('CIRX');

            // Second call: get specific asset
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    Result: 200,
                    Response: {
                        Name: 'CIRX',
                        Supply: 1000000,
                        Decimals: 8
                    }
                }),
            });

            const asset = await CircularProtocolAPI.getAsset('MainNet', 'CIRX');
            expect(asset.Response.Name).toBe('CIRX');
            expect(fetch).toHaveBeenCalledTimes(2);
        });
    });

    describe('Block Navigation Flow', () => {
        test('should get block count then retrieve block range', async () => {
            // First: get total block count
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    Result: 200,
                    Response: 1000
                }),
            });

            const blockCount = await CircularProtocolAPI.getBlockCount('MainNet');
            expect(blockCount.Response).toBe(1000);

            // Then: get recent blocks
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    Result: 200,
                    Response: [
                        { BlockNumber: 998, Transactions: [] },
                        { BlockNumber: 999, Transactions: [] },
                        { BlockNumber: 1000, Transactions: [] }
                    ]
                }),
            });

            const blocks = await CircularProtocolAPI.getBlockRange('MainNet', 998, 1000);
            expect(blocks.Response).toHaveLength(3);
            expect(fetch).toHaveBeenCalledTimes(2);
        });
    });

    describe('Configuration Management', () => {
        test('should maintain configuration across multiple calls', async () => {
            const customURL = 'https://custom.nag.url/';
            const customKey = 'custom-key-123';

            CircularProtocolAPI.setNAGURL(customURL);
            CircularProtocolAPI.setNAGKey(customKey);

            expect(CircularProtocolAPI.getNAGURL()).toBe(customURL);
            expect(CircularProtocolAPI.getNAGKey()).toBe(customKey);

            // Make a call and verify URL is used
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ Result: 200 }),
            });

            await CircularProtocolAPI.checkWallet('MainNet', '0x123');

            const callURL = fetch.mock.calls[0][0];
            expect(callURL).toContain(customURL);
        });
    });

    describe('Error Handling Flow', () => {
        test('should handle network errors gracefully across multiple calls', async () => {
            // First call fails
            fetch.mockRejectedValueOnce(new Error('Network timeout'));

            const result1 = await CircularProtocolAPI.checkWallet('MainNet', '0x123');
            expect(result1.Result).toBe(500);
            expect(result1.Response).toContain('Error:');

            // Second call succeeds
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ Result: 200, Response: { exists: true } }),
            });

            const result2 = await CircularProtocolAPI.checkWallet('MainNet', '0x123');
            expect(result2.Result).toBe(200);
        });
    });

    describe('Helper Functions Integration', () => {
        test('should use helpers in transaction preparation flow', () => {
            const message = 'Transaction payload';
            const hex = CircularProtocolAPI.stringToHex(message);

            expect(hex).toBeDefined();
            expect(typeof hex).toBe('string');

            // Verify roundtrip conversion
            const decoded = CircularProtocolAPI.hexToString(hex);
            expect(decoded).toBe(message);

            // Verify hex fix function
            const addressWithPrefix = '0xabcdef';
            const cleanAddress = CircularProtocolAPI.hexFix(addressWithPrefix);
            expect(cleanAddress).toBe('abcdef');
        });

        test('should generate proper timestamp format', () => {
            const timestamp = CircularProtocolAPI.getFormattedTimestamp();

            // Verify format: YYYY:MM:DD-hh:mm:ss
            expect(timestamp).toMatch(/^\d{4}:\d{2}:\d{2}-\d{2}:\d{2}:\d{2}$/);

            // Verify it's a recent timestamp
            const parts = timestamp.split(/[:\-]/);
            const year = parseInt(parts[0]);
            expect(year).toBeGreaterThanOrEqual(2025);
        });
    });
});
