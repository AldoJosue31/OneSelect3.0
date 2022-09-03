var Datastore = require('nedb');
var codigo;
let nombres = document.getElementById('nombres');
let apellidos = document.getElementById('apellidos');


function getCodigo(id){
    codigo;
    codigo = id;
    console.log(codigo);
}


let bd = new Datastore({
    filename: 'db/ordenes.db',
     autoload: true
    });
    
function agregarOrden(fecha, hora, nombres, apellidos, orden, total){
    var pedido = {
        fecha: fecha,
        hora: hora,
        nombres: nombres,
        apellidos: apellidos,
        orden: orden,
        total : total,
    };

    bd.insert(pedido, function(error, nuevoObjeto){

    });
};

function obtenerOrdenes(operacion) {
    bd.find({}, function(err, ordenes){
        if(ordenes){
            operacion(ordenes);
        }
        if (err) {
            console.error(err);
            process.exit(0);
        }
    });
};

function eliminarOrden (id) {
    bd.remove({_id: id},  {}, function(error, numeroRegistrosEliminados){

    });
};

var option = 
{
    animation : true,
    autohide : true,
    delay : 2000
};
let Orden;



var hoy = new Date();
let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

class GestorOrdenes {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');

        this.registros = document.getElementById('registros');


        this.fecha;
        this.hora;

        this.orden;
        this.boton = document.getElementById('reiniciar');
        this.total;


        this.btnCrearRegistro = document.getElementById('btnCrearRegistro'); 

        this.cargarRegistrosOrden();
        this.agregarEventListeners();
    }

    generarNotificacion(){
            var toastHTMLElement = document.getElementById( 'EpicToast' );
            var toastElement = new bootstrap.Toast( toastHTMLElement, option );
            toastElement.show( );
    }
 
    



    agregarEventListeners() {
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroOrden.bind(this));
        this.frmNuevoRegistro.addEventListener('submit', this.generarNotificacion);
        this.frmNuevoRegistro.addEventListener('submit', this.reiniciarForm);
     
    }


    crearRegistroOrden(evento) {
        evento.preventDefault();
        const TC = document.getElementById('TextoTotal').innerHTML;
        const inNombres = document.getElementById('nombres');
        const inApellidos = document.getElementById('apellidos');
        carrito.find({}, function(err, productos){
            Orden = productos;
            agregarOrden(fecha,hora,inNombres.value, inApellidos.value, Orden, TC);
        });
        carrito.remove({}, { multi: true }, function(err, numDeleted) {
            console.log('Deleted', numDeleted, 'user(s)');
       });
       Carrito.cargarCajaCarProducto();

       
        this.nombres.value = '';
        this.apellidos.value = '';


        this.cargarRegistrosOrden();
        Recargar();
        this.generarNotificacion();
  

    }

    generarHtmlRegistroOrden(orden){
        return `<tr>
            <td><p class="text-light">${orden.fecha}</td>
            <td><p class="text-light">${orden.hora}</td>
            <td><p class="text-light">${orden.nombres}</td>
            <td><p class="text-light">${orden.apellidos}</td>
            <td><p class="text-light">${mostrar(orden.orden)}</td>
            <td><p class="text-light">$${orden.total}</td>
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorOrdenes.eliminarRegistroOrden('${orden._id}');" value="Eliminar"></td>
        </tr>
        `;
    }

    cargarRegistrosOrden() {
        obtenerOrdenes((ordenes) => {
            let html = ordenes.map(this.generarHtmlRegistroOrden).join('');

            this.registros.innerHTML = html;
        });
    }

    eliminarRegistroOrden(id) {
        eliminarOrden(id);

        this.cargarRegistrosOrden();
    }
}

function mostrar(params) {
    let htmlc;
    let htb = "| ";
    params.forEach(element => {
            htmlc = `|| ${element.nombre} ||`;
            htb += htmlc; 
    });
    return htb;
}
let gestorOrdenes = new GestorOrdenes();