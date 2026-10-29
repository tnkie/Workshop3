# Workshop 03: Delivery Location Interface

## Rules

Work only in this student folder. The JavaScript and dummy location data are complete: **edit HTML only**. Do not use real customer data, add storage, a database, login, payment, or an API key.

Open the folder with VS Code and Live Server; do not double-click the files. The only page you work on is `delivery.html`. Do not edit `profile.html`.

## Step 1: Understand the starter

Open `delivery.html`. It uses twelve text fields to collect two addresses. This causes effort, inconsistency, and typing errors. Keep it as your “before” version for comparison.

## Step 2: Replace address fields with one map interface

Replace the existing `<form>...</form>` with this HTML. It gives the supplied JavaScript the element IDs it needs. The user can select either button and then click anywhere on the map to place or move that pin.

```html
<section aria-labelledby="location-heading">
  <h2 id="location-heading">Choose locations on the map</h2>
  <p>Choose which pin to edit, then click anywhere on the map. You can change either point freely.</p>
  <div class="map-controls">
    <button id="choose-pickup" type="button">Edit pickup pin</button>
    <button id="choose-destination" type="button">Edit destination pin</button>
  </div>
  <p id="pickup-result" class="location-result">Pickup: not selected</p>
  <p id="destination-result" class="location-result">Destination: not selected</p>
  <p id="status" class="status" role="status">Click the map to choose pickup.</p>
  <div id="map" aria-label="Map with selectable delivery locations"></div>
  <button id="reserve" type="button" disabled>Reserve driver</button>
  <p id="waiting" class="waiting" hidden>Finding a driver<span class="dots">...</span></p>
  <section id="summary" class="estimate" hidden></section>
  <button id="confirm" type="button">Confirm mock payment</button>
</section>
```

Before `</head>`, add Leaflet’s stylesheet:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
```

Before `</body>`, add these scripts in this order:

```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="js/delivery-free-map.js"></script>
```

## Step 3: Test the feedback

Choose a pickup coordinate and a different destination coordinate. Use **Edit pickup pin** or **Edit destination pin** to move either point. Check that the page shows both latitude/longitude values and enables **Reserve driver** after both points exist.

The distance is calculated with the Haversine formula: it measures straight-line distance between two latitude/longitude points. It is not a real road route.

## Step 4: Reserve and confirm

Press **Reserve driver**. The prototype shows a short 2.5-second “finding driver” state, then a mock driver-accepted summary with distance, estimated time, and mock payment. Press **Confirm mock payment** and confirm that it only shows temporary feedback; nothing is stored or charged.

## Step 5: Make one individual usability improvement

Make one HTML-only improvement that makes the flow clearer: for example, better button wording, a helpful instruction, a required-step indicator, or clearer feedback. Add an HTML comment explaining how it reduces user effort or confusion.

## Step 6: Individual peer test

Write a realistic delivery task in an HTML comment near the bottom of `delivery.html`. Ask a classmate to try it without instructions. Record one point of hesitation or error, then revise your interface if time permits.
