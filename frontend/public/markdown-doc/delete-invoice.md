# Suppression d'une facture

Cette route permet de supprimer une facture existante.

## URL

`DELETE https://archidrive.dev/invoices/:id`

## Méthode

`DELETE`

## En-têtes requis

- `Authorization: Bearer <token>`

## Réponse

### Réponse réussie (200 OK)

```json
{
  "msg": "Invoice deleted",
  "success": true
}
```

### Réponse d'erreur (401 Unauthorized)

```json
{
  "msg": "Unauthorized request",
  "success": false
}
```