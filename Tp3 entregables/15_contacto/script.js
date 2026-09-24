var miFormulario = document.getElementById("formulario-contacto");

miFormulario.addEventListener("submit", function(evento) {
  evento.preventDefault();
  document.getElementById("seccion-contacto").classList.add("oculto");
  document.getElementById("seccion-gracias").classList.remove("oculto");

  actualizarContador();
  setInterval(actualizarContador, 1000);

});


function actualizarContador() {
  var fechaInicio = new Date("2023-07-01T00:00:00");
  var fechaAhora = new Date();
  var diferencia = fechaAhora - fechaInicio;

  var segundos = Math.floor(diferencia / 1000);
  var minutos = Math.floor(segundos / 60);
  var horas = Math.floor(minutos / 60);
  var dias = Math.floor(horas / 24);

  horas = horas % 24;
  minutos = minutos % 60;
  segundos = segundos % 60;

  document.getElementById("contador").innerHTML = dias + " días, " + horas + " horas, " + minutos + " minutos y " + segundos + " segundos";
}


var botonVolver = document.getElementById("btn-volver");

botonVolver.addEventListener("click", function() {
  window.location.href = "index.html";
});

