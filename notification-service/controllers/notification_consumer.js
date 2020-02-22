const kafka = require('../db/kafka')
const sendEmail = require('./send_email');
const axios = require('axios');
exports.startConsumer = async () => {

    try {

        console.log("****************** Starting the Notification Consumer ************")

        const consumer = kafka.consumer({ groupId: 'new-hotel-booking-notification-group' })
        await consumer.connect()
        await consumer.subscribe({ topic: 'new-hotel-booking', fromBeginning: false })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const receivedData = JSON.parse(message.value.toString())

                console.log(receivedData)

                // // console.log("######### Notification Consumer New Hotel Booking", bookingData)
                // const response = await axios.get(`${process.env.USER_MICROSERVICE_URI}/info/userId/${receivedData.user_id}`);
                // // console.log(response.status)
                // // console.log(response.data)
                // if (response.status === 200) {
                //     sendEmail(response.data.email, '123', 'Radison Blue', receivedData.check_in_date, receivedData.check_out_date).catch(console.error);
                // }

                sendEmail(receivedData.user_email, receivedData._id, receivedData.property_name, receivedData.check_in_date, receivedData.check_out_date).catch(console.error);
            },
        })

    } catch (err) {
        console.log("Consume Notification Subscription ***********************" + err)
    }
}
