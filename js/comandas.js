import { platos } from "../db/platos.js";
import { platosDisponibles } from "./main.js";

JSON.parse(sessionStorage.getItem("comandas")) === null && sessionStorage.setItem("comandas", JSON.stringify([]));

document.addEventListener("DOMContentLoaded",() => {
    dibujarComandas()
});

let comandas = JSON.parse(sessionStorage.getItem("comandas")) === [];
const listaComandas = document.getElementById("items");
const footComandas = document.getElementById("totales");
const btnComandas = document.getElementById("btnComandas");
const comandasTable = document.getElementById("comandas");

btnComandas.addEventListener("click", () => {
    if(comandasTable.style.display ==="block") {
        comandasTable.style.display = "none";
    }else{
        comandas.Table.display = "block";
        dibujarComandas()
    }
})


export const comandarPlato = (idPlato) => {
    
    const plato = platosDisponibles.find((plato) => plato.id === idPlato);

    const { nombre, precio, imagen, id} = plato;

    const platoComandas = platos.find((plato) => plato.id ===idPlato);

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
        const indexPlatoComandas = platos.findIndex((plato) => plato.id === idPlato)
        platos[indexPlatoComandas].cantidad++
        platos[indexPlatoComandas].precio = precio * platos[indexPlatoComandas].cantidad

        sessionStorage.setItem("comandas",JSON.stringify(comandas))
    }
    comandas = JSON.parse(sessionStorage.getItem("comandas"))

    alert(`Agregamos ${nombre} a la orden`)
};

const dibujarComandas = () => {

    platos.forEach(element => {
        
    });(plato => {
        
        listaComandas.innerHTML = ''
        
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

    const dibujarFooter = () => {
        if(comandas.length >0) {
            footComandas.innerHTML = ""

            let footer = document.createElement("tr")

            footer.innerHTML = `
            <th><b>Totales: </b></th>
            <td></td>
            <td>${generarTotales().cantidadTotal}</td>
            <td></td>
            <td>${generarTotales().costoTotal}</td>
            `

            footComandas.append(footer)
        }else{
            footComandas.innerHTML = "<h3>No hay platos pendientes de ordenar</h3>"
        }
    }
}

const generarTotales = () => {
    const costoTotal = comdandas.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = comandas.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

const aumentarCantidad = (id) => {
    const indexProductoComandas = Comandas.findIndex((producto) => producto.id === id)
    const precio = Comandas[indexProductoComandas].precio / Comandas[indexProductoComandas].cantidad

    Comandas[indexProductoComandas].cantidad++
    Comandas[indexProductoComandas].precio = precio*Comandas[indexProductoComandas].cantidad

    sessionStorage.setItem("Comandas", JSON.stringify(Comandas))
    dibujarComandas()

}

const restarCantidad = (id) => {
    const indexProductoComandas = Comandas.findIndex((producto) => producto.id === id)
    const precio = Comandas[indexProductoComandas].precio / Comandas[indexProductoComandas].cantidad

    Comandas[indexProductoComandas].cantidad--
    Comandas[indexProductoComandas].precio = precio*Comandas[indexProductoComandas].cantidad

    if(Comandas[indexProductoComandas].cantidad === 0){
        Comandas.splice(indexProductoComandas, 1)
    }

    sessionStorage.setItem("Comandas", JSON.stringify(Comandas))
    dibujarComandas()



}