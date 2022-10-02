var Datastore = require('nedb');
const importesDB = new Datastore({
    filename: 'db/importes.db',
     autoload: true
    });

var hoy = new Date();
let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();



    
function agregarImporte(fecha, hora, nombres, apellidos, orden, total){
    var pedido = {
        fecha: fecha,
        hora: hora,
        nombres: nombres,
        apellidos: apellidos,
        orden: orden,
        total : total,
    };

    importesDB.insert(pedido, function(error, nuevoObjeto){

    });
};

function obtenerOrdenes(operacion) {
    importesDB.find({}, function(err, ordenes){
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
    importesDB.remove({_id: id},  {}, function(error, numeroRegistrosEliminados){

    });
};

var option = 
{
    animation : true,
    autohide : true,
    delay : 2000
};
function generarNotificacionImporte(){
    var toastHTMLElement = document.getElementById( 'EpicToast' );
    var toastElement = new bootstrap.Toast( toastHTMLElement, option );
    toastElement.show( );
}

let Orden;




class GestorImportes {
    constructor() {
        this.frmNuevoImporte = document.getElementById('frmNuevoRegistro');

        this.importes = document.getElementById('registros');


        this.nombres = document.getElementById('nombres');
        this.apellidos = document.getElementById('apellidos');

        this.orden;
        this.total;


        this.btnCrearRegistro = document.getElementById('btnCrearRegistro'); 

        this.cargarRegistrosOrden();
        this.agregarEventListeners();
    }


 
    



    agregarEventListeners() {0
        this.frmNuevoImporte.addEventListener('submit', this.crearRegistroImporte.bind(this));

     
    }


    crearRegistroImporte(evento) {
        evento.preventDefault();
        const TC = document.getElementById('TextoTotal').innerHTML;
        const inNombres = document.getElementById('nombres').value;
        const inApellidos = document.getElementById('apellidos').value;
        agregarOrden(fecha,hora,inNombres, inApellidos, Orden, TC);
       Carrito.cargarCajaCarProducto();

       
       document.getElementById('nombres').value = "";
       document.getElementById('apellidos').value = "";

       generarNotificacionCreada();
        this.cargarRegistrosOrden();
        document.getElementById('TextoTotal').innerHTML = "0";
      
  

    }

    generarHtmlRegistroOrden(orden){
        return `<tr>
            <td><p class="text-light" id="elemento">${orden.fecha}</td>
            <td><p class="text-light" id="elemento">${orden.hora}</td>
            <td><p class="text-light" id="elemento">${orden.nombres}</td>
            <td><p class="text-light" id="elemento">${orden.apellidos}</td>
            <td>${mostrar(orden.orden)}</td>
            <td><p class="text-light" id="elemento">$${orden.total}</td>
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
    let htb = "";
    let i = 0;
    params.forEach(element => {
            i = i + 1;
            htmlc = `<li><div class="dropdown-item"><div class= "container w-25 fw-bold">${element.cantidades}x</div>${element.cantidad} ${element.categoria} de ${element.marca} ${element.mililitros}</div></li>`;
            htb += htmlc; 
    }); 
    return `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${i} Productos
    </button>
    <ul class="dropdown-menu">
   
      ${htb}
    </ul>
  </div>`;
}


let gestorOrdenes = new GestorOrdenes();