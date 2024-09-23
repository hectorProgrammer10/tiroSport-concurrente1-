self.onmessage = function (event) {
  const { action, x, y } = event.data;

  switch (action) {
    case "calculate":
      postMessage({ x, y }); // Enviar la nueva posición
      break;

    case "reset":
      postMessage({ x: 600, y: 900 }); // Posición inicial de la pistola
      break;

    default:
      console.error(`Acción no reconocida: ${action}`);
  }
};
