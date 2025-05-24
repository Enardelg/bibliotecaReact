# React + Vite

`Git Hub Pages`

1- Ingresar a esta página e instalar gitHub pages --> https://www.npmjs.com/package/gh-pages
2- En pagckage.json agregar en la segunda linea --> 
  "homepage": "https://tuUsuario.github.io/nombreRepositorio",
   En scripts, antes de la propiedad build: "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
3- En vite.config.js antes de puglins --> base: "/bibliotecaReact",
4- ejecutar npm run deploy --> Published == exitoso
5- En Settings, pages --> luego de unos minutos se prepara el link que renderiza el proyecto, es normal que no se vea nada solo hay que inistir y actualizar
6- Disfruta del deploy en gitHub 
