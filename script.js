const firebaseConfig = {
  apiKey: "AIzaSyD0qB4wCP00n4lVGrSRK-JnKBtbmZ48Vvc",
  authDomain: "fen-urls.firebaseapp.com",
  projectId: "fen-urls",
  storageBucket: "fen-urls.firebasestorage.app",
  messagingSenderId: "1023372721889",
  appId: "1:1023372721889:web:f26546444f8520ea7d81a0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Choix dynamique de la collection selon la page ---
const pageName = window.location.pathname.split("/").pop().toLowerCase(); // boris.html ou nielsen.html
let collectionName;

if (pageName === "boris.html") {
  collectionName = "urls_boris";
} else if (pageName === "nielsen.html") {
  collectionName = "urls_nielsen"; // minuscule
} else {
  collectionName = "urls_misc"; // fallback
}

const urlRef = db.collection(collectionName);

const urlHistory = [];

document.getElementById('generateBtn').addEventListener('click', () => {
  const fen = document.getElementById("fenInput").value.trim();
  if (!fen) return;

  const color = document.querySelector('input[name="color"]:checked').value;
  const fenUrl = fen.split(" ").join("_");
  const linkUrl = `https://lichess.org/analysis/${fenUrl}?color=${color}`;
  const note = document.getElementById("noteInput").value.trim();

  urlRef.add({
    url: linkUrl,
    note: note,
    createdAt: new Date()
  }).then(() => {
    document.getElementById("fenInput").value = '';
    document.getElementById("noteInput").value = '';
  }).catch(err => console.error(err));
});

urlRef
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    urlHistory.length = 0;
    snapshot.forEach(doc => urlHistory.push(doc.data()));
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
  const item = urlHistory[index];
  if (!item) return;

  urlRef
    .where("url", "==", item.url)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => doc.ref.delete());
    })
    .catch(err => console.error(err));
}
