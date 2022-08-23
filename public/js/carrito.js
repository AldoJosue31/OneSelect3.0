var Datastore = require('nedb');
let TempNombre = "";
let TempApellido;
let TempDescripcion;
let resultado = 0;

const carrito = new Datastore({
    filename: 'db/carrito.db',
     autoload: true
    });


    function agregarCarProducto(nombre, precio, descripcion){
        var productos = {
            nombre: nombre,
            precio: precio,
            descripcion: descripcion
        };
    
        carrito.insert(productos, function(error, nuevoObjeto){
    
        });
    };
    function obtenerCarProductos(operacion) {
        carrito.find({}, function(err, productos){
            if(productos){
                operacion(productos);
            }
            if (err) {
                console.error(err);
                process.exit(0);
            }
        });
    };
    
    function eliminarCarProducto (id) {
        carrito.remove({_id: id},  {}, function(error, numeroRegistrosEliminados){
    
        });
    };

  


class GestorCarrito {
    constructor() {

        this.CajaCarrito = document.getElementById('cajaCarrito');

        this.txtTotal = document.getElementById('TextoTotal');


        this.cargarCajaCarProducto();
        this.generarTotal();
    }

    generarTotal() {
        obtenerCarProductos((elemento) => {
            elemento.forEach(element => {
                resultado = resultado + Number(element.precio);
            });
            document.getElementById('TextoTotal').innerHTML = resultado;
            resultado = 0;
        });
    }

    crearCajaProducto(iden) {
        dba.findOne({ _id: iden }, function (err, doc) {
            agregarCarProducto(doc.nombre,doc.precio,doc.descripcion);
          });
    
          this.cargarCajaCarProducto();
          this.generarTotal();
    }

    generarHtmlCajaCarProducto(carProducto){
        return `
        <div class="mt-4 mb-4  bg-dark text-light border border-2 border-light  border-start-0  border-stop-0"">
        <div class="row g-0">
          <div class="col border-end">
            <div class="d-grid gap-2">
              <button class="btn btn-dark btn-sm" type="button">+</button>
              <button class="btn btn-dark btn-sm" type="button">-</button>
            </div>
        </div>
        <div class="container col-8">
        <h5>${carProducto.nombre}</h5>
        <h4>$${carProducto.precio}</h4>
        </div>
        <input type="button" class="col md-1 bg-dark text-light" onclick="Carrito.eliminarCajaCarProducto('${carProducto._id}');">
          XX
        </input>
        </div>
      </div>
        `;
    }

    cargarCajaCarProducto() {
        obtenerCarProductos((carProductos) => {
            let cajasHTML = carProductos.map(this.generarHtmlCajaCarProducto).join('');

            this.CajaCarrito.innerHTML = cajasHTML;
        });
    }

 

    eliminarCajaCarProducto(id) {
        eliminarCarProducto(id);

        this.cargarCajaCarProducto();
        this.generarTotal();
    }
};


let Carrito = new GestorCarrito();