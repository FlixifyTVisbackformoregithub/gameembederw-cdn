document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = document.currentScript.getAttribute("data-api");
  const targetSelector = document.currentScript.getAttribute("data-target");
  const target = document.querySelector(targetSelector);

  const res = await fetch(apiUrl);
  const games = await res.json();

  target.innerHTML = games.map(game => `
    <div onclick="openGame('${game.url}')" style="cursor:pointer;background:#111;border-radius:12px;padding:12px;margin:10px;display:inline-block;width:200px;text-align:center;color:white;font-family:sans-serif;box-shadow:0 0 10px rgba(255,255,255,0.1);transition:transform 0.2s;">
      <img src="${game.thumbnail}" style="width:100%;border-radius:8px;" />
      <h3 style="margin-top:10px;font-size:18px;">${game.title}</h3>
    </div>
  `).join("");
});

// Global functions
window.openGame = function (url) {
  document.getElementById("gameFrame").src = url;
  document.getElementById("gameModal").style.display = "block";
}

window.closeGame = function () {
  document.getElementById("gameModal").style.display = "none";
  document.getElementById("gameFrame").src = "";
}
