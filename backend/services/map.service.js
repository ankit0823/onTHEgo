const axios = require('axios');
const driverModel = require('../models/driver.model');
// const { response } = require('../app');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API;

    if (!apiKey) {
        throw new Error('Google Maps API key is missing. Set GOOGLE_MAP_API in your environment variables.');
    }

    if (!address || typeof address !== 'string') {
        throw new Error('Invalid or missing address parameter.');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat, // Fixed typo from 'ltd' to 'lat'
                lng: location.lng,
            };
        } else if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('No results found for the provided address.');
        } else {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error in getAddressCoordinates:', error.message);

        if (error.response) {
            throw new Error(`API request failed with status ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No response received from Google Maps API.');
        } else {
            throw new Error(`Unexpected error: ${error.message}`);
        }
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAP_API;

    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
             if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error( ' no routes found')
             }
            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error in getDistanceTime:', error.message);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestion = async (input) => { 
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    const url  = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{

        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable fetch Suggestion')
        }

    } catch(err) {
        console.error(err);
        throw err;
    }

}

module.exports.getDriverInRadius = async ( ltd, lng, radius) =>{
    const driver = await driverModel.find({
        location:{
            $geoWithin:{
                $centerSphere: [ [ ltd, lng ], radius / 6371]
            }
        }
    });

    return driver;
}