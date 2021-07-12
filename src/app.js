const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forescast = require("./utils/forecast")

const app = express() //per generare l'applicazione
const port = process.env.PORT || 3000 //setto la porta che usa heroku, in heroku prende la prima mentre il locale la seconda

const publicDirPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partial")

//attivo hbs su express
app.set("view engine", "hbs")
app.set("views", viewPath) //con questa dico ad express in quale cartella sono i template
hbs.registerPartials(partialPath) //configuro hbs per trovare i partial

//setup static directory to serve
app.use(express.static(publicDirPath))

//gestisce le rotte
app.get("", (req, res) => {
    
    res.render("index", {
        title: "Weather app",
        name: "Cristian Senno"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Cristian Senno"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help page",
        message: "If you need help, please contact Manu",
        name: "Cristian Senno"
    })
})

/* 
app.get("/help", (req, res) => {
   //invia il contenuto come risposta 
    res.send({ 
        name: "Cri",
        age: 23
    })
})


app.get("/about", (req, res) => {
    res.send("<h1>About page!</h1>")
}) */

app.get("/weather", (req, res) => { 

    if(!req.query.address){
        return res.send({
            errorMsg: "You must provide an address"
        })
    }

    geocode.geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                errorMsg: error
            })
        }

        forescast.forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    errorMsg: error
                }) 
            }

            res.send({
                location: location,
                data: forecastData
            })
        })
    })

})

app.get("/products", (req, res) => {

    if(!req.query.search){
       return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query)

    res.send({
        product: []
    })
})

app.get("/help/*", (req, res) => { 
    res.render("error", {
        title: "404",
        name: "Cristian Senno",
        errorMsg: "Help article not found!"
    })
})



app.get("*", (req, res) => { 
    res.render("error", {
        title: "404",
        name: "Cristian Senno",
        errorMsg: "Page not found"
    })
})

//start the server
app.listen(port, () => {
    console.log("Express server is up on port " + port)
})