# Mise à jour du profil utilisateur

Cette route permet de mettre à jour les informations du profil utilisateur.

## URL

`PUT https://archidrive.dev/users/profile`

## Méthode

`PUT`

## En-têtes requis

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

## Paramètres de la requête

### Corps de la requête (JSON)

| Champ       | Type   | Obligatoire | Description                                  |
|-------------|--------|-------------|----------------------------------------------|
| `firstName` | string | Non         | Prénom de l'utilisateur.                     |
| `lastName`  | string | Non         | Nom de famille de l'utilisateur.             |
| `email`     | string | Non         | Adresse e-mail unique de l'utilisateur.      |
| `telephone` | string | Non         | Numéro de téléphone de l'utilisateur.        |
| `address`   | object | Non         | Adresse postale de l'utilisateur.            |
| `address.street`    | string | Non         | Rue de l'adresse.                            |
| `address.city`      | string | Non         | Ville de l'adresse.                          |
| `address.postalCode`| string | Non         | Code postal de l'adresse.                    |
| `address.country`   | string | Non         | Pays de l'adresse.                           |

## Exemple de requête

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "telephone": "05-50-54-66-40",
  "address": {
    "street": "456 Another St",
    "city": "Springfield",
    "postalCode": "67890",
    "country": "USA"
  }
}
```

## Réponse

### Réponse réussie (200 OK)

```json
{
  "msg": "User profile updated",
  "success": true,
  "user": {
    "id": "66c28ed39c684b0f183ad3a7",
    "email": "jane.doe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "telephone": "05-50-54-66-40",
    "address": {
      "street": "456 Another St",
      "city": "Springfield",
      "postalCode": "67890",
      "country": "USA"
    }
  }
}
```

### Réponse d'erreur (400 Bad Request)

```json
{
  "msg": "Invalid request",
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```
