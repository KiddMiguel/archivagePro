import { getInvoiceHTML } from '../components/templates/getInvoiceHTML';  // Chemin relatif vers le fichier que vous avez créé
import jsPDF from 'jspdf';

const generateInvoicePDF = (user, invoice) => {
    // Configure jsPDF pour une page A4 (210mm x 297mm)
    const doc = new jsPDF({
        format: 'a4',
        unit: 'mm'
    });

    // Utilisez le modèle HTML importé pour obtenir le contenu de la facture
    const invoiceHTML = getInvoiceHTML(user, invoice);

    // Convertir le HTML en PDF
    doc.html(invoiceHTML, {
        callback: function (doc) {
            doc.save(`facture-${invoice._id}.pdf`);
        },
        x: 10,    // Position en mm depuis le bord gauche de la page
        y: 10,    // Position en mm depuis le bord supérieur de la page
        width: 190,  // Largeur du contenu en mm (A4 est 210mm de large, donc 190mm laisse une marge)
        windowWidth: 800  // Largeur de la fenêtre du navigateur pour le rendu
    });
};

export default generateInvoicePDF;
