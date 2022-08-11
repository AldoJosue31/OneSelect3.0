var Datastore = require('nedb');
let TempNombre = "";
let TempApellido;
let TempDescripcion;

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


        this.cargarCajaCarProducto();
    }


    crearCajaProducto(iden) {
        dba.findOne({ _id: iden }, function (err, doc) {
            TempNombre = doc.nombre
            TempApellido = doc.precio
            TempDescripcion = doc.descripcion
            
          });

          console.log(TempNombre)
          console.log(TempApellido)
          console.log(TempDescripcion)

          agregarCarProducto(TempNombre,TempApellido,TempDescripcion);
          TempNombre = "";
          TempApellido = "";
          TempDescripcion = "";
  
          this.cargarCajaCarProducto();

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
            let h = carProductos.map(this.generarHtmlCajaCarProducto).join('');

            this.CajaCarrito.innerHTML = h;
        });
    }

 

    eliminarCajaCarProducto(id) {
        eliminarCarProducto(id);

        this.cargarCajaCarProducto();
    }
};


let Carrito = new GestorCarrito();
