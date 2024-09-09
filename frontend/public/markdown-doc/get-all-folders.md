# Récupération du Dossier Racine

## URL

`GET https://archidrive.dev/root`

## Méthode

`GET`

## En-têtes requis

- `Authorization: Bearer <token>`


## Réponse réussie

```json
{"id": "root123", "name": "Root", "files": [], "folders": []}
```

## Réponse d"erreur

```json
{"msg": "Root folder not found", "success": False}
```
