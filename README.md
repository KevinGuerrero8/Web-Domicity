# DomiCity — Sitio Web Corporativo

Sitio web corporativo moderno, responsive y optimizado para DomiCity.

## 🗂️ Estructura del Proyecto

```
/domicity
│
├── index.html          ← Página principal (Hero + Portafolio de Servicios)
├── nosotros.html       ← Sobre Nosotros (texto + slider de clientes)
├── contacto.html       ← Formulario de contacto + WhatsApp
│
├── /assets
│   ├── /css
│   │   └── styles.css  ← Estilos globales (metodología BEM, CSS variables)
│   ├── /js
│   │   └── app.js      ← JavaScript vanilla (navbar, slider, validación)
│   └── /img
│       ├── logo.png
│       ├── Banner Pagina Web.jpg
│       ├── Banner Pagina Web 2.jpg
│       ├── Icono Chatbots.png
│       ├── Icono Websites.png
│       ├── Icono Apps.png
│       ├── Icono Telefonia.png
│       ├── Icono Domisoft.png
│       ├── Icono Software.png
│       ├── Icono Facebook.png
│       ├── Icono Instagram.png
│       ├── Icono Linkedin.png
│       ├── whatsapp-icon.svg
│       ├── logo-visa.png       
│       ├── logo-3chotels.png   
│       ├── logo-papajohns.png 
│       ├── logo-pizzahut.png  
│       └── logo-farmatodo.png  
│
├── /private
│   └── form-handler.php  
│
└── README.md
```

## ⚙️ Configuración del Formulario (PHP)

Edita `private/form-handler.php` y cambia:
```php
$to = 'contacto@domicity.com'; // ← Tu correo real
```

Para envío SMTP en producción, reemplaza la función `mail()` con una librería como **PHPMailer** o **SwiftMailer**.

## 🖼️ Imágenes pendientes de agregar

Los logos de clientes deben ser colocados en `/assets/img/` con los siguientes nombres exactos:

| Logo         | Archivo esperado        |
|--------------|-------------------------|
| VISA         | `logo-visa.png`         |
| 3C Hotels    | `logo-3chotels.png`     |
| Papa Johns   | `logo-papajohns.png`    |
| Pizza Hut    | `logo-pizzahut.png`     |
| Farmatodo    | `logo-farmatodo.png`    |
| Logo DomiCity| `logo.png`              |

## 🎨 Paleta de Colores

| Rol              | Color     |
|------------------|-----------|
| Texto principal  | `#263238` |
| Rojo primario    | `#c0392b` |
| Botón WhatsApp   | `#5ab125` |
| Footer           | `#131212` |
| Cards            | `#e1e3e4` |
| Bordes           | `#bdbdbd` |

## 📐 Tipografía

- **Montserrat Bold (700)** — Títulos
- **Montserrat Semibold (600)** — Subtítulos
- **Montserrat Medium (500)** — Texto general

## 📱 Responsive Breakpoints

| Dispositivo | Breakpoint  |
|-------------|-------------|
| Desktop     | > 900px     |
| Tablet      | 640–900px   |
| Mobile      | < 640px     |

## 🚀 Despliegue

El proyecto es **100% estático** (HTML + CSS + JS). Para activar el formulario PHP:
1. Asegúrate de tener PHP ≥ 7.4 en el servidor
2. Configura el correo destino en `private/form-handler.php`
3. Sube todos los archivos al servidor vía FTP o CI/CD

## ✅ Características

- ✅ HTML5 semántico con roles ARIA
- ✅ CSS3 con metodología BEM y variables CSS
- ✅ Mobile-first responsive (hamburger menu en móvil)
- ✅ Navbar sticky con efecto glassmorphism
- ✅ Hero con separador SVG wave
- ✅ Grid de servicios con animaciones de entrada
- ✅ Slider automático de logos de clientes
- ✅ Formulario con validación JS + backend PHP
- ✅ Scroll animations con IntersectionObserver
- ✅ Lazy loading en imágenes
- ✅ Código comentado y organizado
