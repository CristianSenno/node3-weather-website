const request = require("request");

const geocode = (address, callback) => {
    //uso encode per rendere quello che passo safe, alcuni caratteri che vengono passati potrebbero non essere riconosciuti
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY3Jpczg5OTciLCJhIjoiY2txdXJtcHBvMDRtdjJucWgwazF0M3RneiJ9.m5Wd_Tmt8lNhUmgDDP2NWw&limit=1";

    request({ url, json:true}, (error, {body} ) => {
        if(error){
            callback("Unable to connect to location services!", undefined); //potevo anche non mettere undefined che veniva messo come default da js
        } else if(body.features.length === 0){
            
            callback("Unable to find location. Try another search!", undefined);
        } else {

            
           
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = {
    geocode: geocode
};


/* //Geocoding coverte la locazione in coordinate lat/long  //Los%20Angeles
const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY3Jpczg5OTciLCJhIjoiY2txdXJtcHBvMDRtdjJucWgwazF0M3RneiJ9.m5Wd_Tmt8lNhUmgDDP2NWw&limit=1";

request({url: geoUrl, json: true}, (error,response) => {

    if(error){
        console.log("Unable to connect Geocoding service!");
    } else if(response.body.features.lenght === 0){
        console.log("Unable to find Geo Location");
    } else {
        console.log("Longitude: " + response.body.features[0].center[0] + ". Latitude: " + response.body.features[0].center[1]);
    }
    
});*/
