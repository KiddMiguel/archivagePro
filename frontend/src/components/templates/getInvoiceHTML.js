export const getInvoiceHTML = (user, invoice) => {
    return `
<div style="display: flex; flex-direction: column; min-height: 297mm; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; box-sizing: border-box; padding: 20px;">
    <div style="flex-grow: 1;">
        <!-- Contenu principal de la facture -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div>
                <h2 style="color: #1976d2; margin-bottom: 5px;">ArchiDrive</h2>
                <div style="font-size: 14px; color: #555;">
                    <div>Le nom de votre entreprise</div>
                    <div>Votre adresse professionnelle</div>
                </div>
            </div>
            <div style="text-align: right;">
                <h4 style="color: #1976d2; margin: 0;">FACTURE</h4>
                <div style="font-size: 14px; color: #555; margin-top: 10px;">
                    <div>Nom du client : <strong>${user.firstName} ${user.lastName}</strong></div>
                    <div>${user.address.street}</div>
                    <div>${user.address.city} ${user.address.country}</div>
                    <div>Date : ${new Date(invoice.date).toLocaleDateString('fr-FR')}</div>
                </div>
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
            <thead>
                <tr style="background-color: #1976d2; color: white;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Description</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Quantité</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Prix (€)</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Montant (€)</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 12px;">${invoice.description}</td>
                    <td style="padding: 12px; text-align: right;">1</td>
                    <td style="padding: 12px; text-align: right;">${invoice.amount.toFixed(2)}</td>
                    <td style="padding: 12px; text-align: right;">${invoice.amount.toFixed(2)}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr style="border-top: 2px solid #ddd;">
                    <td colspan="3" style="padding: 12px; text-align: right;">TVA %</td>
                    <td style="padding: 12px; text-align: right;">0.00 €</td>
                </tr>
                <tr>
                    <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold;">MONTANT TOTAL (EUR)</td>
                    <td style="padding: 12px; text-align: right; font-weight: bold;">${invoice.amount.toFixed(2)} €</td>
                </tr>
                <tr>
                    <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; color: #1976d2;">Total à payer (EUR)</td>
                    <td style="padding: 12px; text-align: right; font-weight: bold; color: #1976d2;">${invoice.amount.toFixed(2)} €</td>
                </tr>
            </tfoot>
        </table>

        <div style="margin-top: 40px; text-align: right; font-size: 14px; color: #555;">
            <div>${user.firstName} ${user.lastName}</div>
            <div>${user.email}</div>
            <div style="margin-top: 10px;">Signature</div>
        </div>
    </div>

    <!-- Footer avec Conditions générales de vente -->
    <footer style="background-color: #f1f1f1; padding: 10px 20px; box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); margin-top: 20px;">
        <h4 style="color: #1976d2; border-bottom: 2px solid #ddd; padding-bottom: 5px;">Conditions générales de vente</h4>
        <p style="font-size: 14px; color: #555;">Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues par le biais du site Internet de la société ArchiDrive.</p>
    </footer>
</div>

`;
};
