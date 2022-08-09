var Datastore = require('nedb');
let totalnumero = 0;
var suma;
var indice = 1;

let dba = new Datastore({
    filename: 'db/productos.db',
     autoload: true
    });



    function agregarProducto(nombre, precio, descripcion){
        var producto = {
            nombre: nombre,
            precio: precio,
            descripcion: descripcion
        };
    
        dba.insert(producto, function(error, nuevoObjeto){
    
        });
    };
    function obtenerProductos(operacion) {
        dba.find({}, function(err, productos){
            if(productos){
                operacion(productos);
            }
            if (err) {
                console.error(err);
                process.exit(0);
            }
        });
    };
    
    
    function eliminarProducto (id) {
        dba.remove({_id: id},  {}, function(err, numeroProductosEliminados){
    
        });
    };
    function mandarInput(id) { 
        dba.findOne({ _id: id }, function (err, doc) {
            inputOrden.value += indice +'| ' + doc.nombre + ' |';
            suma = parseInt(doc.precio) + totalnumero;
            totalnumero = suma;
            indice = indice + 1;
            total.innerHTML= totalnumero;
          });
    }






// end data base

//set option notify
const option = 
{
    animation : true,
    autohide : true,
    delay : 2000
};


class GestorProductos {
    constructor() {
        this.frmNuevoProducto = document.getElementById('frmNuevoProducto');

        this.SecProductos = document.getElementById('SecProductos');
        this.productosTabla = document.getElementById('productosTabla');


        this.nombre = document.getElementById('nombre');
        this.precio = document.getElementById('precio');
        this.descripcion = document.getElementById('descripcion');


        this.btnCrearProducto = document.getElementById('btnCrearProducto'); 

        this.cargarCajaProducto();
        this.cargarTablaroducto();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.frmNuevoProducto.addEventListener('submit', this.crearCajaProducto.bind(this));
     
    }

    crearCajaProducto(event) {
        event.preventDefault();

        agregarProducto(this.nombre.value, this.precio.value, this.descripcion.value);

        this.nombre.value = '';
        this.precio.value = '';
        this.descripcion.value = '';

        this.cargarCajaProducto();
        this.cargarTablaroducto();


    }

    generarHtmlCajaProducto(producto){
        return `
        <div class="mt-4  bg-dark text-light border border-2 border-light  border-start-0  border-stop-0"">
        <div class="row g-0">
          <div class="col border-end">
            <div class="d-grid gap-2">
              <button class="btn btn-dark btn-sm" type="button">+</button>
              <button class="btn btn-dark btn-sm" type="button">-</button>
            </div>
        </div>
        <div class="container col-8">
          
        </div>
        <button class="col md-1 bg-dark text-light">
          X
        </button>
        </div>
      </div>
        `;
    }

    cargarTablaroducto() {
        obtenerProductos((productos) => {
            let htm = productos.map(this.generarHtmlCajaProducto).join('');

            this.SecProductos.innerHTML = htm;
        });
    }

    generarHtmlTablaProducto(producto){
        return `<tr>
        <td><p class="text-light">${producto.nombre}</td>
        <td><p class="text-light">$${producto.precio}</td>
        <td><p class="text-light">${producto.descripcion}</td>
        <td><input type="button" class="btn btn-danger btn-sm" onclick="Producto.eliminarCajaProducto('${producto._id}');" value="Eliminar"></td>
    </tr>
        `;
    }

    cargarCajaProducto() {
        obtenerProductos((productos) => {
            let ht = productos.map(this.generarHtmlTablaProducto).join('');

            this.productosTabla.innerHTML = ht;
        });
    }








    agregarInput(id){
        mandarInput(id);
    }


    eliminarCajaProducto(id) {
        eliminarProducto(id);

        this.cargarCajaProducto();
    }
};


let Producto = new GestorProductos();