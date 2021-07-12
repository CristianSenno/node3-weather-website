

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (event) => {
    
    event.preventDefault();//blocca il comportamento di submit

    const location = search.value

    messageOne.textContent = "Loading weather forecasts..."
    messageTwo.textContent = ""
 
    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(data.errorMsg){
            messageOne.textContent = data.errorMsg
        }else {
            messageOne.textContent = ""
            messageTwo.textContent = data.location + " " + data.data
        }

    })
})
    
})