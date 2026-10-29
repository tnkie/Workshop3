/* Complete workshop JavaScript. Students change HTML only. */
(() => {
  const locations = [
    { name: 'CentralWorld', address: 'Pathum Wan, Bangkok', lat: 13.7466, lon: 100.5393 },
    { name: 'Victory Monument', address: 'Ratchathewi, Bangkok', lat: 13.7649, lon: 100.5383 },
    { name: 'Chatuchak Park', address: 'Chatuchak, Bangkok', lat: 13.8026, lon: 100.5538 },
    { name: 'Asiatique', address: 'Bang Kho Laem, Bangkok', lat: 13.7057, lon: 100.5048 }
  ];
  const radians = value => value * Math.PI / 180;
  const haversine = (a, b) => {
    const earthKm = 6371;
    const dLat = radians(b.lat - a.lat);
    const dLon = radians(b.lon - a.lon);
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * earthKm * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  };

  const mapElement = document.querySelector('#map');
  if (!mapElement || !window.L) return;
  const map = L.map('map').setView([13.7563, 100.5350], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  const pickupButton = document.querySelector('#choose-pickup');
  const destinationButton = document.querySelector('#choose-destination');
  const pickupText = document.querySelector('#pickup-result');
  const destinationText = document.querySelector('#destination-result');
  const estimate = document.querySelector('#estimate');
  const status = document.querySelector('#status');
  let mode = 'pickup'; let pickup; let destination; let pickupMarker; let destinationMarker;
  const updateButtons = () => {
    pickupButton.classList.toggle('active', mode === 'pickup');
    destinationButton.classList.toggle('active', mode === 'destination');
  };
  pickupButton.addEventListener('click', () => { mode = 'pickup'; updateButtons(); status.textContent = 'Click a location pin for pickup.'; });
  destinationButton.addEventListener('click', () => { mode = 'destination'; updateButtons(); status.textContent = 'Click a location pin for destination.'; });
  locations.forEach(location => {
    L.marker([location.lat, location.lon]).addTo(map).bindTooltip(location.name).on('click', () => {
      if (mode === 'pickup') { pickup = location; if (pickupMarker) map.removeLayer(pickupMarker); pickupMarker = L.circleMarker([location.lat, location.lon], { color: '#0b7285', radius: 11 }).addTo(map); pickupText.textContent = `${location.name} — ${location.address} (${location.lat.toFixed(4)}, ${location.lon.toFixed(4)})`; mode = 'destination'; updateButtons(); status.textContent = 'Pickup selected. Now click a destination pin.'; }
      else { destination = location; if (destinationMarker) map.removeLayer(destinationMarker); destinationMarker = L.circleMarker([location.lat, location.lon], { color: '#c2410c', radius: 11 }).addTo(map); destinationText.textContent = `${location.name} — ${location.address} (${location.lat.toFixed(4)}, ${location.lon.toFixed(4)})`; status.textContent = 'Destination selected. Your estimate is ready.'; }
      if (pickup && destination) { const km = haversine(pickup, destination); const minutes = Math.max(8, Math.round(km * 3 + 6)); const price = Math.round(45 + km * 9); estimate.hidden = false; estimate.innerHTML = `<h2>Mock delivery estimate</h2><p><strong>Distance:</strong> ${km.toFixed(1)} km</p><p><strong>Estimated time:</strong> ${Math.max(5, minutes - 4)}–${minutes + 5} min</p><p><strong>Estimated price:</strong> ฿${price}</p><p class="muted">Straight-line Haversine distance; this is a prototype estimate, not a real route or price.</p>`; }
    });
  });
  updateButtons();
})();
