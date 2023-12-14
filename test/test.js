// Fonction d'initialisation du client Google API
function initClient() {
    // Configurer les informations d'identification
    const clientId = '746703428695-06edrmqd22qinn1vgtfi249pqg3bkepr.apps.googleusercontent.com ';
    const scope = 'https://www.googleapis.com/auth/calendar';

    // Charger la bibliothèque client Google API avec la nouvelle méthode d'initialisation
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: clientId,
            scope
        }).then(() => {
            // Appeler la fonction pour supprimer les événements passés
            supprimerEvenementsPasses();
        });
    });
}
async function supprimerEvenementsPasses() {
    // Récupérer la date actuelle au format ISO (UTC)
    const now = new Date().toISOString();

    // Récupérer les événements du calendrier
    const events = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: now,
        singleEvents: true,
        orderBy: 'startTime'
    });

    // Filtrer et supprimer les événements passés
    const evenementsPasses = events.result.items.filter(event => new Date(event.end.dateTime) < new Date());
    for (const event of evenementsPasses) {
        await gapi.client.calendar.events.delete({
            calendarId: 'primary',
            eventId: event.id
        });
        console.log(`Événement passé supprimé : ${event.summary}`);
    }
}

// Chargement de l'API Google client et initialisation
gapi.load('client', initClient);