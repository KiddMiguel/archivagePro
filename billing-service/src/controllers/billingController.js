// src/controllers/billingController.js
const Invoice = require('../models/invoiceModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { generateInvoice } = require('./generatedInvoice');

exports.createInvoice = async (req, res) => {
  const { amount, description, address } = req.body;

  try {
    const invoice = new Invoice({
      user: req.user.id,
      amount,
      description: "Facture pour le service de stockage de fichiers, ArchiDrive Premium.",
      date: new Date(),
      date_echeance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours à partir de la date actuelle
      address: address.street + ', ' + address.city + ', ' + address.postalCode + ', ' + address.country,
      status: "paid"
    });

    await invoice.save();

    // Générer et sauvegarder le PDF
    const pdfPath = await generateInvoice(invoice);

    res.json({ invoice, pdfPath });

    res.json({ invoice });
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


// Envoi de mail pour la facture avec la facture en pièce jointe
exports.sendInvoice = async (req, res) => {
  const { email } = req.body;

  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    // Configurer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'archivage.supp0rt@gmail.com', // Remplacez par votre adresse Gmail
        pass: 'Archivage@10',        // Remplacez par votre mot de passe Gmail ou app password
      },
    });

    // Le chemin vers le fichier PDF de la facture
    const invoicePath = path.join(__dirname, '../invoices', `${invoice.id}.pdf`);

    // Options du mail
    const mailOptions = {
      from: 'archivage.supp0rt@gmail.com', // Votre adresse Gmail
      to: email,                    // L'adresse e-mail du destinataire
      subject: `Votre facture #${invoice.id}`,
      text: `Veuillez trouver ci-joint la facture #${invoice.id}.`,
      attachments: [
        {
          filename: `facture_${invoice.id}.pdf`,
          path: invoicePath,
          contentType: 'application/pdf'
        }
      ]
    };

    // Envoyer le mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ msg: 'Invoice sent successfully' });
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
