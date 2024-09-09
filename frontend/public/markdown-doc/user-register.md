# Inscription d'un utilisateur

Cette route permet de créer un nouveau compte utilisateur dans l'application.

## URL

`POST /users/register`

## Méthode

`POST`

## En-têtes requis

- `Content-Type: application/json`

## Paramètres de la requête

### Corps de la requête (JSON)

| Champ       | Type   | Obligatoire | Description                                  |
|-------------|--------|-------------|----------------------------------------------|
| `firstName` | string | Oui         | Prénom de l'utilisateur.                     |
| `lastName`  | string | Oui         | Nom de famille de l'utilisateur.             |
| `email`     | string | Oui         | Adresse e-mail unique de l'utilisateur.      |
| `password`  | string | Oui         | Mot de passe pour le compte.                 |
| `telephone` | string | Non         | Numéro de téléphone de l'utilisateur.        |
| `address`   | object | Non         | Adresse postale de l'utilisateur.            |
| `address.street`    | string | Non         | Rue de l'adresse.                            |
| `address.city`      | string | Non         | Ville de l'adresse.                          |
| `address.postalCode`| string | Non         | Code postal de l'adresse.                    |
| `address.country`   | string | Non         | Pays de l'adresse.                           |

## Exemple de requête

Voici un exemple de requête pour inscrire un nouvel utilisateur :

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123@",
  "telephone": "05-50-54-66-40",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "postalCode": "12345",
    "country": "USA"
  }
}
```

## Réponse

### Réponse réussie (201 Created)

Si l'inscription est réussie, l'API renverra une réponse avec le statut `201 Created` et les détails de l'utilisateur nouvellement créé, ainsi qu'un jeton JWT pour l'authentification.

```json
{
  "msg": "User created",
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "66c28ed39c684b0f183ad3a7",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAdmin": false
  }
}
```

### Réponse d'erreur (400 Bad Request)

Si la requête est mal formée ou si certaines validations échouent, l'API renverra une réponse avec le statut `400 Bad Request` et un message d'erreur.

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

## Notes

- **Validation des champs** : Assurez-vous que l'email est unique et que le mot de passe répond aux exigences de sécurité minimales (par exemple, longueur minimale, complexité).
- **Sécurité** : Le mot de passe doit être transmis via HTTPS pour garantir la sécurité des données.
- **JWT** : Le jeton JWT fourni dans la réponse doit être stocké en toute sécurité côté client (par exemple, dans les cookies sécurisés ou le stockage local) et utilisé pour l'authentification des requêtes ultérieures.

## Exemples d'utilisation

### En utilisant `curl`

```bash
curl -X POST https://api.votre-application.com/users/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123@",
  "telephone": "05-50-54-66-40",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "postalCode": "12345",
    "country": "USA"
  }
}'
```

### En utilisant `Postman`

- **Méthode** : POST
- **URL** : `https://archidrive.dev/users/register`
- **En-têtes** :
  - `Content-Type: application/json`
- **Body** : Raw JSON (voir l'exemple de requête ci-dessus).


