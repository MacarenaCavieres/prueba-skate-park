const formDatos = document.querySelector("#formDatos");
const btnEliminar = document.querySelector("#btnEliminar");
const btnActualizar = document.querySelector("#btnActualizar");

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
        try {
            await axios.delete(`/eliminar`, { data });
            alert("Cuenta eliminada");
            window.location.href = "/";
        } catch (error) {
            console.error(error);
        }
    }
});

btnActualizar.addEventListener("click", async (e) => {
    e.preventDefault();
    const password = formDatos.password.value;
    const repeat_password = formDatos.repeat_password.value;
    const email = formDatos.email.value;
    const nombre = formDatos.nombre.value;
    const anos_experiencia = formDatos.anos_experiencia.value;
    const especialidad = formDatos.especialidad.value;

    if (
        !password.trim() ||
        !repeat_password.trim() ||
        !email.trim() ||
        !nombre.trim() ||
        !anos_experiencia.trim() ||
        !especialidad.trim()
    )
        return alert("Todos los campos obligatorios");
    if (password !== repeat_password) return alert("Contraseñas no coinciden");

    const data = {
        email,
        nombre,
        password,
        repeat_password,
        anos_experiencia,
        especialidad,
    };

    try {
        await axios.put("/actualizar", data);
        alert("Datos actualizados");
        window.location.href = "/";
    } catch (error) {
        console.error(error);
    }
});
