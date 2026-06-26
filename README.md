# GLOWYSKIN - Tienda de Skincare Coreano Premium 🌸

Este es un proyecto web moderno, minimalista y luminoso diseñado bajo el concepto de estética *Pinterest / clean girl* para vender y mostrar productos de cuidado facial coreano (K-Beauty).

## Características Principales ✨
1. **Sección Hero interactiva**: Fondo animado con degradados dinámicos (*Mesh Gradient*) en colores pastel adaptados al logotipo y a la marca.
2. **Skin Quiz Interactivo**: Un test de 3 preguntas que analiza el tipo de piel, preocupación y textura preferida del usuario para recomendarle una rutina ideal de 3 pasos en tiempo real.
3. **Catálogo Carrusel Horizontal**: Desplazamiento horizontal controlado por el scroll vertical, con tarjetas de producto que revelan detalles, precio y opción de compra al pasar el cursor.
4. **Menú de Perfil Lateral**: Menú lateral deslizable (*UserProfileSidebar*) con animaciones fluidas para gestionar la cuenta del usuario.
5. **Carrito de Compras Integrado**: Contador de artículos en la cabecera con un panel lateral interactivo para sumar/restar cantidades y proceder al pago simulado.
6. **Legales Integrados**: Enlaces a la Política de Privacidad, Términos y Condiciones y Aviso DMCA que se despliegan en ventanas modales translúcidas e instantáneas.

---

## Requisitos Previos 🛠️

Para poder ejecutar este proyecto en tu computadora, necesitas tener instalado **Node.js** (que incluye `npm`). 

### Cómo instalar Node.js en Windows:
1. Abre la terminal de Windows (**PowerShell** o **Símbolo del sistema**).
2. Ejecuta el siguiente comando para instalarlo automáticamente:
   ```powershell
   winget install OpenJS.NodeJS
   ```
3. *Alternativa*: También puedes descargarlo e instalarlo de forma manual desde el sitio oficial de [Node.js (LTS)](https://nodejs.org/).
4. Una vez instalado, cierra y vuelve a abrir tu terminal, y verifica que esté listo ejecutando:
   ```bash
   node --version
   ```

---

## Cómo Ejecutar el Proyecto 🚀

Una vez instalado Node.js, sigue estos sencillos pasos:

1. **Abre la terminal** en la carpeta del proyecto (`C:\Users\cdlag\OneDrive\Escritorio\GLOWYSKIN`).
2. **Instala las dependencias** del proyecto ejecutando:
   ```bash
   npm install
   ```
   *(Este paso descargará librerías como React, Tailwind, Framer Motion, y Shaders).*
3. **Inicia el servidor local de desarrollo**:
   ```bash
   npm run dev
   ```
4. Abre tu navegador web e ingresa a la dirección que te mostrará la consola (normalmente **`http://localhost:5173`**).

---

## Estructura de Archivos del Proyecto 📂

- `public/`: Contiene los archivos multimedia estáticos de la web, incluyendo tus logotipos (`Logo1.png`, `logo_transparente.png`), el video de fondo (`Fondo.mp4`) y la carpeta de imágenes del catálogo (`Catalogo/`).
- `src/`: Carpeta del código de la aplicación.
  - `src/components/ui/`: Componentes modulares reutilizables requeridos (Hero Shader, Menú lateral, Carrusel Scroll-X, Badge y Efecto Hover).
  - `src/lib/utils.ts`: Función utilitaria para combinar clases condicionales en Tailwind CSS.
  - `src/App.tsx`: Lógica principal del e-commerce, test de piel, carrito de compras y estructura general de la página.
  - `src/index.css`: Declaración de capas de Tailwind CSS, fuentes tipográficas de Google Fonts y variables de colores de la paleta.
  - `src/main.tsx`: Archivo de montaje de la app en el DOM.
- `package.json`: Archivo de configuración del proyecto con las dependencias necesarias.
- `tailwind.config.js` & `postcss.config.js`: Configuraciones para la compilación de estilos de Tailwind CSS.
- `tsconfig.json` & `vite.config.ts`: Ajustes para el compilador de TypeScript y la velocidad de construcción con Vite.
- `index.html`: Punto de entrada HTML.
