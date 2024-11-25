let totalPx = 1200;
let resultado;

self.onmessage = function (event) {
  if (event.data.action === "calculate") {
    const mouseX = event.data.x;
    resultado = (mouseX * 100) / totalPx;
    resultado = (resultado * 90) / 100;
    resultado = resultado + 45;
  } else if (event.data.action === "reset") {
    resultado = 90;
  }
  self.postMessage(resultado);
};
