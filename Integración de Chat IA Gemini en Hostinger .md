---
exported: 2026-03-04T05:20:51.687Z
source: NotebookLM
type: note
title: "Integración de Chat IA Gemini en Hostinger vía Antigravity"
---

# Integración de Chat IA Gemini en Hostinger vía Antigravity

导出时间: 4/3/2026, 2:20:51 a.m.

---

**INFORME TÉCNICO DE EJECUCIÓN: INTEGRACIÓN DE CHAT IA (GEMINI) EN HOSTINGER VÍA ANTIGRAVITY**

**Objetivo del Agente:** Orquestar el desarrollo, configuración e implementación continua de un widget de chat impulsado por Gemini dentro de una aplicación web, alojada en la infraestructura de Hostinger.

**Modo de Ejecución Sugerido:**`Planning` -> `Fast` (Iterativo).

\--------------------------------------------------------------------------------

### FASE 1: PREPARACIÓN DEL ENTORNO Y VERSIONADO (ANTIGRAVITY)

**Inicialización del Espacio de Trabajo:**

Abre la carpeta raíz del proyecto web en el Workspace de Antigravity.

Ejecuta la inicialización de Git: `git init`.

**Gestión de Secretos:**

Genera un archivo `.env` en la raíz.

Añade la variable: `GEMINI_API_KEY=tu_clave_de_google_ai_studio`.

Verifica estrictamente que el archivo `.env` esté incluido en el `.gitignore` para evitar filtraciones en repositorios públicos.

**Control de Versiones:**

Utiliza la pestaña _Source Control_ de Antigravity para crear un repositorio **Privado** en GitHub y realizar el primer `push` (`Publish to GitHub`).

### FASE 2: CONFIGURACIÓN DEL BACKEND (OPENCLAW EN HOSTINGER VPS)

_Nota para el Agente: El frontend web no debe comunicarse directamente con la API de Gemini. Se utilizará OpenClaw como motor intermediario._

**Despliegue de Infraestructura:**

En el hPanel de Hostinger, accede a la sección **VPS** y selecciona la plantilla **Docker Manager**.

Localiza y despliega la aplicación **OpenClaw** con un solo clic desde el catálogo de plantillas.

**Inyección de Variables de Entorno (Servidor):**

Configura las variables del contenedor de OpenClaw en Hostinger:

`GEMINI_API_KEY`: \[La clave obtenida en AI Studio\]

`OPENCLAW_GATEWAY_TOKEN`: \[Token de acceso seguro generado automáticamente, guárdalo para el frontend\].

**Activación de Puertos:**

Verifica en el Firewall de Hostinger que los puertos HTTP/HTTPS (80, 443) y el puerto de WebSocket del Gateway estén abiertos.

### FASE 3: DESARROLLO DEL FRONTEND E INTEGRACIÓN DEL WIDGET

**Instalación del Cliente de Chat:**

En la terminal de Antigravity, integra la interfaz de usuario. Si usas React/Vite, instala el SDK del cliente o inyecta el WebChat nativo de OpenClaw (PinchChatWeb).

**Inyección del Código en la Web:**

En el archivo principal (ej. `App.jsx` o `index.html`), inserta el componente o script del widget.

Configura la conexión al Gateway del VPS de Hostinger:

`Endpoint URL`: `https://[IP_DEL_VPS_HOSTINGER_O_DOMINIO]`

`Auth`: Configura el paso del `OPENCLAW_GATEWAY_TOKEN` para autenticar las solicitudes.

**Ajuste de Compilación (Si aplica Vite):**

Edita `vite.config.ts` o `vite.config.js` y asegura la ruta relativa para Hostinger: `base: './'`.

### FASE 4: CONFIGURACIÓN DE ENRUTAMIENTO (LITESPEED / APACHE)

Si el frontend se despliega en un entorno de Alojamiento Compartido/Cloud de Hostinger (Servidores LiteSpeed):

Crea un archivo `.htaccess` en la carpeta `public` o `dist` de Antigravity.

Escribe las reglas de reescritura para la SPA y fuerza el HTTPS:

### FASE 5: AUTOMATIZACIÓN DEL DESPLIEGUE (CI/CD VÍA GITHUB ACTIONS)

Para que los cambios realizados en Antigravity se reflejen automáticamente en el sitio web de Hostinger:

**Crear Workflow:**

En Antigravity, crea la ruta `.github/workflows/deploy.yml`.

**Definir la Acción (Si es VPS):**

Utiliza la acción oficial de Hostinger configurando los secretos en GitHub:

_(Alternativa para Web Hosting Compartido):_ En hPanel, ve a Avanzado > Git, enlaza el repositorio privado de GitHub, añade la Deploy Key generada, y activa el "Webhook" para Auto Implementación.

### FASE 6: VERIFICACIÓN FINAL (AGENT WALKTHROUGH)

Ejecuta el comando `npm run build` localmente para validar que no hay errores de compilación.

Realiza un `git commit` de los archivos finales (incluyendo el `.htaccess` y los flujos de GitHub Actions) y haz `push` a la rama `main`.

Valida mediante el registro (log) de implementación o navegando a la URL de producción que el widget de chat de IA se renderiza correctamente y responde a las consultas utilizando el modelo de Gemini.

\--------------------------------------------------------------------------------

**Directiva de seguridad:** Nunca expongas la `GEMINI_API_KEY` en el código estático del frontend. Toda petición de IA debe procesarse del cliente hacia OpenClaw (Hostinger VPS) y de allí hacia Google AI Studio.