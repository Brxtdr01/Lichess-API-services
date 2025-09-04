// Tableau pour stocker les entrées (URL + note)
const urlHistory = [];

// Écouteur sur le bouton
document.getElementById('generateBtn').addEventListener('click', generate);

function generate() {
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return;

  const color = document.querySelector('input[name="color"]:checked').value;
  const fenUrl = fen.split(" ").join("_");
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;

  const note = document.getElementById("noteInput").value.trim();

  // Ajouter un objet dans l'historique
  urlHistory.push({ url: linkUrl, note });

  renderList();

  // Reset inputs
  document.getElementById("fenInput").value = '';
  document.getElementById("noteInput").value = '';
}

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
  urlHistory.splice(index, 1); // Supprimer l'élément du tableau
  renderList(); // Re-afficher la liste
}
