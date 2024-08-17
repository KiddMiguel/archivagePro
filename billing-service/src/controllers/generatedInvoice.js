const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const nodemailer = require('nodemailer');

const generateInvoiceWord = async (invoice) => {
  const templatePath = path.join(__dirname, '../templates/invoice_template.docx');
  const content = fs.readFileSync(templatePath, 'binary');

  const data = {
    firstName: invoice.userComplet.firstName,
    lastName: invoice.userComplet.lastName,
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
      host: 'smtp.gmail.com', 
      port: 587, 
      secure: false,
      auth: {
        user: 'archivage.supp0rt@gmail.com',
        pass: 'vyyooclwucwvzada',
      },
    });

    const mailOptions = {
      from: 'archivage.supp0rt@gmail.com',
      to: invoice.userComplet.email,
      subject: `Votre facture #${invoice.id}`,
      html: `
        <h1>Bonjour ${invoice.userComplet.firstName},</h1>
        <p>Veuillez trouver ci-joint la facture <strong>#${invoice.id}</strong> pour vos archives.</p>
        <p>Merci pour votre confiance.</p>
        <p>Bien cordialement,</p>
        <p><strong>L'équipe ArchiDrive</strong></p>
      `,
      attachments: [
        {
          filename: `facture_${invoice.id}.docx`,
          path: pdfPath,
          contentType: 'application/docx',
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`Facture #${invoice.id} envoyée à ${invoice.userComplet.email}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de la facture : ${error.message}`);
    throw new Error('L\'envoi de la facture a échoué');
  }
};


module.exports = { generateInvoicePDF,generateInvoiceWord , sendInvoice };
