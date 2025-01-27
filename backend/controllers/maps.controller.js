const { json } = require('express');
const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: 'Address query parameter is required.' });
    }

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json({ success: true, coordinates });
    } catch (error) {
        console.error('Error in getCoordinates:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.getDistanceTime = async (req, res, next) =>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json({ success: true, distanceTime });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'internet server error'});
        
    }
}

module.exports.getAutoCompleteSuggestion = async (req, res, nxet) =>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({errors: errors.array() });

        }
        const { input } = req.query;
         const suggestions = await mapService.getAutoCompleteSuggestion(input);

         res.status(200).json(suggestions);

    }catch(err){
        console.error(err);
        res.status(500).json({message : ' Internal server error ' });
        
    } 
} 