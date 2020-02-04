const Booking = require('../models/booking.model');
const mongoose = require('mongoose');
const kafka = require('./../db/kafka')
//Simple version, without validation or sanitation
exports.health = function (req, res) {
    res.send('Up and running!');
};

const producer = kafka.producer()
producer.connect()

exports.bookHotel = async (req, res) => {

    const { property_id, check_in_date, check_out_date } = req.body;

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
        res.send({ 'message': 'Hotel not available for the dates' }).status(404);
        return;
    }

    const booking = new Booking({ property_id: mongoose.Types.ObjectId(property_id), check_in_date, check_out_date })
    const savedBooking = await booking.save()

    try {
        let kafkaMessage = await producer.send({
            topic: 'new-hotel-booking',
            messages: [
                { value: JSON.stringify(savedBooking) },
            ],
        })
        console.log("******************", kafkaMessage)
    } catch (err) {
        console.log("***********************" + err)
    }

    res.send(savedBooking)

}