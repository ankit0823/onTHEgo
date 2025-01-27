
const { log } = require('console');
const rideModel = require('../models/ride.model');
const mapService = require('./map.service')
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare (pickup, destination){

    if(!pickup || !destination) {

        throw new Error('pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

   
    const baseFare = {
            auto: 30, 
            car: 50, 
            moto:20
        };
    const perKmrRate = {
            auto: 10, 
            car: 15, 
            moto: 8
        }; 
    const perMinuteRate = {
            auto: 2, 
            car: 3, 
            moto: 1.5
        };
        
        console.log(distanceTime);
        
    

    const fares = {
        auto: Math.round(baseFare.auto + ( (distanceTime.distance.value / 1000) * perKmrRate.auto ) + ((distanceTime.duration.value/60 )* perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmrRate.car) + ((distanceTime.duration.value/60 ) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmrRate.moto) + ((distanceTime.duration.value/60 )* perMinuteRate.moto))
    };
    

    return fares;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num -1 ), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required')
    }

    const fare = await getFare(pickup, destination);
    
    console.log(fare);
    

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType]
    })

    return ride;
}

module.exports.confirmRide = async({
    rideId, driver
    }) => {
        if (!rideId) {
            throw new Error('Ride id is required');
        }
    
        await rideModel.findOneAndUpdate({
            _id: rideId
        }, {
            status: 'accepted',
            driver: driver._id
        })
    
        const ride = await rideModel.findOne({
            _id: rideId
        }).populate('user').populate('driver').select('+otp');
      
        
    
        if (!ride) {
            throw new Error('Ride not found');
        }
    
        return ride;
}

module.exports.startRide = async ({ rideId, otp, driver }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('driver').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted')
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing',
        // startTime: new Date()
    });
    
    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({ rideId, driver }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        driver: driver._id
    }).populate('user').populate('driver').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}