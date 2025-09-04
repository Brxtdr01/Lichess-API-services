// Tableau pour stocker les URLs générées
const urlHistory = [];

// On récupère le bouton et on ajoute l'événement click
document.getElementById('generateBtn').addEventListener('click', generate);

function generate() {
  // Récupérer le FEN depuis l'input
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return; // Si vide, ne rien faire

  // Récupérer la couleur sélectionnée
  const color = document.querySelector('input[name="color"]:checked').value;

  // Transformer le FEN pour Lichess (espaces -> underscores)
  const fenUrl = fen.split(" ").join("_");

  // Créer l'URL d'analyse
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;

  // Ajouter l'URL à l'historique
  urlHistory.push(linkUrl);

  // Générer le HTML de la liste des URLs
  const listHTML = urlHistory.map(url => 
    `<li><a href="${url}" target="_blank">${url}</a></li>`
  ).join('');

  // Afficher la liste dans le div output
  document.getElementById("output").innerHTML = `<ul>${listHTML}</ul>`;

  // Vider l'input pour la prochaine saisie
  document.getElementById("fenInput").value = '';
}
