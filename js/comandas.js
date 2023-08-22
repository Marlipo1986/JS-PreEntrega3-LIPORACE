import { platosDisponibles } from "./main.js";

JSON.parse(sessionStorage.getItem("comandas")) === null && sessionStorage.setItem("comandas", JSON.stringify([]));

document.addEventListener("DOMContentLoaded",() => {
    dibujarComandas()
});

let comandas = JSON.parse(sessionStorage.getItem("comandas")) === [];
const listaComandas = document.getElementById("items");
const footComandas = document.getElementById("totales");

export const comandarPlato = (idPlato) => {
    
    const plato = platosDisponibles.find((plato) => plato.id === idPlato);

    const { nombre, precio, imagen, id} = plato;

    const platoComandas = comandas.find((plato) => plato.id ===idPlato);

    if(platoComandas === undefined){
        const nuevoPlatoComandas = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1,
        }
        comandas.push(nuevoPlatoComandas)
        sessionStorage.setItem("comandas",JSON.stringify(comandas))
    }else{
        const indexPlatoComandas = comandas.findIndex((plato) => plato.id === idPlato)
        comandas[indexPlatoComandas].cantidad++
        comandas[indexPlatoComandas].precio = precio * comandas[indexPlatoComandas].cantidad

        sessionStorage.setItem("comandas",JSON.stringify(comandas))
    }
    comandas = JSON.parse(sessionStorage.getItem("comandas"))

    alert(`Agregamos ${nombre} a la orden`)
};

const dibujarComandas = () => {

    comandas.forEach(plato => {
        
        const { imagen, nombre, cantidad, precio, id } = plato;

        let body = document.createElement("tr");
        
        body.className = "plato__comandas";

        body.innerHTML = `
        <th><img id="fotoPlatoComandas" src= "${imagen} class="card-img-top"</th>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio / cantidad}</td>
        <td>${precio}</td>
        <td>
            <button id="+${id}" class="btn btn-success">+</button>
            <button id="-${id}" class="btn btn-danger">-</button>
        </td>
        `

        listaComandas.append(body)

        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => console.log(id))
        btnRestar.addEventListener("click",() => console.log(id))

    });

    dibujarFooter()

    const dibujarFooter = () =>{
        if()
    }
}