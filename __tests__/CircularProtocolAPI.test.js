const CircularProtocolAPI = require('../CircularProtocolAPI');

// Mock fetch globally
global.fetch = jest.fn();

describe('CircularProtocolAPI', () => {
    let api;

    beforeEach(() => {
        fetch.mockClear();
        // Reset API configuration if needed (though it's a singleton-like module)
        // Since the module returns an object with methods, we can't easily "reset" internal state 
        // like NAG_URL without using the setters.
        CircularProtocolAPI.setNAGURL('https://nag.circularlabs.io/NAG.php?cep=');
        CircularProtocolAPI.setNAGKey('');
    });

    test('should have correct version', () => {
        expect(CircularProtocolAPI.getVersion()).toBe('1.0.8');
    });

    test('should set and get NAG URL', () => {
        const newUrl = 'https://test.nag.url/';
        CircularProtocolAPI.setNAGURL(newUrl);
        expect(CircularProtocolAPI.getNAGURL()).toBe(newUrl);
    });

    test('should set and get NAG Key', () => {
        const newKey = 'test-api-key';
        CircularProtocolAPI.setNAGKey(newKey);
        expect(CircularProtocolAPI.getNAGKey()).toBe(newKey);
    });

    describe('checkWallet', () => {
        test('should call correct endpoint with correct data', async () => {
            const mockResponse = { Result: 200, Response: { exists: true } };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const blockchain = 'MainNet';
            const address = '0x1234567890abcdef';

            const result = await CircularProtocolAPI.checkWallet(blockchain, address);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('Circular_CheckWallet_'),
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: expect.any(String),
                })
            );

            const body = JSON.parse(fetch.mock.calls[0][1].body);
            expect(body).toEqual({
                Blockchain: 'MainNet',
                Address: '1234567890abcdef', // 0x stripped
                Version: '1.0.8'
            });

            expect(result).toEqual(mockResponse);
        });

        test('should handle API errors gracefully', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await CircularProtocolAPI.checkWallet('MainNet', '0x123');

            expect(result).toEqual({
                Result: 500,
                Response: 'Error: Network error'
            });
        });
    });

    describe('getWallet', () => {
        test('should call correct endpoint with correct data', async () => {
            const mockResponse = {
                Result: 200,
                Response: {
                    Address: '1234567890abcdef',
                    Balance: 100,
                    Nonce: 5
                }
            };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const blockchain = 'MainNet';
            const address = '0x1234567890abcdef';

            const result = await CircularProtocolAPI.getWallet(blockchain, address);

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('Circular_GetWallet_'),
                expect.objectContaining({
                    method: 'POST',
                    body: expect.any(String),
                })
            );

            const body = JSON.parse(fetch.mock.calls[0][1].body);
            expect(body).toEqual({
                Blockchain: 'MainNet',
                Address: '1234567890abcdef',
                Version: '1.0.8'
            });

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getLatestTransactions', () => {
        test('should retrieve transactions', async () => {
            const mockResponse = {
                Result: 200,
                Response: [
                    { ID: 'tx1', Amount: 10 },
                    { ID: 'tx2', Amount: 20 }
                ]
            };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await CircularProtocolAPI.getLatestTransactions('MainNet', '0x123');

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('Circular_GetLatestTransactions_'),
                expect.anything()
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('sendTransaction', () => {
        test('should format and send transaction correctly', async () => {
            const mockResponse = {
                Result: 200,
                Response: { Status: 'Pending', TransactionID: 'tx123' }
            };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await CircularProtocolAPI.sendTransaction(
                'tx123',           // ID
                '0xsender',        // From
                '0xreceiver',      // To
                '2025:11:20',      // Timestamp
                'C_TYPE_TX',       // Type
                'payload',         // Payload
                '1',               // Nonce
                'sig123',          // Signature
                'MainNet'          // Blockchain
            );

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('Circular_AddTransaction_'),
                expect.anything()
            );

            const body = JSON.parse(fetch.mock.calls[0][1].body);
            expect(body).toEqual({
                ID: 'tx123',
                From: 'sender',  // hexFix strips 0x prefix
                To: 'receiver',  // hexFix strips 0x prefix
                Timestamp: '2025:11:20',
                Type: 'C_TYPE_TX',
                Payload: 'payload',
                Nonce: '1',
                Signature: 'sig123',
                Blockchain: 'MainNet',
                Version: '1.0.8'
            });

            expect(result).toEqual(mockResponse);
        });
    });

    describe('Helper Functions', () => {
        test('hexFix should remove 0x prefix', () => {
            expect(CircularProtocolAPI.hexFix('0x123')).toBe('123');
            expect(CircularProtocolAPI.hexFix('123')).toBe('123');
            expect(CircularProtocolAPI.hexFix(123)).toBe(''); // Handles non-string gracefully?
        });

        test('stringToHex should convert string to hex', () => {
            expect(CircularProtocolAPI.stringToHex('abc')).toBe('616263');
        });

        test('hexToString should convert hex to string', () => {
            expect(CircularProtocolAPI.hexToString('616263')).toBe('abc');
            expect(CircularProtocolAPI.hexToString('0x616263')).toBe('abc');
        });
    });
});
