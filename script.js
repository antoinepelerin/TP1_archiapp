function fact(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  let resultat = 1;
  for (let i = 2; i <= n; i++) {
      resultat *= i;
  }
  return resultat;  
}

function applique(f, tab) {
  return tab.map(f);
}

// Fonction pour récupérer les messages depuis l'API
// Fonction pour récupérer les messages depuis l'API
function fetchMessages() {
  fetch('https://48631982-5c35-4927-93d1-b3b5110c79ac-00-35rpmbc1e8m74.worf.replit.dev/msg/getAll')
    .then(response => response.json())
    .then(messages => update(messages)) // Met à jour l'affichage
    .catch(err => console.error("Erreur lors de la récupération :", err));
}

function update(messages) {
  const list = document.getElementById("messageList");
  list.innerHTML = ""; // Vide la liste avant de la remplir à nouveau

  messages.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.pseudo || 'Anonyme'}</strong>: ${item.msg} 
        <em>(${new Date(item.date).toLocaleString()})</em> 
        <delete-button onclick="deleteMessage(${index})">Supprimer</delete-button>
      `;
      list.appendChild(li);
  });
}



// Charger les messages au démarrage
window.onload = fetchMessages;


// Fonction pour poster un message
document.getElementById("postMessageButton").addEventListener("click", () => {
  const message = document.getElementById("messageInput").value;  // Récupère le message
  const pseudo = document.getElementById("pseudoInput").value || "Anonyme";  // Récupère le pseudo, ou "Anonyme" par défaut

  if (message.trim() === "") {
    alert("Veuillez entrer un message.");
    return;  // Ne rien faire si le message est vide
  }

  // Envoie le message au serveur
  postMessage(pseudo, message);

  // Effacer le champ après envoi
  document.getElementById("messageInput").value = "";
});

// Fonction pour envoyer le message au serveur
function postMessage(pseudo, message) {
  const newMessage = {
    pseudo: pseudo,
    msg: message,
    date: new Date()
  };

  fetch('https://48631982-5c35-4927-93d1-b3b5110c79ac-00-35rpmbc1e8m74.worf.replit.dev/msg/post', {  // Assure-toi que l'URL est correcte
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)  // Envoie le message en JSON
  })
  .then(response => response.json())
  .then(() => {
    fetchMessages();  // Rafraîchit la liste des messages après envoi
  })
  .catch(err => console.error("Erreur lors de l'envoi du message :", err));
}


function deleteMessage(index) {
  fetch(`https://48631982-5c35-4927-93d1-b3b5110c79ac-00-35rpmbc1e8m74.worf.replit.dev/msg/del/${index}`, { method: 'GET' })
      .then(() => {
          console.log("Message supprimé");
          fetchMessages(); // Mettre à jour la liste des messages après suppression
      })
      .catch(error => console.error("Erreur lors de la suppression du message :", error));
}

// Charger les messages au chargement de la page
window.onload = fetchMessages;



// Gère l'événement de mise à jour
document.getElementById("updateButton").addEventListener("click", () => {
  fetch('https://48631982-5c35-4927-93d1-b3b5110c79ac-00-35rpmbc1e8m74.worf.replit.dev/msg/getAll')
    .then(response => response.json())
    .then(data => update(data))
    .catch(err => console.error("Erreur lors de la récupération des messages :", err));
});

// Gère le changement de thème
document.getElementById("changerTheme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

