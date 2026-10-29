/* Complete workshop JavaScript. Students change HTML only. */
(() => {
  const toRadians = degrees => degrees * Math.PI / 180;
  const distanceKm = (first, second) => {
    const dLat = toRadians(second.lat - first.lat);
    const dLon = toRadians(second.lon - first.lon);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(first.lat)) * Math.cos(toRadians(second.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * 6371 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };
  if (!document.querySelector('#map') || !window.L) return;
  const map = L.map('map').setView([13.7563, 100.5350], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  const pickupText = document.querySelector('#pickup-result');
  const destinationText = document.querySelector('#destination-result');
  const status = document.querySelector('#status');
  const reserve = document.querySelector('#reserve');
  const waiting = document.querySelector('#waiting');
  const summary = document.querySelector('#summary');
  const confirm = document.querySelector('#confirm');
  let pickup; let destination; let pickupMarker; let destinationMarker;
  const describe = point => `${point.lat.toFixed(5)}, ${point.lon.toFixed(5)}`;
  const updateEstimate = () => {
    if (!pickup || !destination) return;
    const km = distanceKm(pickup, destination);
    const minutes = Math.max(8, Math.round(km * 3 + 6));
    const price = Math.round(45 + km * 9);
    reserve.disabled = false;
    reserve.dataset.km = km.toFixed(1); reserve.dataset.minutes = minutes; reserve.dataset.price = price;
    status.textContent = `Locations selected: ${km.toFixed(1)} km straight-line distance. Reserve when ready.`;
  };
  map.on('click', event => {
    const point = { lat: event.latlng.lat, lon: event.latlng.lng };
    if (!pickup) {
      pickup = point; if (pickupMarker) map.removeLayer(pickupMarker);
      pickupMarker = L.marker(event.latlng).addTo(map).bindTooltip('Pickup').openTooltip();
      pickupText.textContent = `Pickup coordinates: ${describe(point)}`;
      status.textContent = 'Pickup selected. Click the map again to choose destination.';
    } else {
      destination = point; if (destinationMarker) map.removeLayer(destinationMarker);
      destinationMarker = L.marker(event.latlng).addTo(map).bindTooltip('Destination').openTooltip();
      destinationText.textContent = `Destination coordinates: ${describe(point)}`;
      updateEstimate();
    }
  });
  reserve.addEventListener('click', () => {
    reserve.disabled = true; waiting.hidden = false; summary.hidden = true;
    status.textContent = 'Finding an available driver…';
    window.setTimeout(() => {
      waiting.hidden = true; summary.hidden = false;
      summary.innerHTML = `<h2>Driver accepted</h2><p>A mock driver accepted your request.</p><p><strong>Distance:</strong> ${reserve.dataset.km} km</p><p><strong>Estimated time:</strong> ${Math.max(5, Number(reserve.dataset.minutes) - 4)}–${Number(reserve.dataset.minutes) + 5} min</p><p><strong>Mock payment:</strong> ฿${reserve.dataset.price}</p><p class="muted">This is a temporary prototype summary. No payment is processed.</p>`;
      status.textContent = 'Driver accepted. Review the mock payment summary.';
    }, 2500);
  });
  confirm.addEventListener('click', () => { status.textContent = 'Prototype confirmed: no delivery or payment was created.'; });
})();
