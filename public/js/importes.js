var Datastore = require('nedb');


 


document.getElementById('Imp').addEventListener('click', function() {

if(document.getElementById('Imp').checked) {
    document.getElementById('eloalto').disabled = false;
  } 
    });
    document.getElementById('Pres').addEventListener('click', function() {
    if(document.getElementById('Pres').checked) {
        document.getElementById('eloalto').disabled = true;
        document.getElementById('eloalto').value = "";
      } 
        });




const importesDB = new Datastore({
    filename: 'db/importes.db',
     autoload: true
    });

var hoy = new Date();
let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();



    
function agregarImporte(nombre, apellido, importes, tipo, total){
    var importe = {
        fecha: getDateTime(0),
        hora: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
        ap: localStorage.getItem("EA"),
        nombre: nombre,
        apellido: apellido,
        importes: importes,
        tipo : tipo,
        total : total
    };

    importesDB.insert(importe, function(error, nuevoObjeto){

    });
};

function obtenerImportes(operacion) {
    importesDB.find({}, function(err, importes){
        if(importes){
            operacion(importes);
        }
        if (err) {
            console.error(err);
            process.exit(0);
        }
    });
};

function eliminarImporte (id) {
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






class GestorImportes {
    constructor() {
        this.frmNuevoImporte = document.getElementById('frmNuevoImporte');

        this.Tblimportes = document.getElementById('importes');


        this.nombre = document.getElementById('imp_nombre');
        this.apellido = document.getElementById('imp_apellido');
        this.miCheckbox = document.getElementById('Imp');
        this.cantidad = document.getElementById('imp_cantidad');
        this.imp_marca = document.getElementById('imp_marca').options[document.getElementById('imp_marca').selectedIndex].text;
        this.imp_categoria = document.getElementById('imp_categoria').options[document.getElementById('imp_categoria').selectedIndex].text;
        this.canImp = document.getElementById('eloalto');
        this.ifImp;
        this.importes;

        this.orden;
        this.total;


        this.btnCrearRegistro = document.getElementById('btnCrearRegistro'); 


        this.cargarImportes();
        this.agregarEventListeners();
    }


 
    



    agregarEventListeners() {0
        this.frmNuevoImporte.addEventListener('submit', this.crearRegistroImporte.bind(this));

     
    }


    crearRegistroImporte(evento) {
        evento.preventDefault();

        this.importes = `${this.cantidad.value}x ${document.getElementById('imp_marca').options[document.getElementById('imp_marca').selectedIndex].text} ${document.getElementById('imp_categoria').options[document.getElementById('imp_categoria').selectedIndex].text}`;
        if(this.miCheckbox.checked) {
           
            this.ifImp = "Importe"
          } else {
           this.ifImp = "Prestamo"
           this.canImp.value = "00";
          }
          agregarImporte(this.nombre.value, this.apellido.value, this.importes, this.ifImp,this.canImp.value);


       
       this.nombre.value = "";
       this.apellido.value = "";
       this.cantidad.value = "";
       this.canImp.value = "";
       document.getElementById('imp_marca').options[document.getElementById('imp_marca').selectedIndex = 0];
       document.getElementById('imp_categoria').options[document.getElementById('imp_categoria').selectedIndex = 0];


 
        this.cargarImportes();
       
      
  

    }

    generarHtmlImporte(orden){
        return `<tr>
            <td><p class="text-light" id="elemento">${orden.fecha}</td>
            <td><p class="text-light" id="elemento">${orden.hora}</td>
            <td><p class="text-light" id="elemento">${orden.ap}</td>
            <td><p class="text-light" id="elemento">${orden.nombre}</td>
            <td><p class="text-light" id="elemento">${orden.apellido}</td>
            <td><p class="text-light" id="elemento">${orden.importes}</td>
            <td><p class="text-light" id="elemento">${orden.tipo}</td>
            <td><p class="text-light" id="elemento">$${orden.total}</td>
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorImportes.eliminarImportes('${orden._id}');" value="Eliminar"></td>
        </tr>
        `;
    }

    cargarImportes() {
        console.log("cd");
        obtenerImportes((importes) => {
            let html = importes.map(this.generarHtmlImporte).join('');

            this.Tblimportes.innerHTML = html;
        });
    }

    eliminarImportes(id) {
        eliminarImporte(id);

        this.cargarImportes();
    }
}




let gestorImportes = new GestorImportes();
