// bulletWorker.js
let bulletsLeft = 6;

self.onmessage = function (event) {
  if (event.data.action === "shoot") {
    bulletsLeft -= 1;
  } else if (event.data.action === "reset") {
    bulletsLeft = 7;
  }

  // Enviar el número de balas restantes al hilo principal
  self.postMessage(bulletsLeft);
};
