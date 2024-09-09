# Documentation de Test

Ce document est utilisé pour tester le rendu Markdown avec des blocs de code de différents langages, ainsi que la fonctionnalité du bouton "Copier le code".

## Introduction

Bienvenue dans ce document de test. Vous trouverez ci-dessous des exemples de code en plusieurs langages, ainsi que du texte standard pour voir comment tout est rendu ensemble.

## Exemple de code JavaScript

Voici un exemple simple de fonction JavaScript :

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("World");
```

## Exemple de code Python

Maintenant, un exemple en Python :

```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

## Exemple de code HTML

Voici un exemple de structure HTML de base :

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

## Exemple de code Bash

Et enfin, un exemple de script Bash :

```bash
#!/bin/bash
echo "Hello, World!"
```

## Texte simple

Ce document contient également du texte simple, comme celui-ci, pour s'assurer que tout fonctionne correctement en dehors des blocs de code.

Merci d'avoir testé ce document Markdown. Assurez-vous que chaque bloc de code est correctement rendu avec la coloration syntaxique et que le bouton "Copier le code" fonctionne comme prévu.
```

### Comment utiliser ce fichier

1. **Créer le fichier** : Créez un fichier nommé `test.md` dans le dossier où vous stockez vos fichiers Markdown (par exemple, `/public/markdown-doc/test.md` si vous servez les fichiers depuis le dossier `public`).

2. **Charger le fichier dans votre composant** : Utilisez votre composant `MarkdownPage` pour afficher ce fichier :

   ```javascript
   import React from 'react';
   import MarkdownPage from './MarkdownPage';

   const App = () => {
     return (
       <div>
         <h1>Test du rendu Markdown</h1>
         <MarkdownPage markdownText="test.md" />
       </div>
     );
   };

   export default App;
   ```

3. **Tester dans votre application** : Lancez votre application, et assurez-vous que :
   - Les blocs de code JavaScript, Python, HTML et Bash sont correctement colorés.
   - Chaque bloc de code a un bouton "Copier le code" en haut à droite.
   - Le bouton fonctionne et copie correctement le contenu du code dans le presse-papiers.
   - Le texte simple est correctement rendu.

