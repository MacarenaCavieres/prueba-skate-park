const formDatos = document.querySelector("#formDatos");
const btnEliminar = document.querySelector("#btnEliminar");

btnEliminar.addEventListener("click", async (e) => {
    e.preventDefault();
    const password = formDatos.password.value;
    const repeat_password = formDatos.repeat_password.value;
    const email = formDatos.email.value;

    if (!password.trim() || !repeat_password.trim()) return alert("Debe ingresar su contraseña");
    if (password !== repeat_password) return alert("Contraseñas no coinciden");

    const data = {
        email,
        password,
        repeat_password,
    };

    const preg = confirm("Segur@ quiere eliminar la cuenta?");

    if (preg) {
        await axios.delete(`/eliminar`, { data });
        window.location.href = "/";
    }
});
