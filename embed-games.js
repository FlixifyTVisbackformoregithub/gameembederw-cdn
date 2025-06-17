document.addEventListener("DOMContentLoaded", async () => {
  const scriptTag = document.currentScript;
  const apiUrl = scriptTag.getAttribute("data-api");
  const targetSelector = scriptTag.getAttribute("data-target");
  const target = document.querySelector(targetSelector);

  if (!target) {
    console.error("Target container not found:", targetSelector);
    return;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch games JSON");
    const games = await response.json();

    target.innerHTML = games.map(game => `
      <div
        onclick="openGame('${game.url}')"
        style="
          cursor: pointer;
          background: #111;
          border-radius: 12px;
          padding: 12px;
          margin: 10px;
          display: inline-block;
          width: 200px;
          text-align: center;
          color: white;
          font-family: sans-serif;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          transition: transform 0.2s;
        "
        onmouseenter="this.style.transform='scale(1.05)'"
        onmouseleave="this.style.transform='scale(1)'"
      >
        <img src="${game.thumbnail}" alt="${game.title} thumbnail" style="width:100%; border-radius:8px;" />
        <h3 style="margin-top:10px; font-size:18px;">${game.title}</h3>
      </div>
    `).join("");
  } catch (err) {
    target.innerHTML = "<p style='color:red'>Error loading games.</p>";
    console.error(err);
  }
});

window.openGame = function(url) {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameFrame");
  iframe.src = url;
  modal.style.display = "block";
};

window.closeGame = function() {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameFrame");
  iframe.src = "";
  modal.style.display = "none";
};
