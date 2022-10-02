var Datastore = require('nedb');
var codigo
let nombres = document.getElementById('nombres');
let apellidos = document.getElementById('apellidos');
 function getDateTime(global) {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();

    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   

    if(global == 1){
        var dateTime = year+'-'+month+'-'+day;   
     return dateTime;
    }else{
        var dateTime = day+'-'+month+'-'+year;   
     return dateTime;
    }

}

function getCodigo(id){
    codigo;
    codigo = id;
    console.log(codigo);
}

const bd = new Datastore({
    filename: 'db/ordenes.db',
     autoload: true
    });
    
function agregarOrden(nombres, apellidos, orden, total){
    var pedido = {
        fecha: getDateTime(0),
        hora: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
        ap: localStorage.getItem("EA"),
        nombres: nombres,
        apellidos: apellidos,
        orden: orden,
        total : total,
    };

    bd.insert(pedido, function(error, nuevoObjeto){

    });
};
function obtenerOrdenesFecha(operacion) {
    console.log(obtFecha())
    bd.find({fecha: obtFecha()}).sort({fecha:-1}).exec(function(err, ordenes) {
        console.log(ordenes)
        if(ordenes){
            operacion(ordenes);
            
        }
        
        if (err) {
            console.error(err);
            process.exit(0);
        }
        
    });
};

function obtenerOrdenesHora(operacion) {
    bd.find({fecha: obtFecha()}).sort({hora:-1}).exec(function(err, ordenes) {
        if(ordenes){
            operacion(ordenes);
        }
        if (err) {
            console.error(err);
            process.exit(0);
        }
    });
};
function obtenerOrdenesNombre(operacion) {
    bd.find({fecha: obtFecha()}).sort({nombres:1}).exec(function(err, ordenes) {
        if(ordenes){
            operacion(ordenes);
        }
        if (err) {
            console.error(err);
            process.exit(0);
        }
    });
};
function obtenerOrdenesApellidos(operacion) {
    bd.find({fecha: obtFecha()}).sort({apellidos: 1}).exec(function(err, ordenes) {
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
function generarNotificacionCreada(){
    var toastHTMLElement = document.getElementById( 'EpicToast' );
    var toastElement = new bootstrap.Toast( toastHTMLElement, option );
    toastElement.show( );
}
function generarNotificacionVacio(){
var toastHTMLElemento = document.getElementById( 'Err' );
var toastElemento = new bootstrap.Toast( toastHTMLElemento, option );
toastElemento.show( );
}
let Orden;








class GestorOrdenes {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');

        this.registros = document.getElementById('registros');
        this.notFound = document.getElementById('TITULO');

        this.frm = document.getElementById('organizacion');


        this.fecha;
        this.hora;

        this.orden;
        this.boton = document.getElementById('reiniciar');
        this.total;


        this.btnCrearRegistro = document.getElementById('btnCrearRegistro'); 

        this.agregarEventListeners();
        this.detectarOrg()
    }

    detectarOrg() {
        console.log(document.getElementById('organizacion').options[document.getElementById('organizacion').selectedIndex].text)
        switch (document.getElementById('organizacion').options[document.getElementById('organizacion').selectedIndex].text) {
            case "Fecha":
                obtenerOrdenesFecha((ordenes) => {
                    let html = ordenes.map(this.generarHtmlRegistroOrden).join('');
                    
                    if (ordenes.length > 0) {
                        this.registros.innerHTML = html;
                    } else {
                        console.log("No hay nada we")
                        this.registros.innerHTML = html;
                        this.notFound.innerHTML = "<br>No se encontraron registros"
                    }
                 
                });
                break;
            case "Hora":
                obtenerOrdenesHora((ordenes) => {
                    let html = ordenes.map(this.generarHtmlRegistroOrden).join('');
            
                    this.registros.innerHTML = html;
                });
                break;
            case "Nombre":
                obtenerOrdenesNombre((ordenes) => {
                     let html = ordenes.map(this.generarHtmlRegistroOrden).join('');
                
                     this.registros.innerHTML = html;
                 });
                break;
            case "Apellido":
               obtenerOrdenesApellidos((ordenes) => {
                      let html = ordenes.map(this.generarHtmlRegistroOrden).join('');
                    
                      this.registros.innerHTML = html;
                  });
                break;           
        
            default:
                break;
        }
    }
 
    



    agregarEventListeners() {
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroOrden.bind(this));
     


     
    }


    crearRegistroOrden(evento) {
        evento.preventDefault();
        const TC = document.getElementById('TextoTotal').innerHTML;
        const inNombres = document.getElementById('nombres').value;
        const inApellidos = document.getElementById('apellidos').value;
        console.log(document.getElementById('apellidos').value)
        carrito.find({}, function(err, productos){
            Orden = productos;
            if(Orden.length === 0){
                generarNotificacionVacio();
            }else{
                   if (nombres.value == "" || apellidos.value == "") {
                    document.getElementById('nombres').value == "???"
                    document.getElementById('apellidos').value == "???";
               }
                agregarOrden(inNombres, inApellidos, Orden, RG);
                eliminarAllCarProductos();
               Carrito.cargarCajaCarProducto();
        
            
               document.getElementById('nombres').value = "";
               document.getElementById('apellidos').value = "";
        
               generarNotificacionCreada();
               this.detectarOrg();
                
            }
          
        });
        document.getElementById('TextoTotal').innerHTML = "0";
      
  

    }

    generarHtmlRegistroOrden(orden){
        return `<tr>
            <td><p class="text-light" id="elemento">${orden.fecha}</td>
            <td><p class="text-light" id="elemento">${orden.hora}</td>
            <td><p class="text-light" id="elemento">${orden.ap}</td>
            <td><p class="text-light" id="elemento">${orden.nombres}</td>
            <td><p class="text-light" id="elemento">${orden.apellidos}</td>
            <td>${mostrar(orden.orden)}</td>
            <td><p class="text-light" id="elemento">$${orden.total}</td>
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorOrdenes.eliminarRegistroOrden('${orden._id}');" value="Eliminar"></td>
        </tr>
        `;
    }



    eliminarRegistroOrden(id) {
        eliminarOrden(id);

        this.detectarOrg();
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

let EncargadoHTML = document.getElementById('servidor');
EncargadoHTML.innerHTML = localStorage.getItem("EA");
function cambiarDeUsuario() {
    if (localStorage.getItem("EA") == "Aldo") {
        localStorage.setItem("EA", "Consuelo")
        EncargadoHTML.innerHTML = localStorage.getItem("EA");
    } else{
        localStorage.setItem("EA", "Aldo")
        EncargadoHTML.innerHTML = localStorage.getItem("EA");
    }
}
let Encargados = ["Aldo","Consuelo"]



let gestorOrdenes = new GestorOrdenes();
document.getElementById('start').value = getDateTime(1);
function obtFecha() {
    let fechaHOY = document.getElementById('start').value ;
    if (fechaHOY == "") {
        fechaHOY = getDateTime(1);
    }
    let fechahora = fechaHOY.substr(5,6);
    let año,mes,dia;
    año = fechaHOY.substr(0,4);
    mes = fechahora.substr(0,2);
    dia = fechahora.substr(3,4);
    return dia+'-'+mes+'-'+año
    console.log(fechaHOY)
   

}
