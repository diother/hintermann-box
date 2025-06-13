export function showRoutePrompt(routes, onSelect) {
  const selector = document.querySelector("[data-route-selector]");
  const list = document.querySelector("[data-route-list]");

  selector.classList.remove("hidden");
  list.innerHTML = "";

  routes.forEach(route => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.textContent = route.name;
    btn.onclick = () => {
      selector.classList.add("hidden");
      onSelect(route.id);
    }

    li.appendChild(btn);
    list.appendChild(li);
  });
}

export function updateLocationUI(index, locations, updateLocation) {
  const location = locations[index];

  document.querySelector('[data-location-title]').textContent = location.name;
  document.querySelector('[data-location-address]').textContent = location.address;
  document.querySelector('[data-location-description]').textContent = location.description;
  document.querySelector('[data-location-image]').src = `/images/${location.image}`;
  document.querySelector('[data-location-waze]').href = location.wazeLink;

  const prevBtn = document.querySelector('[data-location-prev]');
  const nextBtn = document.querySelector('[data-location-next]');

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === locations.length - 1;

  prevBtn.onclick = () => {
    if (index > 0) updateLocation(index - 1, locations);  
  };
  nextBtn.onclick = () => {
    if (index < locations.length - 1) updateLocation(index + 1, locations);
  };

  document.querySelector('[data-location-panel]').classList.remove('hidden');
}
