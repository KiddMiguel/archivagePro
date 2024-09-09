# Mise à jour d'une facture

Cette route permet de mettre à jour une facture existante.

## URL

`PUT https://archidrive.dev/invoices/:id`

## Méthode

`PUT`

## En-têtes requis

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

## Paramètres de la requête

### Corps de la requête (JSON)

| Champ         | Type   | Obligatoire | Description                               |
|---------------|--------|-------------|-------------------------------------------|
| `items`       | array  | Oui         | Liste des éléments facturés.               |
| `items[].description` | string | Oui | Description de l'élément facturé.          |
| `items[].quantity`    | number | Oui | Quantité de l'élément.                     |
| `items[].price`       | number | Oui | Prix unitaire de l'élément.                |

## Exemple de requête

```json
{
  "items": [
    {
      "description": "Service A",
      "quantity": 3,
      "price": 50.00
    }
  ]
}
```

## Réponse

### Réponse réussie (200 OK)

```json
{
  "msg": "Invoice updated",
  "success": true
}
```

### Réponse d'erreur (400 Bad Request)

```json
{
  "msg": "Invalid request",
  "success": false,
  "errors": [
    {
      "field": "items",
      "message": "Items are required"
    }
  ]
}
```