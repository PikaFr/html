const filePath = 'horaires.txt';

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

    outputList.innerHTML = '';

    lines.forEach(function (line) {

        const listItem = document.createElement('li');

        listItem.textContent = line;

        outputList.appendChild(listItem);

    });
}
