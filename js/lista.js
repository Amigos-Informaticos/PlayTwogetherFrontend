const response = [
    {
        id: 1,
        nombre: "Efraín",
        apellido: "Arenas york",
        sexo: "sí, por favor"
    },
    {
        id: 2,
        nombre: "Adair",
        apellido: "Hdz",
        sexo: "sí, por favor"
    },
    {
        id: 3,
        nombre: "Alexis",
        apellido: "ALV",
        sexo: "sí, por favor"
    }
]
let $template = document.getElementById("template-box").content;
response.forEach((persona) => {
    $template
        .querySelector(".box")
        .setAttribute("id", `box-${persona.id}`);
    $template.querySelector(".box").dataset.id_restaurant = persona.id;

    $template.querySelector(".restaurant-name").textContent = persona.nombre;

    $template.querySelector(".restaurant-schedule").textContent = persona.apellido;

    $template.querySelector(".restaurant-price").textContent = persona.sexo;

    let $clone = document.importNode($template, true);
    let $fragment = document.getElementById("sos");
    $fragment.appendChild($clone);
});