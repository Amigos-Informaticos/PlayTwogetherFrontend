const response = [
    {
        id: 1,
        name: "Valorant"
    },
    {
        id: 2,
        name: "apexLegends"
    },
    {
        id:3,
        name: "lol"
    }
]
let $template = document.getElementById("template-game").content;
response.forEach((game) => {
    $template.querySelector(".card-game").src = "../img/"+ game.name +"/" + game.name + "_logo.png";
    $template.querySelectorAll(".box *").forEach((element)=>{
        element.dataset.name_game = game.name;
        element.id = game.name + "Card";
    })

    let $clone = document.importNode($template, true);
    let $fragment = document.getElementById("games-container");
    $fragment.appendChild($clone);
});

document.addEventListener("click", (event) => {
    if (event.target.matches(".box *")) {
        location.href = `../view/Add${event.target.dataset.name_game}.html`
    }
});