const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const nodemailer = require('nodemailer');

const generateInvoiceWord = async (invoice) => {
  const templatePath = path.join(__dirname, '../templates/invoice_template.docx');
  const content = fs.readFileSync(templatePath, 'binary');

  const data = {
    firstName: invoice.facture.firstName,
    lastName: invoice.facture.lastName,
    address: invoice.address,
    date: new Date(invoice.date).toLocaleDateString(),
    date_echeance: new Date(invoice.date_echeance).toLocaleDateString(),
    description: invoice.description,
    amount: invoice.amount.toFixed(2),
  };

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    throw new Error('Erreur lors de la génération du document Word : ' + error.message);
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  const tempDocxPath = path.join(__dirname, '../invoices', `${invoice.id}.docx`);
  fs.writeFileSync(tempDocxPath, buf);

  const tempPdfPath = path.join(__dirname, '../invoices', `${invoice.id}.docx`);

  return tempPdfPath;
};

const generateInvoicePDF = async (invoice) => {
  const templateHtmlPath = path.join(__dirname, '../templates/invoice_template.html');

  let htmlContent = fs.readFileSync(templateHtmlPath, 'utf8');

  // Remplacer les placeholders dans le HTML par les données de l'invoice
  htmlContent = htmlContent.replace('{firstName}', invoice.firstName)
      .replace('{lastName}', invoice.lastName)
      .replace('{address}', invoice.address)
      .replace('{date}', invoice.date)
      .replace('{date_echeance}', invoice.date_echeance)
      .replace(/{description}/g, invoice.description)
      .replace(/{amount}/g, invoice.amount.toFixed(2));

  const pdfPath = path.join(__dirname, `${invoice.id}.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();

  return pdfPath;
};


const sendInvoice = async (invoice, pdfPath) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, 
      port: process.env.MAIL_PORT, 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: invoice.facture.email,
      subject: `Votre facture #${invoice.id}`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; padding-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px;">Merci pour votre commande</h1>
              <p style="margin: 0; color: #888;">Nous avons bien reçu votre paiement. Voici un récapitulatif de votre commande.</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e0e0e0;">
            <div style="padding: 20px 0;">
              <p style="margin: 0;"><strong>Facture #${invoice.id}</strong></p>
              <p style="margin: 0;">Client : <strong>${invoice.facture.firstName} ${invoice.facture.lastName}</strong> (${invoice.facture.email})</p>
              <p style="margin: 0;">Méthode de paiement : <strong>Carte de crédit</strong></p>
              <p style="margin: 0;">Date de paiement : <strong>${new Date(invoice.date).toLocaleDateString()}</strong></p>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0;"><strong>${invoice.description}</strong></p>
              <p style="margin: 0; text-align: right; font-size: 20px;"><strong>${invoice.amount.toFixed(2)} €</strong></p>
            </div>
            <div style="padding: 20px 0; font-size: 18px;">
              <p style="margin: 0;">Montant total payé : <strong style="color: #4CAF50;">${invoice.amount.toFixed(2)} €</strong></p>
            </div>
            <hr style="border: none; border-top: 1px solid #e0e0e0;">
            <div style="padding-top: 20px;">
              <p style="margin: 0; color: #888; font-size: 12px;">Disclaimer: La facture est jointe à cet email. Si vous avez des questions, veuillez nous contacter directement.</p>
              <p style="margin: 0; font-size: 14px; text-align: center;">Nous apprécions votre confiance.</p>
              <p style="margin: 0; font-size: 14px; text-align: center;"><strong>ARCHIDRIVE</strong></p>
              <p style="margin: 0; font-size: 12px; text-align: center;">16192 Coastal Highway, Lewes, Delaware 19958, USA</p>
              <p style="margin: 0; font-size: 12px; text-align: center;">+1 262 600 2002</p>
            </div>
          </div>
        </div>
      `
      // attachments: [
      //   {
      //     filename: `facture_${invoice.id}.docx`,
      //     path: pdfPath,
      //     contentType: 'application/docx',
      //   }
      // ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`Facture #${invoice.id} envoyée à ${invoice.facture.email}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de la facture : ${error.message}`);
    throw new Error('L\'envoi de la facture a échoué');
  }
};


module.exports = { generateInvoicePDF,generateInvoiceWord , sendInvoice };
