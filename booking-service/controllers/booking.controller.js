const Booking = require('../models/booking.model');
const mongoose = require('mongoose');
const kafka = require('./../db/kafka')
const axios = require('axios');

exports.health = function (req, res) {
    res.send('Up and running!');
};

const producer = kafka.producer()
producer.connect()

exports.bookHotel = async (req, res) => {

    const { property_id, property_name, check_in_date, check_out_date, user_email, } = req.body;

    isHotelBooked = await Booking.find({
        property_id: property_id,
        $or: [{
            check_in_date: {
                $gte: new Date(check_in_date),
                $lte: new Date(check_out_date)
            }
        }, {
            check_out_date: {
                $gte: new Date(check_in_date),
                $lte: new Date(check_out_date)
            }
        }]
    })


    if (isHotelBooked.length > 0) {
        console.log("Hotel Booked for date ***")
        res.status(404).send({ 'message': 'Hotel not available for the dates' });
        return;
    }

    //Get Information about the user
    const userResponse = await axios.get(`${process.env.USER_MICROSERVICE_URI}/info/userEmail/${user_email}`);

    if (userResponse.status !== 200) {
        res.status(404).send('something bad happened please try again after some time');
        return;
    }


    const booking = new Booking({ property_id: mongoose.Types.ObjectId(property_id), user_id: mongoose.Types.ObjectId(userResponse.data._id), check_in_date, check_out_date })
    const savedBooking = await booking.save()

    // const propertyInfo = await Hot

    try {

        let kafkaMessage = await producer.send({
            topic: 'new-hotel-booking',
            messages: [
                {
                    value: JSON.stringify({
                        _id: savedBooking._id,
                        property_id: savedBooking.property_id,
                        property_name,
                        user_id: savedBooking.user_id,
                        check_in_date: savedBooking.check_in_date,
                        check_out_date: savedBooking.check_in_date,
                        user_email: userResponse.data.email,
                        user_mobile: userResponse.data.mobile
                    })
                },
            ],
        })
        console.log("******************", kafkaMessage)
    } catch (err) {
        console.log("***********************" + err)
    }

    res.send(savedBooking)

}