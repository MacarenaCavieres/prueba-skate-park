const node = document.querySelectorAll(".check");

node.forEach((item) => {
    item.addEventListener("click", async (e) => {
        const estado = e.target.checked;
        const id = e.target.id;

        const data = {
            id,
            estado,
        };

        await axios.put("/estado", data);

        alert("Estado cambiado exitosamente");
    });
});
