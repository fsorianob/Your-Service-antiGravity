# 🚀 YourService - Technical Handoff & Architecture Status
**Última actualización:** 25 de Febrero, 2026
**Punto de Partida para la Nueva Sesión de IA:** *Implementar y optimizar todo lo dentro de la pantalla de Administración (`AdminDashboard.tsx`).*

---

## 🚫 🛑 REGLAS NÚCLEO ABSOLUTAS PARA CUALQUIER IA 🛑 🚫
**DEBES INTEGRAR ESTO EN TU NÚCLEO PARA CUALQUIER TAREA POSTERIOR AL LEER ESTE DOCUMENTO:**
1. **Directorio Exclusivo:** Solo debes trabajar en esta carpeta del proyecto: `/Users/fsb/YS en Antigravity/your-service-vite`.
2. **Rama de Despliegue Obligatoria:** Debes integrar siempre todo el código fuente en la rama `deploy`. **JAMÁS SE DEBE TRABAJAR NI EMPUJAR CÓDIGO A LA RAMA `main`**, o nunca se logrará la implementación automática de Hostinger. Hostinger lee y despliega automáticamente el código depositado en la rama `deploy`.
3. **Scripts de VITE:** No intentes usar `gh-pages` ni el comando `npm run deploy` en esta arquitectura. Todo sucede por Git-Push directo a la rama `deploy`.

---

## 🏗️ 1. Pila Tecnológica (Tech Stack)
- **Frontend:** React (Vite) + TypeScript.
- **Enrutamiento:** `react-router-dom` (Navegación protegida con Contexto de Autenticación).
- **Estilos:** Tailwind CSS + Componentes UI estructurados (variante shadcn-like) en `src/components/ui/`.
- **Iconos:** `lucide-react`.
- **Backend / Auth:** Supabase (Autenticación + Base de Datos Row Level Security).
- **Despliegue Automático:** Git integrado nativamente con Hostinger. Al empujar código OBLIGATORIAMENTE a la rama `deploy`, Hostinger se encarga de extraerlo, realizar el `npm run build` en su servidor, e implementar la aplicación web en producción. No usar comandos de deploy locales ni gh-pages.

---

## 📊 2. Estado Actual de la Base de Datos (Supabase)
### Tabla Principal: `profiles`
- Maneja todos los perfiles a partir del Trigger de autenticación de Supabase.
- **Restricción Clave Modificada:** Se ejecutó un `ALTER TABLE` para modificar la restricción `profiles_role_check`. Ahora el campo `role` permite los valores: `('client', 'professional', 'admin')`.
- Las consultas en los Dashboards se basan en este campo `role`.

### Credenciales de Acceso Administrador Creadas Manualmente
El Super Admin fue inyectado directamente usando un script de entorno (saltando el flujo normal) porque la interfaz de registro estándar está pensada para Clientes y Negocios.
- **Correo (Acceso Oficial):** `fernandosoriano@yourservice.cl`
- **Contraseña:** `180714a14A-`
- **Rol en base de datos:** `admin`

---

## 🖥️ 3. Resumen Técnico de los Dashboards
Se completó un gran "Visual & Logic Refactor" de los tres entornos de usuario para unificar la marca visual, aplicando la etiqueta dinámica de roles en la parte inferior del Menú/Navegación ("SoyCliente", "SoyNegocio", "SoyAdmin"), acompañados del avatar del usuario y su nombre real obtenido de metadata.

### 💼 A. Client Dashboard (`src/pages/ClientDashboard.tsx`)
- UI pulida. Tiene un Input de Búsqueda de servicios conectado a router (`/search?q=`).

### 🛠️ B. Pro Dashboard (`src/pages/ProDashboard.tsx`)
- Sidebar completo que renderiza el nombre completo, primera letra dinámicamente. 
- Componente de Buzón de leads (Por ahora visual UI) y Métricas UI. 

### 👑 C. Admin Dashboard (`src/pages/AdminDashboard.tsx`) - **[El Foco Actual]**
**Estado Front + Backend Integrado:** Se reemplazaron los contenedores vacíos con llamadas asíncronas de datos reales desde Supabase usando `useState`, `useEffect` y `useCallback`:
1. **Métricas en Tiempo Real:** 
   - `Usuarios Totales`: Conteo exacto de la tabla `profiles`.
   - `Profesionales Activos`: Conteo de `profiles` filtrados por `role = 'professional'` y `verified = true`.
   - `Servicios Completados`: Conteo de solicitudes en la tabla `requests` donde `status = 'completed'`.
2. **Sistema KYC (Verificación Pendiente):**
   - El sistema extrae en un array de estado a todos los usuarios con `role = 'professional'` que tengan el boolean `verified` en `false`.
   - **Botón Aprobar:** Actualiza vía API de Supabase el campo a `verified: true` e invoca un refresco asíncrono instántaneo para "limpiar" la tarjeta aprobada de la vista sin recargar la app.
3. **Formulario de Invitación:** UI de "Invitar Administrador" preparada (front-end con su estado de validación visual).

---

## 🎯 4. PRÓXIMO PASO OBLIGATORIO (Tu Misión Inicial)
El usuario solicita cerrar este entorno e iniciar uno nuevo y limpio. Tu primera tarea al leer este documento es:

**"Implementar y optimizar todo lo dentro de la pantalla de Adm (`AdminDashboard.tsx`)."**

**Frentes sugeridos de desarrollo para el AdminDashboard:**
1. **Perfeccionar la UI/UX:** Que las métricas visuales reaccionen más dinámicamente y las alertas sean precisas (e.g. integrar libería Toaster de UI para feedback de aprobaciones).
2. **Lógica de "Rechazar":** Programar la lógica del botón "Rechazar" en la cola de KYC (ej. eliminar el perfil o enviar warning flag).
3. **Lógica Real de "Invitar Administrador":** Crear un flujo seguro o un trigger en Supabase para poder crear un usuario "Admin" secundario al enviar su correo desde el panel.
4. **Gestor de Ingresos:** Conectar la variable de "Comisión %" de la página con una constante global, o tabla config en base de datos.
5. **Mejoras Estructurales:** Mover la lógica pesada a custom Hooks (e.g., `useAdminData()`) para no saturar el código de la vista (JSX).

📝 **Nota de contexto continuo:**
El usuario valora muchísimo el **detallismo estético (High-End Premium)**. Las tablas de control del Admin deben verse de nivel Silicon Valley, oscuras, con buen glassmorphism, sombras consistentes, y los loaders tienen que ser elegantes.

**¡Buena suerte, IA en turno! Tienes el contexto intacto.**
