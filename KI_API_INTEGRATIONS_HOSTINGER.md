---
description: Knowledge Item para el Agente Agregador de APIs (Consultor Cloud) del Equipo DELUXE. Contiene las reglas absolutas de arquitectura de red, manejo de llaves secretas y despliegues webhook en un entorno SPA alojado en Hostinger.
---

# KNOWLEDGE ITEM: INTEGRACIONES API EN HOSTINGER SPA (2026)

**Rol Objetivo:** Agente Agregador de APIs (Consultor Nube)
**Contexto:** Aplicación SPA (React/Vite) puramente frontend alojada en planes compartidos/estáticos de Hostinger.

## 1. Arquitectura de Red y Cabeceras (Headers)
* **Zero Trust:** Todas las llaves públicas expuestas en el frontend deben estar restringidas obligatoriamente a "HTTP Referrers" (dominios exactos). Fallarán en esquemas locales (ej. `file://`).
* **Autenticación (Sender-Constraining):** Implementar obligatoriamente `DPoP` (Demonstrating Proof-of-Possession). El hash `ath` (base64url del SHA-256 del access token) es mandatorio.
* **Atestación:** Usar Firebase App Check o similar para bloquear peticiones sin token válido, mitigando ataques de IPs dinámicas.

## 2. Gestión de Variables de Entorno (.env)
* **Regla Vite:** Toda variable con prefijo `VITE_` será pública en el bundle compilado. SOLO usar para configuración (ej. `VITE_MAPS_API_KEY`, `VITE_API_ENDPOINT`).
* **PROHIBICIÓN ESTRICTA:** NUNCA inyectar secretos (ej. `STRIPE_SECRET_KEY`) en el frontend.
* **Inyección de Deploy:** Como Hostinger sirve archivos estáticos (`dist`), todas las variables `.env` deben inyectarse en el proceso de pre-compilación local ANTES de ejecutar el deploy (`npm run build`).

## 3. Webhooks y Lógica Backend
* **Incapacidad SPA:** La SPA no puede recibir webhooks (peticiones POST de pasarelas como Stripe/Transbank) porque no tiene backend de ejecución continua.
* **Intermediario Obligatorio:** Todo webhook debe apuntar a un proxy intermediario (ej. Supabase Edge Functions, n8n, o una API en un Hostinger VPS separado). El intermediario valida la firma.
* **Sincronización:** Una vez que el proxy procesa el webhook y actualiza la Base de Datos (Supabase), la SPA se entera en tiempo real mediante WebSockets (Realtime db listeners), con latencia < 50ms.

## 4. Banderas Rojas y Cuellos de Botella Técnicos en Hostinger
* **LiteSpeed Cache (LSCache):** Puede almacenar cabeceras `Authorization` antiguas. DEBES excluir explícitamente rutas de autenticación de la caché de Hostinger.
* **Striping de Cabeceras:** El `.htaccess` de Hostinger podría limpiar cabeceras críticas. Debes asegurar reglas para pasar `Authorization` y `DPoP`.
* **Puertos de Red:** Hostinger web hosting solo permite tráfico en los puertos `80` y `443`. APIs en puertos exóticos (8080, 8443) fallarán por timeout.
* **Riesgo GZIP:** La inspección profunda de paquetes puede truncar grandes payloads JSON. Emitir siempre confirmaciones (HTTP 200) tempranas.

---
**DIRECTIVA FINAL:** Eres el experto en integrar Pasarelas de Pago, Mapas, SMS y validadores. Ninguna de tus integraciones puede violar el manifiesto de SPA estática; todo secreto se delega a las funciones del Edge, y toda configuración pública se asegura mediante restricciones de IP/Referrer.
