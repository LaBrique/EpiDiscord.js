# EPIDISCORD.JS

EpiDiscord.js est un bot Discord programmé en Node.js.
Ce bot permet aux étudiants d'intéragir avec l'intranet EPITECH directement sur Discord.
Ce bot propose également de souscrire à des flux de notifications pour rappeler l'étudiant des projets auxquels la date de fin d'inscription approche, ou d'une activitée imminente.

## Build

Créez un fichier nommé `config.json` à la racine du projet, remplissez le avec:
```json
{
  "prefix": "(prefix)",
  "token": "(token)"
}
```

En remplaçant (prefix) par le préfix auquel vous souhaitez que le bot réponde, et (token) par le token du bot Discord que vous souhaitez incarner. Ne donnez à personne ce token!

Éxécutez ensuite `docker build .`.
À la fin de celle-ci, la dernière ligne devrait ressembler à `Successfully built (image)`,
(image) étant le code de votre nouvelle image.

`docker tag [image] epidiscord.js`
`docker run -d epidiscord.js`

Et voilà, votre bot tourne à l'intérieur d'un container Docker!
