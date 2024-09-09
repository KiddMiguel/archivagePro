# Récupération de toutes les factures

Cette route permet aux administrateurs de récupérer la liste de toutes les factures.

## URL

`GET https://archidrive.dev/allinvoices`

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
        }
      ],
      "total": 100.00,
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

## Notes

- **Permissions** : Cette route est accessible uniquement aux administrateurs.