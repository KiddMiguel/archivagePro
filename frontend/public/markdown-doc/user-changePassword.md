# Changement du mot de passe utilisateur

Cette route permet à un utilisateur de changer son mot de passe.

## URL

`PUT https://archidrive.dev/users/password`

## Méthode

`PUT`

## En-têtes requis

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

## Paramètres de la requête

### Corps de la requête (JSON)

| Champ           | Type   | Obligatoire | Description                        |
|-----------------|--------|-------------|------------------------------------|
| `oldPassword`   | string | Oui         | Ancien mot de passe de l'utilisateur.  |
| `newPassword`   | string | Oui         | Nouveau mot de passe de l'utilisateur. |

## Exemple de requête

```json
{
  "oldPassword": "OldPassword123",
  "newPassword": "NewPassword123@"
}
```

## Réponse

### Réponse réussie (200 OK)

```json
{
  "msg": "Password updated",
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
      "field": "oldPassword",
      "message": "Old password is incorrect"
    }
  ]
}
```
