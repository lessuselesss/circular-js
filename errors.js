/**
 * Custom error classes for Circular Protocol API
 * Modeled after Python SDK's comprehensive exception handling
 */

class CircularProtocolError extends Error {
    constructor(message, code = 500, response = null) {
        super(message);
        this.name = 'CircularProtocolError';
        this.code = code;
        this.response = response;
    }
}

class NetworkError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 500, response);
        this.name = 'NetworkError';
    }
}

class InvalidAddressError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 400, response);
        this.name = 'InvalidAddressError';
    }
}

class InvalidSignatureError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 119, response);
        this.name = 'InvalidSignatureError';
    }
}

class InvalidNonceError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 121, response);
        this.name = 'InvalidNonceError';
    }
}

class InvalidPayloadError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 117, response);
        this.name = 'InvalidPayloadError';
    }
}

class WalletNotFoundError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 404, response);
        this.name = 'WalletNotFoundError';
    }
}

class TransactionNotFoundError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 404, response);
        this.name = 'TransactionNotFoundError';
    }
}

class BlockNotFoundError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 404, response);
        this.name = 'BlockNotFoundError';
    }
}

class AssetNotFoundError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 404, response);
        this.name = 'AssetNotFoundError';
    }
}

class DomainNotFoundError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 404, response);
        this.name = 'DomainNotFoundError';
    }
}

class InsufficientBalanceError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 402, response);
        this.name = 'InsufficientBalanceError';
    }
}

class TimeoutError extends CircularProtocolError {
    constructor(message, response = null) {
        super(message, 408, response);
        this.name = 'TimeoutError';
    }
}

// Export for Node.js environments
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        CircularProtocolError,
        NetworkError,
        InvalidAddressError,
        InvalidSignatureError,
        InvalidNonceError,
        InvalidPayloadError,
        WalletNotFoundError,
        TransactionNotFoundError,
        BlockNotFoundError,
        AssetNotFoundError,
        DomainNotFoundError,
        InsufficientBalanceError,
        TimeoutError
    };
}
