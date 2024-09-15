document.addEventListener('DOMContentLoaded', function() {
  const pedidoForm = document.getElementById('pedidoForm');
  const resumenPedido = document.getElementById('resumenPedido');
  const ticketPedido = document.getElementById('ticketPedido');
  const ticketNumero = document.getElementById('ticketNumero');
  const ticketMensaje = document.getElementById('ticketMensaje');
  const preciosBatidos = {
    "Fresa": { "pequeño": 3, "mediano": 5, "grande": 7 },
    "Banana": { "pequeño": 3.5, "mediano": 5.5, "grande": 7.5 },
    "Mango": { "pequeño": 4, "mediano": 6, "grande": 8 },
    "Piña": { "pequeño": 3, "mediano": 5, "grande": 7 },
    "Frutas Mixtas": { "pequeño": 4, "mediano": 6.5, "grande": 8.5 }
  };
  let pedidoActual = []; 
  pedidoForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    do {
      let nombre = document.getElementById('nombre').value;
      let producto = document.getElementById('producto').value;
      let cantidad = parseInt(document.getElementById('cantidad').value);
      let tamaño = document.getElementById('tamano').value;
      if (!nombre || producto === "Selecciona tu batido" || tamaño === "Selecciona el tamaño" || cantidad <= 0) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      let precioUnitario = preciosBatidos[producto][tamaño];
      let precioTotal = cantidad * precioUnitario;
      pedidoActual.push({ producto, tamaño, cantidad, precioUnitario, precioTotal });
      let resumenHtml = `<h4>Resumen del Pedido</h4>`;
      let costoTotal = 0;
      pedidoActual.forEach(batido => {
        resumenHtml += `<p>${batido.cantidad} x ${batido.producto} (${batido.tamaño}) - $${batido.precioUnitario} cada uno, total: $${batido.precioTotal}</p>`;
        costoTotal += batido.precioTotal;
      });
      resumenHtml += `<p><strong>Costo Total Parcial: $${costoTotal}</strong></p>`;
      resumenPedido.innerHTML = resumenHtml;
      resumenPedido.style.display = "block";
      let agregarOtro = confirm("¿Deseas agregar otro batido?");
      if (!agregarOtro) {
        if (costoTotal > 20) {
          let descuento = costoTotal * 0.1;
          costoTotal -= descuento;
          alert(`Se aplicó un descuento de $${descuento}. Total con descuento: $${costoTotal}`);
        }
        const numeroTicket = Math.floor(Math.random() * 10000);
        ticketNumero.textContent = `Ticket #${numeroTicket}`;
        ticketMensaje.textContent = `Gracias, ${nombre}. El costo total de tu pedido es $${costoTotal}.`;
        ticketPedido.style.display = "block";
        pedidoActual = [];
        resumenPedido.style.display = "none";
        break; 
      } else {
        document.getElementById('producto').value = 'Selecciona tu batido';
        document.getElementById('tamano').value = 'Selecciona el tamaño';
        document.getElementById('cantidad').value = '';
      }
    } while (true); 
  });
});
