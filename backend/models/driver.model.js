const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
   fullname: {
        firstname: {
            type: String,
            required: true,
            minlength :  [3, "First name must be at least 3 character long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 character long"]

        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'is invalid']

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 character long"],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 character long"]
        },
        vehicleType:{
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        }
    },

    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }

    }
});

driverSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

driverSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

driverSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const driverModel = mongoose.model('driver', driverSchema);
module.exports = driverModel;