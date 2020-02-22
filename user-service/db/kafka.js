const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'hotel-booking-app',
    brokers: [process.env.KAFKA_URI]
})

module.exports = kafka;