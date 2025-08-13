# Fashion Landing Page - Immoral Fashion

🌟 **Landing page moderna y responsiva para Immoral Fashion**

Una página web elegante y profesional diseñada para mostrar servicios de consultoría en moda, con un diseño completamente responsivo y optimizado para conversiones.

## 🚀 Características

- ✅ **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- ✅ **Imágenes Reales**: Integración completa con diseños de Figma
- ✅ **SVG Optimizado**: Logos y gráficos vectoriales de alta calidad
- ✅ **Tailwind CSS**: Framework CSS moderno para estilos consistentes
- ✅ **Secciones Completas**: Hero, servicios, testimonios, CTA y footer
- ✅ **Optimizado para SEO**: Meta tags y estructura semántica

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con Flexbox y Grid
- **Tailwind CSS**: Framework de utilidades CSS
- **JavaScript**: Interactividad y funcionalidades dinámicas
- **SVG**: Gráficos vectoriales escalables

## 📁 Estructura del Proyecto

```
Fashion2/
├── index.html              # Página principal
├── images/                  # Imágenes y recursos gráficos
│   ├── hero-start-bg.jpg   # Fondo de la sección hero
│   ├── hero-end-bg.jpg     # Fondo de la sección final
│   ├── cta-bg-main.jpg     # Fondo del call-to-action
│   ├── brand-img-*.jpg     # Imágenes de marcas
│   ├── fashion-logo-*.svg  # Logos en diferentes variantes
│   └── *.svg               # Otros elementos gráficos
├── package.json            # Configuración del proyecto
├── .gitignore             # Archivos ignorados por Git
└── README.md              # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)
- Git

### Instalación Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/fashion-landing-page.git
   cd fashion-landing-page
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run dev` - Inicia el servidor y abre automáticamente el navegador
- `npm run build` - Prepara el proyecto para producción
- `npm run deploy` - Despliega a Vercel

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar con GitHub:**
   - Sube el proyecto a GitHub
   - Conecta tu cuenta de Vercel con GitHub

2. **Importar proyecto:**
   - En Vercel, selecciona "Import Project"
   - Elige tu repositorio de GitHub

3. **Configurar despliegue:**
   - Framework Preset: `Other`
   - Build Command: `echo "Static site"`
   - Output Directory: `./`

4. **Desplegar:**
   - Haz clic en "Deploy"
   - Tu sitio estará disponible en una URL de Vercel

### Otras Opciones

- **Netlify**: Arrastra la carpeta del proyecto
- **GitHub Pages**: Habilita Pages en la configuración del repositorio
- **Surge.sh**: `npm install -g surge && surge`

## 🎨 Personalización

### Cambiar Colores

Edita las clases de Tailwind en `index.html`:

```html
<!-- Ejemplo: cambiar color primario -->
<div class="bg-purple-600">  <!-- Cambia purple-600 por tu color -->
```

### Modificar Contenido

1. **Textos**: Edita directamente en `index.html`
2. **Imágenes**: Reemplaza archivos en la carpeta `images/`
3. **Logos**: Actualiza los archivos SVG correspondientes

### Agregar Secciones

Sigue la estructura existente:

```html
<section class="py-20">
  <div class="container mx-auto px-4">
    <!-- Tu contenido aquí -->
  </div>
</section>
```

## 📱 Responsividad

El sitio está optimizado para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Móvil**: 320px - 767px

Utiliza las clases responsivas de Tailwind:

```html
<div class="text-sm md:text-base lg:text-lg">
```

## 🔧 Solución de Problemas

### Imágenes no se cargan

- Verifica que las rutas sean correctas
- Asegúrate de que los archivos existan en `/images/`
- Revisa la consola del navegador para errores

### SVG no se muestran

- Confirma que el servidor tenga MIME types correctos
- Usa `http-server` con la configuración del `package.json`

### Problemas con Git

```bash
# Verificar estado
git status

# Configurar usuario (si es necesario)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## 📞 Soporte

Si encuentras algún problema:

1. Revisa la consola del navegador
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de usar las versiones correctas de Node.js y npm

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Immoral Fashion**

*Última actualización: Diciembre 2024*