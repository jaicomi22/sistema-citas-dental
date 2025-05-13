
# Sistema de Citas Dental 🦷

Este sistema permite agendar, visualizar y gestionar citas para un consultorio dental, incluyendo recordatorios automáticos vía WhatsApp 24 horas antes de la consulta.

## 🧩 Tecnologías utilizadas

- React (frontend)
- Node.js + Express (backend)
- node-cron (tareas programadas)
- WhatsApp API (envío de recordatorios)
- localStorage (para almacenamiento local)
- GitHub (control de versiones)

---

## 📂 Estructura del proyecto

```
sistema-citas-dental/
├── backend-citas/
│   ├── index.js
│   └── .env
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       └── label.jsx
│   ├── AdminCitas.jsx
│   └── main.jsx
├── index.html
└── package.json
```

---

## 🚀 Instrucciones para levantar el backend

1. Abre terminal en la carpeta `backend-citas`.
2. Instala las dependencias:

```bash
npm install express axios dotenv node-cron
```

3. Crea un archivo `.env` con la URL de tu API de WhatsApp:

```
WHATSAPP_API_URL=https://tu-api-de-whatsapp.com
```

4. Corre el servidor:

```bash
node index.js
```

---

## ⏰ Envío de recordatorios

El backend ejecuta una tarea cada minuto para buscar citas agendadas y envía un recordatorio por WhatsApp si la cita está a 24 horas de ocurrir.

---

## 📸 Capturas de pantalla

> Puedes agregar aquí imágenes del sistema funcionando, por ejemplo usando `![alt](ruta)` o subiéndolas a GitHub y enlazándolas.

---

## ✨ Autor

Desarrollado por [Tu Nombre](https://github.com/tuusuario)
