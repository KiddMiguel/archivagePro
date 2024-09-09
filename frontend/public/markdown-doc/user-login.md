# Connexion d'un utilisateur

Cette route permet à un utilisateur de se connecter à l'application en fournissant ses informations d'identification.

## URL

`POST https://archidrive.dev/users/login`

## Méthode

`POST`

## En-têtes requis

- `Content-Type: application/json`

## Paramètres de la requête

### Corps de la requête (JSON)

| Champ      | Type   | Obligatoire | Description                                |
|------------|--------|-------------|--------------------------------------------|
| `email`    | string | Oui         | Adresse e-mail de l'utilisateur.           |
| `password` | string | Oui         | Mot de passe de l'utilisateur.             |

## Exemple de requête

Voici un exemple de requête pour se connecter en tant qu'utilisateur :

```json
{
  "email": "john.doe@example.com",
  "password": "Password123@"
}
```

## Réponse

### Réponse réussie (200 OK)

Si les informations d'identification sont correctes, l'API renverra une réponse avec le statut `200 OK` et un jeton JWT pour l'authentification, ainsi que les détails de l'utilisateur connecté.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "success": true,
  "user": {
    "id": "66c28ed39c684b0f183ad3a7",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAdmin": false
  }
}
```

### Réponse d'erreur (401 Unauthorized)

Si les informations d'identification sont incorrectes, l'API renverra une réponse avec le statut `401 Unauthorized` et un message d'erreur.

```json
{
  "msg": "Invalid email or password",
  "success": false
}
```

## Notes

- **Validation des informations d'identification** : Assurez-vous que l'email et le mot de passe fournis sont corrects. En cas d'échec, une réponse avec le statut `401 Unauthorized` sera renvoyée.
- **Sécurité** : Comme le jeton JWT est utilisé pour l'authentification, il doit être stocké en toute sécurité côté client, par exemple dans les cookies sécurisés ou le stockage local.
- **HTTPS** : Les informations d'identification doivent être transmises via HTTPS pour garantir la sécurité des données.

## Exemples d'utilisation

### En utilisant `curl`

```bash
curl -X POST https://archidrive.dev/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "Password123@"
}'
```

### En utilisant `Postman`

- **Méthode** : POST
- **URL** : `https://archidrive.dev/users/login`
- **En-têtes** :
  - `Content-Type: application/json`
- **Body** : Raw JSON (voir l'exemple de requête ci-dessus).
