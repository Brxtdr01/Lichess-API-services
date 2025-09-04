// tableau pour stocker les FEN
const fenHistory = [];

function generate() {
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return;

  const color = document.querySelector('input[name="color"]:checked').value;
  const fenUrl = fen.split(" ").join("_");
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;

  // ajouter à l'historique
  fenHistory.push({ fen, color, link: linkUrl });

  // générer la liste HTML
  const listHTML = fenHistory.map(item => 
    `<li><a href="${item.link}" target="_blank">${item.fen} (${item.color})</a></li>`
  ).join('');

  document.getElementById("output").innerHTML = `<ul>${listHTML}</ul>`;

  // vider l'input si tu veux
  document.getElementById("fenInput").value = '';
}
