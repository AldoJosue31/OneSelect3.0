var Datastore = require('nedb');
let resultado = 0;
let arreglo = [];
let RG;

obtenerProductos((productos) => {
    productos.map(function(num) {;
    arreglo.push(num)
    })
});

function restarProducto(id){
     Carrito.cargarCajaCarProducto();
     carrito.findOne({_id: id}, function(err, record) {
        if (record.cantidades  <= 1) {
            Carrito.eliminarCajaCarProducto(id) 
        }
    });
    carrito.update({_id: id}, {$inc: {cantidades: -1}}, {}, function(err, num) {
    });
     Carrito.generarTotal();
     Carrito.cargarCajaCarProducto();
}
function sumarProducto(id){
    Carrito.cargarCajaCarProducto();
        carrito.update({_id: id}, {$inc: {cantidades: +1}}, {}, function(err, num) {
        });
    Carrito.generarTotal();
    Carrito.cargarCajaCarProducto();
   
}


const carrito = new Datastore({
    filename: 'db/carrito.db',
     autoload: true
    });


    function obtenerCarProductos(operacion) {
        carrito.find({}).sort({marca:1}).exec(function(err, productos) {
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
    function eliminarAllCarProductos() {
        carrito.remove({}, { multi: true }, function(err, numDeleted) {
            console.log('Deleted', numDeleted, 'user(s)');
       });
    }

 
    function EncontrarProducto(iden) {
        dba.findOne({ _id: iden }, function (err, doc) {
            agregarCarProducto(doc.nombre,doc.precio,doc.descripcion);
          })
    }
   function crearCajaCarProducto(iden) {
    let arreglo2 =  arreglo.filter(element => element._id == iden);
          carrito.insert(arreglo2, function(error, nuevoObjeto){
            if (error) {
                console.error(error);
            }else{
                Carrito.cargarCajaCarProducto();
                Carrito.generarTotal();
                console.log(document.getElementById(`"${nuevoObjeto[0]._id}"`).classList)
                document.getElementById(`"${nuevoObjeto[0]._id}"`).classList.remove('eliminacionAnimada')
                setTimeout(() => document.getElementById(`"${nuevoObjeto[0]._id}"`).classList.add('eliminacionAnimada'), 1)
            }
        });
         
        
    }

class GestorCarrito {
    constructor() {

        this.CajaCarrito = document.getElementById('cajaCarrito');

        this.txtTotal = document.getElementById('TextoTotal');
        this.BtnBT = document.getElementById('BT');
        this.bg = document.getElementById('cajaCarrito');


        this.cargarCajaCarProducto();
        this.generarTotal();
        this.agregarEventListener() 
    }

    agregarEventListener() {
        this.BtnBT.addEventListener('click', this.EliProCar.bind(this));
     
    }

    EliProCar(event){
        event.preventDefault();
        carrito.remove({}, { multi: true }, function(err, numDeleted) {
            console.log('Deleted', numDeleted, 'user(s)');
       });
        this.cargarCajaCarProducto();
        document.getElementById('TextoTotal').innerHTML = "0";
            this.bg.classList.remove('cajaAnimada')
            setTimeout(() => this.bg.classList.add('cajaAnimada'), 1)
 
        
    }

    generarTotal() {
        obtenerCarProductos((elemento) => {
            elemento.forEach(element => {
                resultado = resultado + (Number(element.precio) * element.cantidades);
            });
            document.getElementById('TextoTotal').innerHTML = resultado;
            RG = resultado;
            resultado = 0;
        });
    }

    agregarDoc(nombre, precio, descripcion){
        agregarCarProducto(nombre,precio,descripcion);
    }

    generarHtmlCajaCarProducto(carProducto){
        return `<div id="${carProducto._id}">
    <div class="container text-light border border-2 border-light  border-start-0  border-stop-0 mt-4" >
  <div class="row">
    <div class="col-2 ">
  <div class="row row-cols-1 h-100">
  <input type="button" class="btn btn-success btn-sm col text-light" value="+" onClick="sumarProducto('${carProducto._id}')">
       <input type="button" class="col btn btn-dark btn-sm col bg-dark text-light" value="${carProducto.cantidades}x">
    <input type="button" class="col btn btn-danger btn-sm col  text-light" value="-" onClick="restarProducto('${carProducto._id}')">
  </div>
    </div>
    <div class="col border-start border-end" style="${carProducto.color}">
    <h5>${carProducto.cantidad}<br> ${carProducto.marca} ${carProducto.mililitros} ml</h5>
        <h4>$${carProducto.precio}</h4>
    </div>
    <div class="col-2">
    <div class="row row-cols-1 h-100">
    <input type="button" class="col btn btn-dark btn-sm col bg-danger text-light" value="X" onclick="Carrito.eliminarCajaCarProducto('${carProducto._id}');">
  </div>
  </div>
  </div>
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