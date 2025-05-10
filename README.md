# 🧑‍💻 Cómo Contribuir a Este Repositorio mediante Fork + Pull Request

Este instructivo explica cómo puedes contribuir a este proyecto de forma segura sin tener acceso directo de escritura. Usa el flujo de trabajo Fork + Pull Request, ideal para mantener control y calidad en el código.

---

## 🔁 1. Haz un Fork del Repositorio

1. Ve al repositorio original en GitHub.
2. Haz clic en el botón **"Fork"** en la esquina superior derecha.
3. Se creará una copia del repositorio en tu cuenta de GitHub.

---

## 💻 2. Clona tu Fork a tu Computadora

Abre una terminal o consola y ejecuta:

```bash
git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
cd NOMBRE_DEL_REPO
```

---

## 🌿 3. Crea una Nueva Rama

Es recomendable trabajar en una rama separada de `main`:

```bash
git checkout -b nombre-de-tu-rama
```

---

## ✍️ 4. Realiza tus Cambios

Haz las modificaciones necesarias en el código utilizando tu editor favorito.

---

## 📦 5. Haz Commit de tus Cambios

```bash
git add .
git commit -m "Descripción clara de los cambios realizados"
```

---

## 🚀 6. Sube los Cambios a tu Fork

```bash
git push origin nombre-de-tu-rama
```

---

## 🔄 7. Abre un Pull Request

1. Ve a tu fork en GitHub.
2. Haz clic en **"Compare & pull request"**.
3. Escribe un título y una descripción detallando tus cambios.
4. Haz clic en **"Create pull request"**.

---

## ✅ 8. Espera la Revisión

El propietario del repositorio original revisará tus cambios y podrá:
- Aceptar el PR,
- Solicitar ajustes,
- O rechazarlo con comentarios.

---

## 🧼 9. Limpieza (Opcional)

Una vez que tu PR haya sido aceptado:

```bash
git branch -d nombre-de-tu-rama
```

Y para mantener tu fork actualizado con el repositorio original:

```bash
git remote add upstream https://github.com/ORIGINAL/NOMBRE_DEL_REPO.git
git fetch upstream
git merge upstream/main
```

---

¡Gracias por tu contribución! 🎉
