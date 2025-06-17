(async () => {
  const script = document.currentScript;
  const apiUrl = script.getAttribute('data-api');
  const containerSelector = script.getAttribute('data-target');
  const container = document.querySelector(containerSelector);

  if (!container) return console.error('Target container not found');

  const res = await fetch(apiUrl);
  const games = await res.json();

  const style = document.createElement('style');
  style.textContent = `
    .game-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      padding: 16px;
    }
    .game-card {
      background: #111;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: transform 0.2s;
      color: white;
      text-align: center;
    }
    .game-card:hover {
      transform: scale(1.05);
    }
    .game-card img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }
    .game-card h3 {
      margin: 10px 0;
      font-size: 1rem;
    }
    .game-card a {
      display: inline-block;
      margin-bottom: 12px;
      padding: 6px 12px;
      background: #1f1f1f;
      border: 1px solid #444;
      color: white;
      border-radius: 6px;
      text-decoration: none;
    }
    .game-card a:hover {
      background: #333;
    }
  `;
  document.head.appendChild(style);

  const grid = document.createElement('div');
  grid.className = 'game-card-grid';

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" />
      <h3>${game.title}</h3>
      <a href="${game.url}" target="_blank">Play</a>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
})();
