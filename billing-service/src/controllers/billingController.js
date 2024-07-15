// src/controllers/billingController.js
const Invoice = require('../models/invoiceModel');

exports.createInvoice = async (req, res) => {
  const { amount, description, status } = req.body;

  try {
    const invoice = new Invoice({
      user: req.user.id,
      amount,
      description,
      status
    });

    await invoice.save();
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id });
    res.json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateInvoice = async (req, res) => {
  const { amount, description, status } = req.body;

  try {
    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    if (invoice.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { $set: { amount, description, status } },
      { new: true }
    );

    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    if (invoice.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Invoice.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Invoice removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// prendre toutes les factures
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
