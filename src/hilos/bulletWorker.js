// bulletWorker.js
let balas = 6;
let bulletsLeft = balas;

self.onmessage = function (event) {
  //console.log(`balas restantes  : ${bulletsLeft}`);
  if (event.data.action === "shoot") {
    if (bulletsLeft <= 0) {
      bulletsLeft = 0;
    } else {
      bulletsLeft -= 1;
    }
  } else if (event.data.action === "reset") {
    bulletsLeft = balas;
  } else if (event.data.action === "wait") {
    console.log("hilo bullet");
  }

  // Enviar el número de balas restantes al hilo principal
  self.postMessage(bulletsLeft);
};
