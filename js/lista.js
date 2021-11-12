const response = [
    {
        id: 1,
        game: "Valorant",
        level: "150",
        rank: "Diamante"
    },
]
let $template = document.getElementById("template-box").content;
response.forEach((persona) => {
    $template.querySelector(".card-level").textContent = "LVL:" + persona.level;
    $template.querySelector(".card-game").src = "../img/"+ persona.game +"/" + persona.game + "_logo.png";
    $template.querySelector(".card-rank").src = "../img/"+ persona.game +"/rank/" + persona.rank + ".png";

    let $clone = document.importNode($template, true);
    let $fragment = document.getElementById("sos");
    $fragment.appendChild($clone);
});