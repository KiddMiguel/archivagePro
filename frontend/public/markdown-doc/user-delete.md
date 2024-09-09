# Suppression du profil utilisateur

Cette route permet de supprimer le profil de l'utilisateur.

## URL

`DELETE https://archidrive.dev/users/profile`

## Méthode

`DELETE`

## En-têtes requis

- `Authorization: Bearer <token>`

## Réponse

### Réponse réussie (200 OK)

```json
{
  "msg": "User removed",
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

## Notes

- **Sécurité** : Cette route nécessite un jeton JWT valide.
- **Action irréversible** : La suppression du compte est une action irréversible.