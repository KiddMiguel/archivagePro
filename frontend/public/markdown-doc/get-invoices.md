# Récupération des factures

Cette route permet de récupérer la liste des factures associées à l'utilisateur.

## URL

`GET https://archidrive.dev/invoices`

## Méthode

`GET`

## En-têtes requis

- `Authorization: Bearer <token>`

## Réponse

### Réponse réussie (200 OK)

```json
{
  "success": true,
  "invoices": [
    {
      "invoiceId": "987654321",
      "customerId": "123456789",
      "items": [
        {
          "description": "Service A",
          "quantity": 2,
          "price": 50.00
        },
        {
          "description": "Service B",
          "quantity": 1,
          "price": 100.00
        }
      ],
      "total": 200.00,
      "createdAt": "2024-08-19T08:00:00Z"
    }
  ]
}
```

### Réponse d'erreur (401 Unauthorized)

```json
{
  "msg": "Unauthorized request",
  "success": false
}
```