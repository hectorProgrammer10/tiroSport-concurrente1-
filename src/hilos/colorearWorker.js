let estado;
let oid;
let osos = 6;
let arrayOsoTumbados = [];

self.onmessage = function (event) {
  estado = event.data.estado;
  oid = event.data.oid;
  if (event.data.estado == "tumbado") {
    colorear();
  }
  console.log(arrayOsoTumbados);
  self.postMessage(arrayOsoTumbados);
};

function colorear() {
  arrayOsoTumbados.push(oid);
}
