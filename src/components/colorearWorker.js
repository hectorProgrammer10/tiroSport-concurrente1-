let estado;
let oid;
let osos = 6;

self.onmessage = function (event) {
  estado = event.data.estado;
  oid = event.data.oid;
  if (event.data.estado == "tumbado") {
    colorear();
  }
};

function colorear() {
  console.log(`${estado}, id : ${oid}`);
}
