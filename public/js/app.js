var Datastore = require('nedb');
var codigo;
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

var inputOrden = document.getElementById('orden');

var total = document.getElementById('total');

var hoy = new Date();

class GestorOrdenes {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');

        this.registros = document.getElementById('registros');


        this.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        this.hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        this.nombres = document.getElementById('nombres');
        this.apellidos = document.getElementById('apellidos');
        this.orden = document.getElementById('orden');
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

        agregarOrden(this.fecha,this.hora,this.nombres.value, this.apellidos.value, this.orden.value, totalnumero);

        this.nombres.value = '';
        this.apellidos.value = '';
        this.orden.value = '';
        totalnumero = '';

        this.cargarRegistrosOrden();
        Recargar();
        generarNotificacion();

    }

    generarHtmlRegistroOrden(orden){
        return `<tr>
            <td><p class="text-light">${orden.fecha}</td>
            <td><p class="text-light">${orden.hora}</td>
            <td><p class="text-light">${orden.nombres}</td>
            <td><p class="text-light">${orden.apellidos}</td>
            <td><p class="text-light">${orden.orden}</td>
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


let gestorOrdenes = new GestorOrdenes();