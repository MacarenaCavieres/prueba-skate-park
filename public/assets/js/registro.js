const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    const password = form.password.value;
    const repeat_password = form.repeat_password.value;
    if (password !== repeat_password) return alert("Contraseñas no coinciden");
});
