const kafka = require('./../db/kafka')
const esClient = require('./../db/elastic-search')
exports.startConsumer = async () => {


    // const producer = kafka.producer()
    // producer.connect()

    // try {
    //     let kafkaMessage = await producer.send({
    //         topic: 'new-hotel-booking',
    //         messages: [
    //             { value: "Test 123" },
    //         ],
    //     })
    //     console.log("******************", kafkaMessage)
    // } catch (err) {
    //     console.log("***********************" + err)
    // }



    try {

        console.log("******************Starting the Consumer ************")

        const consumer = kafka.consumer({ groupId: 'new-hotel-booking-group-1' })
        await consumer.connect()
        await consumer.subscribe({ topic: 'new-hotel-booking', fromBeginning: false })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const receivedData = JSON.parse(message.value.toString())

                let bookingData = {
                    "property_id": receivedData.property_id,
                    "check_in_date": receivedData.check_in_date,
                    "check_out_date": receivedData.check_out_date,
                    "property_booking_field": {
                        "name": "booking",
                        "parent": receivedData.property_id
                    }
                }

                console.log("#########Consumer New Hotel Booking", {
                    id: receivedData._id,
                    index: 'hotel_properties_relation',
                    body: bookingData
                })

                let dataSaved = await esClient.index({
                    id: receivedData._id,
                    index: 'hotel_properties_relation',
                    refresh: 'true',
                    routing: 1,
                    body: bookingData
                })

                console.log(dataSaved)
            },
        })

    } catch (err) {
        console.log("Consume Subscription ***********************" + err)
    }
}
