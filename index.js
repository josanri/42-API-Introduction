import fetch from 'node-fetch';
import * as dotenv from 'dotenv'
dotenv.config()

// Configuramos los parámetros de la petición POST
const data = {
    grant_type: 'client_credentials',
    client_id: process.env.API_UID,
    client_secret: process.env.API_SECRET
};

/**
 * Las opciones para una petición FETCH de tipo POST
 * con los datos previos*/
const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
};

function getOptionsToken(access_token) {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        }
    };
}


function getDataFromUser(user, token)
{
    fetch(`https://api.intra.42.fr/v2/users/${user}`, getOptionsToken(token))
    .then(response => {
        response.json()
        .then(me => {
            console.log(me.id + " " + me.email + " " + me.login);
            return me;
        })
    });
}

async function getUsersFromCampus(campus_id, token) {
    let url = `https://api.intra.42.fr/v2/campus/${campus_id}/users`;
    const students = []
    try {
        while (url !== null) {
            const response = await fetch(url, getOptionsToken(token));
            const link = response.headers.get('link');
            const users = await response.json();
            users.forEach(user => {
                students.push(user.login);
            });
            const nextLink = link.split(", ").filter(x => x.includes("next"));
            if (nextLink.length > 0) {
                url = nextLink[0].substring(1, nextLink[0].indexOf('>'));
            } else {
                url = null;
            }
        }
    } catch (err) {
        console.log(err);
    }
    console.log(students);
}

fetch('https://api.intra.42.fr/oauth/token', postOptions)
.then((res) => res.json().then((jsonData) => {
    console.log(jsonData);
    getDataFromUser('josesanc', jsonData.access_token)
    getUsersFromCampus(37, jsonData.access_token)
}))
.catch((e) => console.log("Error: " +  e))