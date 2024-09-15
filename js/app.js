document.addEventListener('DOMContentLoaded', function() {
  const pedidoForm = document.getElementById('pedidoForm');
  const resumenPedido = document.getElementById('resumenPedido');
  const ticketPedido = document.getElementById('ticketPedido');
  const ticketNumero = document.getElementById('ticketNumero');
  const ticketMensaje = document.getElementById('ticketMensaje');

  // Precios de los batidos por tipo y tamaño
  const preciosBatidos = {
    "Fresa": { "pequeño": 3, "mediano": 5, "grande": 7 },
    "Banana": { "pequeño": 3.5, "mediano": 5.5, "grande": 7.5 },
    "Mango": { "pequeño": 4, "mediano": 6, "grande": 8 },
    "Piña": { "pequeño": 3, "mediano": 5, "grande": 7 },
    "Frutas Mixtas": { "pequeño": 4, "mediano": 6.5, "grande": 8.5 }
  };

  let pedidoActual = []; // Almacenar batidos seleccionados

  pedidoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar la recarga de la página al enviar el formulario

    do {
      // Capturar datos del formulario
      let nombre = document.getElementById('nombre').value;
      let producto = document.getElementById('producto').value;
      let cantidad = parseInt(document.getElementById('cantidad').value);
      let tamaño = document.getElementById('tamano').value;

      // Validar que se hayan ingresado todos los campos
      if (!nombre || producto === "Selecciona tu batido" || tamaño === "Selecciona el tamaño" || cantidad <= 0) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Obtener el precio unitario del batido seleccionado
      let precioUnitario = preciosBatidos[producto][tamaño];

      // Calcular el precio total por batido
      let precioTotal = cantidad * precioUnitario;

      // Agregar el batido al pedido actual
      pedidoActual.push({ producto, tamaño, cantidad, precioUnitario, precioTotal });

      // Mostrar el resumen de los batidos seleccionados en la página antes de generar el ticket
      let resumenHtml = `<h4>Resumen del Pedido</h4>`;
      let costoTotal = 0;

      pedidoActual.forEach(batido => {
        resumenHtml += `<p>${batido.cantidad} x ${batido.producto} (${batido.tamaño}) - $${batido.precioUnitario} cada uno, total: $${batido.precioTotal}</p>`;
        costoTotal += batido.precioTotal;
      });

      resumenHtml += `<p><strong>Costo Total Parcial: $${costoTotal}</strong></p>`;
      resumenPedido.innerHTML = resumenHtml;
      resumenPedido.style.display = "block";

      // Preguntar si se desea agregar otro batido
      let agregarOtro = confirm("¿Deseas agregar otro batido?");
      if (!agregarOtro) {
        // Aplicar descuento si el costo total es mayor a $20
        if (costoTotal > 20) {
          let descuento = costoTotal * 0.1;
          costoTotal -= descuento;
          alert(`Se aplicó un descuento de $${descuento}. Total con descuento: $${costoTotal}`);
        }

        // Generar el ticket
        const numeroTicket = Math.floor(Math.random() * 10000);

        // Mostrar los detalles finales en el ticket
        ticketNumero.textContent = `Ticket #${numeroTicket}`;
        ticketMensaje.textContent = `Gracias, ${nombre}. El costo total de tu pedido es $${costoTotal}.`;
        ticketPedido.style.display = "block";

        // Limpiar el resumen y pedido actual para un nuevo pedido
        pedidoActual = [];
        resumenPedido.style.display = "none";
        break; // Salir del ciclo
      } else {
        // Limpiar el formulario para agregar otro batido
        document.getElementById('producto').value = 'Selecciona tu batido';
        document.getElementById('tamano').value = 'Selecciona el tamaño';
        document.getElementById('cantidad').value = '';
      }

    } while (true); // Repetir si el usuario desea agregar más batidos
  });
});
