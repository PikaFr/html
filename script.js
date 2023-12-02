// Spécifiez le chemin de votre fichier texte
const filePath = 'horaires.txt';

// Appel de la fonction pour lire le contenu du fichier et créer la liste
readFileAndCreateList(filePath);

function readFileAndCreateList(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(content => {
            const lines = content.split('\n');
            createList(lines);
        })
        .catch(error => console.error('Erreur de lecture du fichier :', error));
}

function createList(lines) {
    const outputList = document.getElementById('outputList');
    outputList.innerHTML = ''; // Effacer la liste précédente

    lines.forEach(function (line) {
        // Créer un élément li pour chaque ligne
        const listItem = document.createElement('li');
        listItem.textContent = line;

        // Ajouter l'élément li à la liste ul
        outputList.appendChild(listItem);
    });
}
