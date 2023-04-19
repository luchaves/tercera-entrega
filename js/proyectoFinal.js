//array

class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

//Declaracion de arrays
const compras = [];
let carrito = [];
let productos = [];
const precioCarrito = [];
const cartas = document.getElementById(`cartas`)
const contenidoCarrito = document.getElementById(`carrito`)
const total = document.getElementById(`totalAPagar`)
const btnPrecio = document.getElementById(`btnCarrito`)
const btnCompra = document.getElementById(`btnCompra`)
const btnCerrar = document.getElementById(`btnCerrar`)


//Ejecución de funciones
AOS.init();
//cardsProductos();
calcularPrecio();
obtenerProductos();
lsCarrito();


//Declaracion de funciones

function lsCarrito() {
    if (localStorage.getItem(`carrito`)) {
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        calcularPrecio()
    }
}

function obtenerProductos() {
    const URLJSON="js/productos.json"
    fetch(URLJSON)
        .then(res => res.json())
        .then(data=>{
            console.log(data);
            productos=data
            cardsProductos()
        })
    }
    

function cardsProductos() {

    for (const producto of productos) {
        let carta = document.createElement(`div`);
        carta.className = `card`;
        carta.innerHTML = `<div>
        <img src="${producto.img}" class="productos_img card-img-top" alt="productos">
    <div class="card-body">
        <h5 class="d-flex justify-content-center align-items-center card-title">${producto.tipo}</h5>
        <h6 class="d-flex justify-content-center align-items-center card-title talles">Talles disponibles<br>${producto.talle}</h6>
        <div class="d-flex justify-content-around align-items-center">
            <p class="card-text">$${producto.precio}</p>
            <div>
            <button id="agregarCarrito${producto.id}" type="button" class="btn btn-primario"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    </div>
    </div>
    `;
        cartas.append(carta);
        // Evento Button 
        const button = document.getElementById(`agregarCarrito${producto.id}`)
        button.addEventListener("click", (e) => {
            e.preventDefault()
            Swal.fire(
                `${producto.tipo}`,
                `Agregado al carrito`,
                `success`
            );
            carrito.push(producto)
            //console.log(carrito)
            calcularPrecio();
            localStorage.setItem("Carrito", JSON.stringify(carrito))
        })
    }
}


//funcion precio carrito
function calcularPrecio() {
    const precios = carrito.map(x => x.precio)
    precioCarrito.push = (precios)
    const { push } = precioCarrito
    const sumaPrecio = (...push) => {
        return push.reduce((acc, el) => acc + el, 0);
    }
    let montoTotal = sumaPrecio(...push)
    //console.log(montoTotal);
    carrito.length === 0 ? total.innerHTML = `<p>¡Su carrito se encuentra vacío!</p>` : total.innerHTML = `<p>Total a apagar $${montoTotal}</p>`
}

btnPrecio.addEventListener("click", contCarrito)

function contCarrito() {
    for (const producto of carrito) {
        let contCarrito = document.createElement(`div`);
        contCarrito.innerHTML = ` 
        <div class=cardCarrito>
        <img src="${producto.img}" class="cart_image" alt="productos">
        <div class="cart_cont">
        <h5 class=" d-flex justify-content-center align-items-center card-title">${producto.tipo}</h5>
        <div class="d-flex justify-content-around align-items-center">
        <p class="card-text">$${producto.precio}</p>
                </div>
            </div>
            </div>
            <hr>
            `;
        contenidoCarrito.append(contCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito))

    }
}


btnCerrar.addEventListener(`click`, function () {
    contenidoCarrito.innerHTML = ``;
})

btnCompra.addEventListener(`click`, function () {
    carrito.length !== 0 ?
        //Si el carrito tiene productos y se presiona comprar.
        correct()
        :
        //Si el carrito no posee productos y se presiona comprar. 
        Swal.fire(
            `¡Aun no posee productos en su carrito!`,
            `Seleccione el prodcuto que desee y vuelva a intentarlo`,
            `error`
        );
})

function correct() {
    Swal.fire(
        `¡Su compra se ha realizado con exito!`,
        `No dude en volver a comprarnos`,
        `success`
    )
    compras.push(carrito)
    contenidoCarrito.innerHTML = ``;
    localStorage.setItem("Compra exitosa", JSON.stringify(compras[0]))
    carrito.length = 0;
    contCarrito();
    calcularPrecio();
    localStorage.removeItem("carrito", JSON.stringify(carrito))
}