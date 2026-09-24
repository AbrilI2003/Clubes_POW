var cuenta="";

function agregarOperador(op) {
    cuenta+=op;

    document.getElementById("pantalla").value= cuenta;
}

function agregarNumero(num){
    cuenta+=num;

    document.getElementById("pantalla").value= cuenta;
}

function limpiar(){
    cuenta="";

    document.getElementById("pantalla").value=cuenta;
}

function borrar(){
    cuenta= cuenta.slice(0, -1);

    document.getElementById("pantalla").value= cuenta;
}

function calcular(){
    var resultado= eval(cuenta);

    if(!isFinite(resultado)){
        resultado="Error";
        cuenta="";
    }

    else{
        cuenta= resultado.toString();
    }

    document.getElementById("pantalla").value= resultado;
}