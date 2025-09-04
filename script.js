/******************************************************
 * Script gestion FEN + Firebase Firestore
 ******************************************************/

// --- CONFIG FIREBASE ---
// ⚠️ Mets ici les infos de ton projet Firebase (console → Paramètres → Config SDK web)
const firebaseConfig = {
  apiKey: "AIzaSyD0qB4wCP00n4lVGrSRK-JnKBtbmZ48Vvc",
  authDomain: "fen-urls.firebaseapp.com",
  projectId: "fen-urls",
  storageBucket: "fen-urls.firebasestorage.app",
  messagingSenderId: "1023372721889",
  appId: "1:1023372721889:web:f26546444f8520ea7d81a0"
};

// --- INIT FIREBASE ---
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- TABLEAU LOCAL POUR LES URLS ---
const urlHistory = [];

// --- AJOUTER UNE NOUVELLE URL ---
document.getElementById('generateBtn').addEventListener('click', generate);

function generate() {
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return;

  const color = document.querySelector('input[name="color"]:checked').value;
  const fenUrl = fen.split(" ").join("_");
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;

  const note = document.getElementById("noteInput").value.trim();

  // Sauvegarde dans Firestore
  db.collection("urls").add({
    url: linkUrl,
    note: note,
    createdAt: new Date()
  }).then(docRef => {
    console.log("Ajouté avec ID:", docRef.id);
  }).catch(error => {
    console.error("Erreur Firebase:", error);
  });

  // Reset inputs
  document.getElementById("fenInput").value = '';
  document.getElementById("noteInput").value = '';
}

// --- AFFICHER LA LISTE ---
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

// --- SUPPRIMER UNE URL ---
function deleteUrl(index) {
  const item = urlHistory[index];
  if (!item) return;

  db.collection("urls")
    .where("url", "==", item.url)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete());
    })
    .catch(error => console.error("Erreur suppression:", error));
}

// --- CHARGER EN TEMPS RÉEL DEPUIS FIREBASE ---
window.onload = () => {
  db.collection("urls")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      urlHistory.length = 0; // reset tableau local
      snapshot.forEach(doc => {
        urlHistory.push(doc.data());
      });
      renderList();
    });
};
