// Variables que guardan el estado de la calculadora
let numeroActual = '0';
let numeroAnterior = '';
let operador = null;

// Referencias a los elementos de la pantalla
const pantallaActual = document.getElementById('pantallaActual');
const operacionAnterior = document.getElementById('operacionAnterior');

// Actualiza lo que se muestra en pantalla
function actualizarPantalla() {
  pantallaActual.innerText = numeroActual;

  if (operador != null) {
    operacionAnterior.innerText = `${numeroAnterior} ${simboloOperador(operador)}`;
  } else {
    operacionAnterior.innerText = '';
  }
}

// Convierte el operador interno al símbolo visual
function simboloOperador(op) {
  switch (op) {
    case '+': return '+';
    case '-': return '-';
    case '*': return '×';
    case '/': return '÷';
    case '%': return '%';
    default: return '';
  }
}

// Agrega un número o el punto decimal
function agregarNumero(numero) {
  if (numero === '.' && numeroActual.includes('.')) return;

  if (numeroActual === '0' && numero !== '.') {
    numeroActual = numero;
  } else {
    numeroActual += numero;
  }

  actualizarPantalla();
}

// Guarda el operador elegido y prepara el siguiente número
function agregarOperador(op) {
  if (numeroActual === '' && numeroAnterior === '') return;

  // Si ya había una operación pendiente, la resolvemos primero (encadenar operaciones)
  if (operador !== null && numeroActual !== '') {
    calcularResultado();
  }

  operador = op;
  numeroAnterior = numeroActual;
  numeroActual = '0';

  actualizarPantalla();
}

// Realiza el cálculo según el operador guardado
function calcularResultado() {
  let resultado;
  const anterior = parseFloat(numeroAnterior);
  const actual = parseFloat(numeroActual);

  if (isNaN(anterior) || isNaN(actual) || operador === null) return;

  switch (operador) {
    case '+':
      resultado = anterior + actual;
      break;
    case '-':
      resultado = anterior - actual;
      break;
    case '*':
      resultado = anterior * actual;
      break;
    case '/':
      resultado = actual === 0 ? 'Error' : anterior / actual;
      break;
    case '%':
      resultado = anterior % actual;
      break;
    default:
      return;
  }

  numeroActual = resultado.toString();
  operador = null;
  numeroAnterior = '';

  actualizarPantalla();
}

// Cambia el signo del número actual (positivo/negativo)
function cambiarSigno() {
  if (numeroActual === '0') return;
  numeroActual = (parseFloat(numeroActual) * -1).toString();
  actualizarPantalla();
}

// Borra todo (CE)
function borrarTodo() {
  numeroActual = '0';
  numeroAnterior = '';
  operador = null;
  actualizarPantalla();
}

// Borra el último caracter ingresado (C)
function borrarUltimo() {
  if (numeroActual.length === 1) {
    numeroActual = '0';
  } else {
    numeroActual = numeroActual.slice(0, -1);
  }
  actualizarPantalla();
}

// Cambia el tema visual de la calculadora (mate / neon)
function cambiarTema(nombreTema) {
  if (nombreTema === 'neon') {
    document.body.classList.add('tema-neon');
  } else {
    document.body.classList.remove('tema-neon');
  }

  // Guarda la preferencia para que se mantenga al recargar la página
  localStorage.setItem('temaCalculadora', nombreTema);
}

// Carga el tema guardado (si existe) al abrir la página
function cargarTemaGuardado() {
  const temaGuardado = localStorage.getItem('temaCalculadora') || 'mate';
  document.getElementById('tema').value = temaGuardado;
  cambiarTema(temaGuardado);
}

// Inicializa la pantalla y el tema al cargar la página
actualizarPantalla();
cargarTemaGuardado();
