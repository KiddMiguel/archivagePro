// src/routes/billingRoutes.js
const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');

router.post('/invoice', authMiddleware, billingController.createInvoice);
router.get('/invoices', authMiddleware, billingController.getInvoices);
router.put('/invoices/:id', authMiddleware, billingController.updateInvoice);
router.delete('/invoices/:id', authMiddleware, billingController.deleteInvoice);
router.get('/allinvoices', authMiddleware, isAdmin, billingController.getAllInvoices);
module.exports = router;
