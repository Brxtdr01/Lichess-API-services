// Charger l'historique depuis LocalStorage ou tableau vide
const urlHistory = JSON.parse(localStorage.getItem('urlHistory') || '[]');

// Afficher la liste dès le départ
renderList();

document.getElementById('generateBtn').addEventListener('click', () => {
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return;

  const color = document.querySelector('input[name="color"]:checked').value;
  const fenUrl = fen.split(" ").join("_");
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;

  const note = document.getElementById("noteInput").value.trim();

  // Ajouter à l'historique
  urlHistory.push({ url: linkUrl, note: note });

  // Sauvegarder dans LocalStorage
  localStorage.setItem('urlHistory', JSON.stringify(urlHistory));

  // Reset inputs
  document.getElementById("fenInput").value = '';
  document.getElementById("noteInput").value = '';

  renderList();
});

function renderList() {
  const listHTML = urlHistory.map((item, index) => `
    <li>
      <a href="${item.url}" target="_blank">${item.url}</a>
      ${item.note ? `<span> — ${item.note}</span>` : ""}
      <button onclick="deleteUrl(${index})">Delete</button>
    </li>
  `).join('');
  document.getElementById("output").innerHTML = `<ul>${listHTML}</ul>`;
}

function deleteUrl(index) {
  urlHistory.splice(index, 1);
  localStorage.setItem('urlHistory', JSON.stringify(urlHistory));
  renderList();
}
