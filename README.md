# 🚀 Guía de Despliegue para React + Vite en GitHub Pages

## 📋 Requisitos Previos
- [Node.js](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/) instalado y configurado
- Cuenta en [GitHub](https://github.com/)
- Repositorio GitHub creado
- Proyecto React con Vite configurado

## 🔧 Configuración Inicial

### 1. Instalar gh-pages
### bash
npm install gh-pages --save-dev
2. Configurar package.json
json
{
  "homepage": "https://<tu-usuario>.github.io/<nombre-repo>/",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    // Tus otros scripts...
  }
}
3. Configurar Vite
javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/<nombre-repo>/",
  plugins: [react()],
})
🚀 Pasos para el Despliegue
Generar build de producción:

bash
npm run build
Ejecutar deploy:

bash
npm run deploy
Configurar GitHub Pages:

Ve a Settings → Pages

Branch: gh-pages

Carpeta: /root

Guardar

Tu sitio estará disponible en:

https://<tu-usuario>.github.io/<nombre-repo>/
⏳ Tiempos de Espera
Primer deploy: 5-10 minutos

Deploys posteriores: 2-3 minutos

🔍 Solución de Problemas
Página no se muestra (Error 404)
✅ Verifica que:

Los nombres coincidan exactamente en:

URL de GitHub

homepage en package.json

base en vite.config.js

El branch gh-pages existe

Espera al menos 10 minutos

Sitio se ve en blanco
🔧 Soluciones:

Verifica que base en vite.config.js tenga "/" al final

Limpia caché del navegador (Ctrl+Shift+R)

Revisa la consola (F12) para errores
