const esClient = require('./../db/elastic-search')

//Simple version, without validation or sanitation
exports.health = function (req, res) {
    res.send('Up and running!');
};

exports.getAllProperties = async function (req, res) {
    const { name } = req.body;

    let searchQueryString = { index: 'hotel_properties_relation' };

    if (name !== undefined) {
        searchQueryString.body = {
            query: {
                match: { name }
            }
        }
    }

    // console.log(searchQueryString)

    const response = await esClient.search(searchQueryString)

    // console.log(response)

    // for (const hotel of response.hits.hits) {
    //     // console.log('Hotel:', hotel);
    // }

    return res.send(response.body.hits.hits);
};

exports.getAllAvailableProperties = async function (req, res) {
    const { check_in_date, check_out_date } = req.body;

    let bookedQueryString = { index: 'hotel_properties_relation' };

    if (check_in_date !== undefined && check_out_date !== undefined) {
        bookedQueryString.body = {
            "query": {
                "has_child": {
                    "type": "booking",
                    "query": {
                        "bool": {
                            "must": {
                                "range": {
                                    "check_in_date": {
                                        "gte": check_in_date,
                                        "lte": check_out_date
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        console.log(JSON.stringify(bookedQueryString.body))
    }

    const bookedPropertyResponse = await esClient.search(bookedQueryString)

    bookedProperties = []
    bookedPropertyResponse.body.hits.hits.forEach(element => {
        bookedProperties.push(element._id)
    });

    console.log("bookedProperties" + bookedProperties)

    let allQueryString = { index: 'hotel_properties_relation', size: 100 };

    if (check_in_date !== undefined && check_out_date !== undefined) {
        allQueryString.body = {
            "query": {
                "match_all": {}
            }
        }
    }

    const allPropertiesResponse = await esClient.search(allQueryString)
    allProperties = allPropertiesResponse.body.hits.hits;

    availableProperties = [];
    allProperties.forEach(element => {
        if (!bookedProperties.includes(element._id) && element._source.property_booking_field.name == "property") {
            availableProperties.push(element)
        }
    });


    return res.send(availableProperties);
};