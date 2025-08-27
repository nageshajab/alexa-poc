//https://taskmanagerservice.azurewebsites.net/api/therapyvisitRemaining
const axios = require('axios');

async function callApi(urlToCall) {
    const promise =  axios({
        method: 'post',
        url: urlToCall,
        data: {
        }
    });    
    const dataPromise = promise.then((response) => response.data)
    return dataPromise
};
module.exports = { callApi };