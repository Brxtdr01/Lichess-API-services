document.getElementById('analyzeBtn').addEventListener('click', generate);

function generate() {
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return;

  // couleur choisie
  const color = document.querySelector('input[name="color"]:checked').value;

  // lien partageable
  const fenUrl = fen.split(" ").join("_");
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;

  document.getElementById("output").innerHTML = `
    <a href="${linkUrl}" target="_blank">${linkUrl}</a>
  `;
}
