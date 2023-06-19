'use strict';

// Constante y variables
const TICKET = 200.00;
let cant;
let categoria;
let descuento;
let totalVenta;

// Obtencion de los datos ingresados por el usuario
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const select = document.querySelector("#formulario select");

function capturaDatos(){
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const mail = document.querySelector("#mail").value;
}

function capturaCompra(){
    cant=document.querySelector("#cantidadTickets").value;
    categoria=document.querySelector("#categoriaSelect").value;
}

// Validaciones
const expresiones = {
    nombre: /^[a-zA-zÀ-ÿ\s]{3,40}$/,
    apellido:/^[a-zA-zÀ-ÿ\s]{3,40}$/,
    mail:/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]+$/, 
    cant: /^\d{1,12}$/,
    categoria: /^\d{0,3}$/
}

const campos = {
    nombre: false,
    apellido: false,
    mail: false
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "mail":
			validarCampo(expresiones.mail, e.target, 'mail');
		break;
		
		
	}
}

inputs.forEach((input)=>{
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  })

// Calculo descuento

function promo() {
    switch (categoria){
        
        case "1":
            descuento=(TICKET*80/100);
            break
        case "2":
            descuento=(TICKET*50/100);
            break
        case "3":
            descuento=(TICKET*15/100);
            break
        default:
            descuento=(TICKET*0/100);
            
    }    
}

// Borrar todo

const borrar=document.getElementById("btnBorrar");

borrar.addEventListener("click", () =>{
    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
        icono.classList.remove('formulario__grupo-correcto');
    })
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    document.getElementById('formulario__boton-exito').classList.remove('formulario__boton-exito-activo');
    document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');

    totalPagar.textContent="";
    nombre.value="";
    apellido.value="";
    mail.value="";
    cantidadTickets.value="";
    categoriaSelect.value=""; 
})

// Total a pagar

//mostrar total a Pagar luego de hacer click en Resumen:

const totalPagar = document.querySelector("#totalPago");
const resumen =document.querySelector("#btnResumen");




function calcularTotal() {
        capturaCompra();
        promo();
        totalVenta=parseInt(cant)*(TICKET-descuento);
        return totalVenta;
            
}

function mostrarTotal() {
    totalPagar.textContent = calcularTotal();
  }



resumen.addEventListener("click", (e)=>{
    
    e.preventDefault();
    calcularTotal();
    mostrarTotal();

    if(campos.nombre && campos.apellido && campos.mail && !isNaN(totalVenta)) {
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		//setTimeout(() => {
		//document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        //}, 5000);
        document.getElementById('formulario__boton-exito').classList.add('formulario__boton-exito-activo');
        
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
        });

        } else {
             
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        totalPagar.textContent = "0";        
		};
	   
});

const confirmacion = document.querySelector('#confirmacion button.btn.btn-secondary');
confirmacion.addEventListener("click", ()=>{
    document.getElementById('formulario__boton-exito').classList.remove('formulario__boton-exito-activo');
    document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
});