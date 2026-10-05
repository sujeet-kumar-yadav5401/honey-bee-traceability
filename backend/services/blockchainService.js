import crypto from 'crypto';

/**
 * Prototype Blockchain Service
 * Creates a linked chain of immutable-style blocks.
 */

const blockchain = [];

/**
 * Create SHA-256 hash for a block.
 */
const calculateHash = (block) => {
    const blockData = JSON.stringify({
        index: block.index,
        timestamp: block.timestamp,
        type: block.type,
        batchId: block.batchId,
        data: block.data,
        previousHash: block.previousHash,
    });

    return crypto
        .createHash('sha256')
        .update(blockData)
        .digest('hex');
};

/**
 * Create the first block (Genesis Block).
 */
const createGenesisBlock = () => {
    const block = {
        index: 0,
        timestamp: new Date().toISOString(),
        type: 'GENESIS',
        batchId: 'SYSTEM',
        data: {
            message: 'Honey Bee Traceability Blockchain Genesis Block',
        },
        previousHash: '0',
    };

    block.hash = calculateHash(block);

    return block;
};

/**
 * Initialize blockchain.
 */
if (blockchain.length === 0) {
    blockchain.push(createGenesisBlock());
}

/**
 * Add a new batch/event block.
 */
export const addBlock = ({
    type = 'BATCH_CREATED',
    batchId = '',
    data = {},
}) => {
    const previousBlock = blockchain[blockchain.length - 1];

    const newBlock = {
        index: blockchain.length,
        timestamp: new Date().toISOString(),
        type,
        batchId,
        data,
        previousHash: previousBlock.hash,
    };

    newBlock.hash = calculateHash(newBlock);

    blockchain.push(newBlock);

    return newBlock;
};

/**
 * Get complete blockchain.
 */
export const getBlockchain = () => {
    return [...blockchain];
};

/**
 * Get blockchain blocks for a particular batch.
 */
export const getBatchBlockchain = (batchId) => {
    return blockchain.filter(
        (block) => block.batchId === batchId
    );
};

/**
 * Verify complete blockchain integrity.
 */
export const verifyBlockchain = () => {
    for (let i = 0; i < blockchain.length; i += 1) {
        const currentBlock = blockchain[i];

        // Verify current block hash
        const recalculatedHash = calculateHash(currentBlock);

        if (currentBlock.hash !== recalculatedHash) {
            return {
                valid: false,
                error: `Block ${currentBlock.index} hash is invalid`,
                blockIndex: currentBlock.index,
            };
        }

        // Verify chain connection
        if (i > 0) {
            const previousBlock = blockchain[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                return {
                    valid: false,
                    error: `Block ${currentBlock.index} is not correctly linked`,
                    blockIndex: currentBlock.index,
                };
            }
        }
    }

    return {
        valid: true,
        blockCount: blockchain.length,
        message: 'Blockchain integrity verified successfully',
    };
};

/**
 * Get latest block.
 */
export const getLatestBlock = () => {
    return blockchain[blockchain.length - 1];
};

export default {
    addBlock,
    getBlockchain,
    getBatchBlockchain,
    verifyBlockchain,
    getLatestBlock,
};