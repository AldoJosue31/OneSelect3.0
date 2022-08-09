const Datastore = require('nedb');
var codigo;
function getCodigo(id){
    codigo;
    codigo = id;
    console.log(codigo);
}

let carrito = new Datastore({
    filename: 'db/carrito.db',
     autoload: true
    });
    


class GestorCarrito {
    constructor() {

        this.SumaTotal = 0;

        this.btnCrearRegistro = document.getElementById('btnCrearRegistro'); 

        this.cargarProductoCarrito();
    }

    agregarCarrito(id) { 
        carrito.findOne({ _id: id }, function (err, doc) {
            inputOrden.value += indice +'| ' + doc.nombre + ' |';
            suma = parseInt(doc.precio) + this.SumaTotal;
            totalnumero = suma;
            total.innerHTML= totalnumero;
          });
    }

    generarHtmlCajaProducto(producto){
        return `
            <div class="col border border-light p-3">
            <div class="card bg-dark text-light">
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                <h7>$${producto.precio}</h7>
                <br>
                <br>
                <a class="btn btn-primary"onclick="mandarInput('${producto._id}')">Agregar</a>
              </div>
            </div>
          </div>
        `;
    }
    
}

let Carrito = new GestorCarrito();

