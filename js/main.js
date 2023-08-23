import { comandarPlato } from "./comandas.js"


const divPlatos = document.getElementById("platos")
const divComandas = document.getElementById("comandas")

export let platosDisponibles = JSON.parse(localStorage.getItem("platos"))

document.addEventListener("DOMContentLoaded",() => {
    generarCardsPlatos(platosDisponibles)
})

export const generarCardsPlatos = (platos) => {
    divPlatos.innerHTML = "";
    platos.forEach((platos) => {
        
        const { imagen, nombre, categoria, precio, id} = platos

        let card = document.createElement("div")
        card.className = "platos"
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${categoria}</p>
                <p class="card-text">$${precio}</p>
                <button id="boton${id}" class="btn btn-primary">Comprar</button>
            </div>
        </div>`
        
        divPlatos.appendChild(card);

        const btnComandas = document.getElementById(`boton${platos.id}`)
        btnComandas.addEventListener("click", () => comandarPlato(id))

    });
};





