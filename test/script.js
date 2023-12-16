const { google } = require('googleapis');
require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });
const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);
const TIMEOFFSET = '+01:00';
const dateTimeForCalander = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
    let event = new Date(Date.parse(newDateTime));
    let startDate = event;
    return startDate
};
const getEvents = async (dateTimeStart, dateTimeEnd) => {
    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Europe/Paris'
        });
        let items = response.data.items;
        return items.map(event => event.id);
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return [];
    }
};
const deleteEvent = async (eventId) => {
    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });
        return `Événement supprimé : ${eventId}`;
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return `Erreur lors de la suppression de l'événement : ${eventId}`;
    }
};
const deleteEventsBetweenDates = async (dateTimeStart, dateTimeEnd) => {
    try {
        let eventIds = await getEvents(dateTimeStart, dateTimeEnd);
        let results = await Promise.all(eventIds.map(eventId => deleteEvent(eventId)));
        console.log(results);
    } catch (error) {
        console.log(`Error at deleteEventsBetweenDates --> ${error}`);
    }
};
let start = '2023-01-01T00:00:00.000Z';
let end = dateTimeForCalander();
deleteEventsBetweenDates(start, end);
