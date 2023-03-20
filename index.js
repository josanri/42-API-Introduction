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

function getURLForUser(user)
{
    return `https://api.intra.42.fr/v2/users/${user}`
}

fetch('https://api.intra.42.fr/oauth/token', postOptions)
.then((res) => res.json().then((jsonData) => {
    console.log(jsonData);
    fetch(getURLForUser("josesanc"), getOptionsToken(jsonData.access_token))
    .then(response => {
        response.json().then(me => console.log(me.id + " " + me.email + " " + me.login))
    }); 
}))
.catch((e) => console.log("Error: " +  e));