import {
    getBlockchain,
    getBatchBlockchain,
    verifyBlockchain,
    getLatestBlock,
} from '../services/blockchainService.js';

// @desc Get complete blockchain
// @route GET /api/blockchain
// @access Private
export const getBlockchainData = async (req, res, next) => {
    try {
        const blockchain = getBlockchain();

        res.json({
            success: true,
            count: blockchain.length,
            blockchain,
        });
    } catch (error) {
        next(error);
    }
};

// @desc Get blockchain records for a batch
// @route GET /api/blockchain/batch/:batchId
// @access Private
export const getBatchBlockchainData = async (req, res, next) => {
    try {
        const { batchId } = req.params;

        const blockchain = getBatchBlockchain(batchId.toUpperCase());

        res.json({
            success: true,
            batchId: batchId.toUpperCase(),
            count: blockchain.length,
            blockchain,
        });
    } catch (error) {
        next(error);
    }
};

// @desc Verify blockchain integrity
// @route GET /api/blockchain/verify
// @access Private
export const verifyBlockchainData = async (req, res, next) => {
    try {
        const verification = verifyBlockchain();

        res.json({
            success: true,
            ...verification,
        });
    } catch (error) {
        next(error);
    }
};

// @desc Get latest blockchain block
// @route GET /api/blockchain/latest
// @access Private
export const getLatestBlockchainBlock = async (req, res, next) => {
    try {
        const block = getLatestBlock();

        res.json({
            success: true,
            block,
        });
    } catch (error) {
        next(error);
    }
};