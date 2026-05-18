
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const tamanoCelda = 25;
const serpiente = [
  { x: 10, y: 11 },
  { x: 11, y: 11 },
  { x: 12, y: 11 },
  { x: 12, y: 12 },
];





// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  for (let i = 0; i < canvas.width; i += tamanoCelda) {
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += tamanoCelda) {
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}
function pintarParte(lineaX, lineaY, color) {
  let valorx = lineaX * tamanoCelda;
  let valory = lineaY * tamanoCelda;
  ctx.fillStyle = color;
  ctx.fillRect(valorx, valory, tamanoCelda, tamanoCelda);

  ctx.strokeStyle = color;
  ctx.strokeRect(valorx, valory, tamanoCelda, tamanoCelda)
}

function pintarSerpiente() {
  for (let indice = 0; indice < serpiente.length; indice++) {
    let parte = serpiente[indice];
    if (parte.x == 12 && parte.y == 12) {
      pintarParte(parte.x, parte.y, "yellow");
    } else {
      pintarParte(parte.x, parte.y, "red");
    }
  }
}


function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();

}






