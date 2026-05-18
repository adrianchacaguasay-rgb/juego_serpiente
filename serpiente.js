
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const tamanoCelda = 25;




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


function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
    pintarParte(5, 5, "red");
  pintarParte(10, 2, "red");

  pintarParte(
    (canvas.height - tamanoCelda) / tamanoCelda,
    (canvas.width - tamanoCelda) / tamanoCelda,
    "red"
  );

  pintarParte(
    (canvas.height - tamanoCelda) / tamanoCelda,
    10,
    "red"
  );

  pintarParte(
    0,
    (canvas.width - tamanoCelda) / tamanoCelda,
    "red"
  );

  pintarParte(
    (canvas.height - tamanoCelda) / tamanoCelda,
    0,
    "red"
  );
}






