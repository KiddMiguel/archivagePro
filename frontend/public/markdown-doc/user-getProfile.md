# Récupération des informations du profil utilisateur

Cette route permet de récupérer les informations du profil utilisateur connecté.

## URL

`GET https://archidrive.dev/users/profile`

## Méthode

`GET`

## En-têtes requis

- `Authorization: Bearer <token>`

## Réponse

### Réponse réussie (200 OK)

```json
{
  "success": true,
  "user": {
    "id": "66c28ed39c684b0f183ad3a7",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "telephone": "05-50-54-66-40",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "postalCode": "12345",
      "country": "USA"
    },
    "createdAt": "2024-08-19T08:00:00Z",
    "updatedAt": "2024-08-19T08:00:00Z"
  }
}
```

### Réponse d'erreur (401 Unauthorized)

```json
{
  "msg": "Unauthorized request",
  "success": false
}
```
