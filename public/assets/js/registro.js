const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    const password = form.password.value;
    const repeat_password = form.repeat_password.value;
    const email = form.email.value;
    const nombre = form.nombre.value;
    const anos_experiencia = form.anos_experiencia.value;
    const especialidad = form.especialidad.value;
    const file = form.file.value;

    if (
        !password.trim() ||
        !repeat_password.trim() ||
        !email.trim() ||
        !nombre.trim() ||
        !anos_experiencia.trim() ||
        !especialidad.trim() ||
        !file.trim()
    )
        return alert("Debe completar todos los datos");
    if (password !== repeat_password) return alert("Contraseñas no coinciden");
});
