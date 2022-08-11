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
        <div class="col border border-light p-3">
        <div class="card bg-dark text-light">
          <div class="card-body">
            <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
            <h7>$${producto.precio}</h7>
            <br>
            <br>
            <a class="btn btn-primary"onclick="Carrito.crearCajaProducto('${producto._id}')">Agregar</a>
          </div>
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





    eliminarCajaProducto(id) {
        eliminarProducto(id);

        this.cargarCajaProducto();
    }
};


let Producto = new GestorProductos();