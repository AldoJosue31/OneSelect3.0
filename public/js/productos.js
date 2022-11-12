var Datastore = require('nedb');
let inputMili = document.getElementById('descripcion');
let cod;


let dba = new Datastore({
    filename: 'db/productos.db',
     autoload: true
    });



    function agregarProducto(cantidad,categoria,marca,mililitros,precioAgencia,precioCliente, color){
        var producto = {
            cantidad: cantidad,
            categoria: categoria,
            marca: marca,
            mililitros: mililitros,
            precioAgencia: precioAgencia,
            precioCliente: precioCliente,
            color: color,
            cantidades: 1
        };
    
        dba.insert(producto, function(error, nuevoObjeto){
    
        });
    };
    function editarProducto(id,precioAgenciaNew,precioClienteNew){
        dba.update({_id: id}, {$set: {precioAgencia: precioAgenciaNew,precioCliente:precioClienteNew}}, {}, function(err, num) {

        });
    }
    function obtenerProductos(operacion) {
        dba.find({}).sort({marca:1}).exec(function(err, productos) {
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
        this.codigo;

        this.frmNuevoProducto = document.getElementById('frmNuevoProducto');
        this.frmEditarProducto = document.getElementById('frmEditarProducto');

        this.SecProductos = document.getElementById('SecProductos');
        this.productosTabla = document.getElementById('productosTabla');



        this.precio = document.getElementById('precio');
        this.precioAgencia = document.getElementById('precioAgencia');
        this.precioCliente = document.getElementById('precioCliente');
        this.mililitros = document.getElementById('descripcion');

        this.precioClienteNew = document.getElementById('precioClienteNew');
        this.precioAgenciaNew = document.getElementById('precioAgenciaNew');


        this.btnCrearProducto = document.getElementById('btnCrearProducto'); 
        this.btnEditarProducto = document.getElementById('btnEditarProducto');

        this.cargarCajaProducto();
        this.cargarTablaroducto();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.frmNuevoProducto.addEventListener('submit', this.crearCajaProducto.bind(this));
        
    }
    

    crearCajaProducto(event) {
        event.preventDefault();
        let color;
        let marca = document.getElementById('marca').options[document.getElementById('marca').selectedIndex].text;
        let categoria = document.getElementById('select1').options[document.getElementById('select1').selectedIndex].text;
        let cantidad = document.getElementById('cantidad').options[document.getElementById('cantidad').selectedIndex].text;
        switch (marca) {
            case "Modelo especial":
                color = `background: rgb(224,198,0);
                background: linear-gradient(90deg, rgba(224,198,0,1) 0%, rgba(203,179,0,1) 50%, rgba(224,198,0,1) 100%);`
                break;
            case "Modelo negra":
                color = `background: rgb(31,31,31);
                background: linear-gradient(90deg, rgba(31,31,31,1) 0%, rgba(0,0,0,1) 50%, rgba(31,31,31,1) 100%);`
                break;
            case "Modelo malta":
                color = `background: rgb(126,93,62);
                background: linear-gradient(90deg, rgba(126,93,62,1) 0%, rgba(146,106,70,1) 50%, rgba(126,93,62,1) 100%);`
                 break;
            case "Corona extra":
                 color = `background: rgb(53,66,91);
                 background: linear-gradient(90deg, rgba(53,66,91,1) 0%, rgba(13,59,144,1) 50%, rgba(53,66,91,1) 100%);`
                 break;
            case "Corona cero":
                 color = `background: rgb(73,73,0);
                 background: linear-gradient(90deg, rgba(73,73,0,1) 0%, rgba(16,16,0,1) 0%, rgba(73,73,0,1) 100%);`
                 break;
            case "Corona agua rifada":
                 color = ``
                 break;
            case "Corona light":
                 color = ``
                 break;
            case "Victoria":
                 color = `background: rgb(219,56,25);
                 background: radial-gradient(circle, rgba(219,56,25,1) 50%, rgba(125,23,23,1) 100%);`
                 break;
            case "Victoria chelada":
                 color = ``
                 break;
            case "Victoria mango":
                 color = ``
                 break;
            case "Victoria chamoy":
                 color = ``
                 break;
            case "Victoria cempasúchil":
                 color = ``
                 break;
            case "Bud light":
                 color = ``
                 break;
            case "Pacifico suave":
                 color = ``
                 break;
            case "Pacifico clara":
                 color = ``
                break;
            case "Ultra":
                 color = ``
                 break;
            case "Ultra sabor":
                color = ``
                break;
            case "Barrilito":
                color = ``
                break;
            default:
                break;
        }
        agregarProducto(cantidad,categoria,marca,this.mililitros.value, this.precioAgencia.value,this.precioCliente.value,color);

        this.precioAgencia.value = '';
        this.precioCliente.value = '';
        this.mililitros.value = '';
        document.getElementById('select1').options[document.getElementById('select1').selectedIndex = 0];
        document.getElementById('cantidad').options[document.getElementById('cantidad').selectedIndex = 0];
        document.getElementById('marca').options[document.getElementById('marca').selectedIndex = 0];

       

        this.cargarCajaProducto();
        this.cargarTablaroducto();


    }
    generarHtmlCajaProducto(producto){
        return `
        <div
         class="col border border-light p-3" 
         draggable="true"
         ondragstart="onDragStart(event);"
         id="${producto._id}"
       >
        <div class="card bg-dark text-light" style="${producto.color}">
          <div class="card-body">
          <h5 class="card-title font-weight-bold">${producto.cantidad}  ${producto.categoria}</h5>
            <br>
            <h5 class="card-title font-weight-bold">${producto.marca}</h5>
            <h7>$${producto.precioCliente}</h7>
            <br>
            <br>
            <a class="btn btn-primary"onclick="crearCajaCarProducto('${producto._id}')">Agregar</a>
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
        return `<tr style="background-color: ${producto.color}">
        <td><p class="text-light">${producto.cantidad}</td>
        <td><p class="text-light">${producto.categoria}</td>
        <td><p class="text-light">${producto.marca}</td>
        <td><p class="text-light">${producto.mililitros} ml</td>
        <td><p class="text-light">$${producto.precioAgencia}</td>
        <td><p class="text-light">$${producto.precioCliente}</td>
        <td>
        <input type="button" class="btn btn-secondary btn-sm" onclick="Producto.seleccionarProducto('${producto._id}');" data-bs-toggle="modal" data-bs-target="#editarModal"  value="Editar">
         <input type="button" class="btn btn-danger btn-sm" onclick="Producto.eliminarCajaProducto('${producto._id}');" value="Eliminar">
        
        </td>
    </tr>
        `;
    }

    cargarCajaProducto() {
        obtenerProductos((productos) => {
            let ht = productos.map(this.generarHtmlTablaProducto).join('');

            this.productosTabla.innerHTML = ht;
        });
    }

    seleccionarProducto(id){
        console.log(id)
        cod = id;
        console.log(cod)
    }

    editarTablaProducto(){
       
        editarProducto(cod,this.precioAgenciaNew.value,this.precioClienteNew.value)
        this.precioAgenciaNew.value == "";
        this.precioClienteNew.value == "";
    }


    eliminarCajaProducto(id) {
        eliminarProducto(id);

        this.cargarCajaProducto();
    }
};

function detectar(){
    switch (document.getElementById('select1').options[document.getElementById('select1').selectedIndex].text) {
        case "Lata chica":
            inputMili.value = "330";
            break;
        case "Lata":
            inputMili.value = "355";
            break;
        case "Laton":
             inputMili.value = "473";
             break;
        case "Mega laton":
             inputMili.value = "750";
             break;
        case "Cuarto":
             inputMili.value = "210";
            break;
        case "Media":
             inputMili.value = "355";
             break;
        case "Familiar":
             inputMili.value = "940";
             break;
        case "Familiar":
             inputMili.value = "940";
             break;
         case "Mega":
             inputMili.value = "1200";
             break;
        default:
            break;
    }

}

let Producto = new GestorProductos();