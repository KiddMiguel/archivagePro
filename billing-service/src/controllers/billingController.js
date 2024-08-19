// src/controllers/billingController.js
const Invoice = require('../models/invoiceModel');
const {  sendInvoice, generateInvoicePDF, generateInvoiceWord } = require('./generatedInvoice');

exports.createInvoice = async (req, res) => {
  const { amount, address, facture } = req.body;

  try {
    const invoice = {
      user: req.user.id,
      amount,
      description: "Facture pour le service de stockage de fichiers, ArchiDrive Premium.",
      date: new Date(),
      date_echeance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours à partir de la date actuelle
      address: address.street + ', ' + address.city + ', ' + address.postalCode + ', ' + address.country,
      status: "paid",
      facture: facture
    };

    const newInvoice = new Invoice(invoice);
    await newInvoice.save();

    invoice.id = newInvoice.id;
  
    // Générer et sauvegarder le PDF
    const pdfPath = await generateInvoiceWord(invoice);
    await sendInvoice(invoice, pdfPath);
    res.json({ message :"Facture crée", statut : true  , pdfPath });

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
