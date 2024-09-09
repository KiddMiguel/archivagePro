# Création d'un Dossier

## URL

`POST https://archidrive.dev/folder`

## Méthode

`POST`

## En-têtes requis

- `Authorization: Bearer <token>`
- `Content-Type: application/json`


## Corps de la requête (JSON)

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| name | string | Oui | Nom du dossier à créer. |

## Exemple de requête

```json
{
    "name": "Mon Dossier"
}
```

## Réponse réussie

```json
{
    "msg": "Folder created", "success": true, "folderId": "12345"
}
```

## Réponse d'erreur

```json
{
    "msg": "Invalid request", "success": false, "errors": [{"field": "name", "message": "Folder name is required"}]
}
```


# Récupération du Dossier Racine

## URL

`GET https://archidrive.dev/root`

## Méthode

`GET`

## En-têtes requis

- `Authorization: Bearer <token>`


## Réponse réussie

```json
{
    "id": "root123", "name": "Root", "files": [], "folders": []
}
```

## Réponse d'erreur

```json
{
    "msg": "Root folder not found",
    "success": true,
}
```


# Suppression d'un Dossier

## URL

`DELETE https://archidrive.dev/folder/:id`

## Méthode

`DELETE`

## En-têtes requis

- `Authorization: Bearer <token>`

## Paramètres de l'URL

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| id | string | Oui | ID du dossier à supprimer. |

## Réponse réussie

```json
{
    "msg": "Folder deleted", "success": true
}
```

## Réponse d'erreur

```json
{"msg": "Folder not found", "success": false}
```


