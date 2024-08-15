// src/models/invoiceModel.js
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;