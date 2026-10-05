import express from 'express';
import {
    getBlockchainData,
    getBatchBlockchainData,
    verifyBlockchainData,
    getLatestBlockchainBlock,
} from '../controllers/blockchainController.js';

const router = express.Router();

router.get('/', getBlockchainData);
router.get('/verify', verifyBlockchainData);
router.get('/latest', getLatestBlockchainBlock);
router.get('/batch/:batchId', getBatchBlockchainData);

export default router;