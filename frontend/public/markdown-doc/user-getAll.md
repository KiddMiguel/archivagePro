# Récupération de tous les utilisateurs

Cette route permet de récupérer la liste de tous les utilisateurs. Seuls les administrateurs peuvent utiliser cette route.

## URL

`GET https://archidrive.dev/users`

## Méthode

`GET`

## En-têtes requis

- `Authorization: Bearer <token>`

## Réponse

### Réponse réussie (200 OK)

```json
{
  "success": true,
  "users": [
    {
      "id": "66c28ed39c684b0f183ad3a7",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isAdmin": false
    },
    {
      "id": "77d39f9a6b444b0f183ad3b9",
      "email": "jane.doe@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "isAdmin": true
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