# 🚀 Guía de Despliegue en VM

Esta guía explica cómo desplegar la aplicación en una máquina virtual (VM) usando Docker.

## Requisitos en la VM

- Ubuntu 22.04 LTS (o similar)
- Docker instalado
- Docker Compose instalado
- Puerto 80 y 443 abiertos en el firewall

---

## Paso 1: Preparar la VM

### Instalar Docker (si no está instalado)

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Añadir tu usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo apt install docker-compose-plugin -y

# Verificar instalación
docker --version
docker compose version
```

---

## Paso 2: Subir el proyecto a la VM

### Opción A: Con Git (Recomendado)

```bash
# En la VM
cd /opt
sudo git clone <tu-repo-url> saneamientos
cd saneamientos/web
```

### Opción B: Con SCP desde tu PC Windows

```powershell
# Desde PowerShell en Windows (ajusta la IP y ruta)
scp -r "C:\Users\JoseLuis\OneDrive\Desktop\Saneamientos\web" usuario@IP_VM:/opt/saneamientos/
```

---

## Paso 3: Configurar variables de entorno

```bash
# En la VM, dentro de /opt/saneamientos/web
nano .env
```

Contenido del archivo `.env`:

```env
N8N_CONTACT_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/xxx
```

---

## Paso 4: Construir y ejecutar con Docker

```bash
# En la VM, dentro de /opt/saneamientos/web
docker compose up -d --build

# Ver logs
docker compose logs -f

# Ver estado
docker compose ps
```

La aplicación estará disponible en: `http://IP_DE_TU_VM:3000`

---

## Paso 5: Configurar Nginx como Reverse Proxy (Opcional pero recomendado)

Esto permite acceder por puerto 80 (HTTP) y añadir SSL.

### Instalar Nginx

```bash
sudo apt install nginx -y
```

### Configurar virtual host

```bash
sudo nano /etc/nginx/sites-available/saneamientos
```

Contenido:

```nginx
server {
    listen 80;
    server_name TU_IP_O_DOMINIO;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Activar configuración

```bash
sudo ln -s /etc/nginx/sites-available/saneamientos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Ahora la app está disponible en: `http://TU_IP_O_DOMINIO` (puerto 80)

---

## Paso 6: Añadir SSL con Let's Encrypt (Cuando tengas dominio)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado (reemplaza con tu dominio)
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# El certificado se renueva automáticamente
```

---

## Comandos útiles

```bash
# Ver logs en tiempo real
docker compose logs -f

# Reiniciar aplicación
docker compose restart

# Actualizar con nuevos cambios
docker compose down
git pull  # si usas git
docker compose up -d --build

# Ver uso de recursos
docker stats

# Parar todo
docker compose down
```

---

## Troubleshooting

### Error de permisos

```bash
sudo chown -R $USER:$USER /opt/saneamientos
```

### Puerto 3000 ocupado

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :3000
# O cambiar el puerto en docker-compose.yml
```

### Ver logs de error

```bash
docker compose logs --tail=100
```

---

## Estructura final en la VM

```
/opt/saneamientos/
└── web/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── .env
    ├── package.json
    ├── app/
    └── public/
```

---

## Resumen de URLs

| Configuración | URL |
|---------------|-----|
| Solo Docker | `http://IP:3000` |
| Con Nginx | `http://IP` o `http://IP:80` |
| Con SSL | `https://tudominio.com` |
