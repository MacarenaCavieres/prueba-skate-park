const formDatos = document.querySelector("#formDatos");
const btnEliminar = document.querySelector("#btnEliminar");

btnEliminar.addEventListener("click", (e) => {
    e.preventDefault();
    const password = formDatos.password.value;
    const repeat_password = formDatos.repeat_password.value;
    console.log(password, repeat_password);
});
