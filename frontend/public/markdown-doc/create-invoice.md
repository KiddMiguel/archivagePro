# Création d'une facture

Cette route permet de créer une nouvelle facture.

## URL

`POST https://archidrive.dev/invoice`

## Méthode

`POST`

## En-têtes requis

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

## Paramètres de la requête

### Corps de la requête (JSON)

| Champ         | Type   | Obligatoire | Description                               |
|---------------|--------|-------------|-------------------------------------------|
| `customerId`  | string | Oui         | ID du client associé à la facture.         |
| `items`       | array  | Oui         | Liste des éléments facturés.               |
| `items[].description` | string | Oui | Description de l'élément facturé.          |
| `items[].quantity`    | number | Oui | Quantité de l'élément.                     |
| `items[].price`       | number | Oui | Prix unitaire de l'élément.                |

## Exemple de requête

```json
{
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
  ]
}
```

## Réponse

### Réponse réussie (201 Created)

```json
{
  "msg": "Invoice created",
  "success": true,
  "invoiceId": "987654321"
}
```

### Réponse d'erreur (400 Bad Request)

```json
{
  "msg": "Invalid request",
  "success": false,
  "errors": [
    {
      "field": "customerId",
      "message": "Customer ID is required"
    }
  ]
}
```