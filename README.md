# Ing. Arturo Ramirez - Portafolio y Perfil Profesional

Este es el repositorio de mi perfil profesional y portafolio interactivo. Está desarrollado con [Astro](https://astro.build/) para asegurar un rendimiento óptimo y una carga rápida.

## 🚀 Estructura del Proyecto

```text
/
├── public/                 # Archivos estáticos públicos (imágenes, favicon, etc.)
├── scripts/
│   └── manage_projects.js  # Script interactivo para gestionar proyectos de software
├── src/
│   ├── data/
│   │   └── software.json   # Base de datos local de proyectos
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal (Header, Nav, Footer)
│   └── pages/
│       ├── index.astro     # Presentación Formal (Sobre Mí)
│       ├── software/       # Módulo Software (Proyectos, GitHub, YouTube)
│       └── portfolio/      # Módulo Portafolio (Proyectos técnicos generales)
├── docs/                   # Documentación adicional del proyecto
└── package.json            # Dependencias y scripts
```

## 🛠️ Generador de Proyectos

Para añadir, editar o eliminar proyectos de software sin necesidad de tocar código, se ha creado una herramienta de línea de comandos (CLI).

Ejecuta el siguiente comando para abrir el menú interactivo:

```bash
npm run manage
```
Los cambios realizados en el generador se guardan en `src/data/software.json` y se reflejan instantáneamente en el sitio.

## 💻 Desarrollo Local (En tiempo real)

Para visualizar este proyecto en VS Code y ver los cambios en tiempo real, sigue estos pasos:

1. Abre la terminal integrada de VS Code (`Ctrl` + `ñ` o `Ctrl` + `\``).
2. Asegúrate de tener instaladas las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador y navega a: [http://localhost:4321](http://localhost:4321).
   Cada vez que edites un archivo `.astro` o agregues un proyecto en la terminal, la página se actualizará automáticamente en tu navegador sin necesidad de recargar.

## 🚀 Despliegue en GitHub Pages

Dado que este repositorio se llama `Baalgarthem.github.io`, GitHub Pages lo aloja de forma automática. 

Para que Astro construya y despliegue el proyecto correctamente en GitHub Pages, existen dos alternativas:
1. **(Recomendada) GitHub Actions:** 
   Se puede configurar un flujo de trabajo (workflow) en `.github/workflows/deploy.yml` que construya (`npm run build`) el proyecto y lo publique en la rama `gh-pages` de forma automática cada vez que hagas `git push` a `main`.
2. **Construcción local:** 
   Ejecutas `npm run build` localmente, lo cual genera la carpeta `dist/`. Luego debes asegurar que los contenidos de esa carpeta sean servidos por GitHub.

Actualmente, subiendo estos archivos, si activas GitHub Pages desde los 'Settings' > 'Pages' del repositorio seleccionando GitHub Actions, el despliegue podrá automatizarse.
