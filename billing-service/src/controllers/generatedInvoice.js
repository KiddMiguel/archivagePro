const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const libre = require('libreoffice-convert');

// Fonction pour générer un PDF à partir du modèle Word
const generateInvoice = async (invoice) => {
  // Charger le modèle Word
  const templatePath = path.join(__dirname, '../templates/invoice_template.docx');
  const content = fs.readFileSync(templatePath, 'binary');

  // Préparer les données pour le template
  const data = {
    firstName: invoice.firstName,
    lastName: invoice.lastName,
    address: invoice.address,
    date: new Date(invoice.date).toLocaleDateString(),
    date_echeance: new Date(invoice.date_echeance).toLocaleDateString(),
    description: invoice.description,
    amount: invoice.amount.toFixed(2)
  };

  // Charger le document dans docxtemplater
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Remplacer les balises par les données
  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    throw new Error('Erreur lors de la génération du document Word : ' + error.message);
  }

  // Sauvegarder le document Word généré temporairement
  const tempDocxPath = path.join(__dirname, '../invoices', `${invoice.id}.docx`);
  const buf = doc.getZip().generate({ type: 'nodebuffer' });
  fs.writeFileSync(tempDocxPath, buf);

  // Convertir le document Word en PDF
  const tempPdfPath = path.join(__dirname, '../invoices', `${invoice.id}.pdf`);
  const docxBuf = fs.readFileSync(tempDocxPath);
  libre.convert(docxBuf, '.pdf', undefined, (err, pdfBuf) => {
    if (err) {
      throw new Error(`Erreur lors de la conversion en PDF : ${err.message}`);
    }
    fs.writeFileSync(tempPdfPath, pdfBuf);
  });

  // Supprimer le fichier temporaire .docx
  fs.unlinkSync(tempDocxPath);

  return tempPdfPath;
};

module.exports = { generateInvoice };
