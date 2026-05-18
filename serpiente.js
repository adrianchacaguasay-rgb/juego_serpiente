// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

let intervaloSerpiente;
let direccionActual = "derecha";
let puntaje = 0;
let velocidad = 600;
let tiempo = 0;
let intervaloTiempo;

const TAMANIO_CELDA = 25;

const serpiente = [
  { x: 8, y: 7 },
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 }
];

let comida = {
  comidaX: 10,
  comidaY: 10
};

// Inicio del juego
generarComida();
dibujarTodo();
iniciarJuego();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}

function dibujarTablero() {
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.strokeStyle = "#050069";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.strokeStyle = "#050069";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  let valorX = lineaX * TAMANIO_CELDA;
  let valorY = lineaY * TAMANIO_CELDA;

  ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let indice = 0; indice < serpiente.length; indice++) {
    let parte = serpiente[indice];

    if (indice == 0) {
      ctx.fillStyle = "#000000";
    } else {
      ctx.fillStyle = "#d108a6";
    }

    pintarParte(parte.x, parte.y);
  }
}

function pintarComida() {
  ctx.fillStyle = "#44ff00";
  pintarParte(comida.comidaX, comida.comidaY);
}

// =========================
// MOVIMIENTO
// =========================

function moverDerecha() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x + 1,
    y: cabeza.y
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x - 1,
    y: cabeza.y
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabeza = serpiente[0];

  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function cambiarDireccion(nuevaDireccion) {
  direccionActual = nuevaDireccion;
}

// =========================
// CONTROL DEL JUEGO
// =========================

function iniciarJuego() {
   clearInterval(intervaloSerpiente);
  intervaloSerpiente = setInterval(moverSerpiente,velocidad);
  iniciarTiempo();
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  clearInterval(intervaloTiempo);
}

function moverSerpiente() {
  let ultimaParte = serpiente[serpiente.length - 1];

  if (direccionActual == "derecha") {
    moverDerecha();
  }

  if (direccionActual == "izquierda") {
    moverIzquierda();
  }

  if (direccionActual == "abajo") {
    moverAbajo();
  }

  if (direccionActual == "arriba") {
    moverArriba();
  }

  if (verificarGameOver()) {
    pausarJuego();
    alert("GAME OVER");
    return;
  }

  if (atraparComida()) {
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje;
    serpiente.push(ultimaParte);
    generarComida();
  }

  dibujarTodo();
}

// =========================
// COMIDA
// =========================

function generarComida() {
  let totalColumnas = canvas.width / TAMANIO_CELDA;
  let totalFilas = canvas.height / TAMANIO_CELDA;
  comida.comidaX = Math.floor(Math.random() * totalColumnas);
  comida.comidaY = Math.floor(Math.random() * totalFilas);
}

function atraparComida() {
  let cabeza = serpiente[0];

  if (
    cabeza.x == comida.comidaX &&
    cabeza.y == comida.comidaY
  ) {
    return true;
  }

  return false;
}

// GAME OVER

function verificarGameOver() {
  let cabeza = serpiente[0];

  let totalColumnas = canvas.width / TAMANIO_CELDA;
  let totalFilas = canvas.height / TAMANIO_CELDA;

  if (cabeza.x < 0) {
    return true;
  }

  if (cabeza.x >= totalColumnas) {
    return true;
  }

  if (cabeza.y < 0) {
    return true;
  }

  if (cabeza.y >= totalFilas) {
    return true;
  }
  return false;
}

function reiniciarJuego() {
  pausarJuego();
  serpiente.length = 0;
  serpiente.push(
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 }
  );
  direccionActual = "derecha";
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  generarComida();
  dibujarTodo();
  iniciarJuego();
}

function iniciarTiempo() {
  clearInterval(intervaloTiempo);
  intervaloTiempo = setInterval(function () {
    tiempo++;
    document.getElementById("tiempo").innerText = tiempo;
  }, 1000);
}