"use strict"

let userData = {name: "", age: "", gender: "", nationality: ""}
let btn = document.querySelector(".submit-btn")
let user_data = document.querySelectorAll(".user-data")
let data_copy = Array.from(user_data)
let user_name = document.getElementById("user-name")
let error_msg = document.querySelector(".warning")
let data_box = document.querySelector(".data-container") 
let load = document.querySelector(".load")


btn.addEventListener("click", (e) => {
    e.preventDefault()
    if(checkName(user_name)){
        user_name.value = ""
        return
    }
    else {
        prediction()
    }
})

async function prediction() {
    let temp
    userData.name = user_name.value
    loading()
    userData.age = await getAge(userData.name)
    userData.gender = await getGender(userData.name)
    userData.nationality = await (getNationality(userData.name).then(getCountry))
    temp = Object.values(userData)
    user_data.forEach(element => {
        element.textContent = temp[data_copy.indexOf(element)]
    })
    loading()
    user_name.value = ""
}

function getAge(userName) {
    return fetch(`https://api.agify.io?name=${userName}`)
    .then(res => res.json())
    .then(data => {
        if(data.age == null){
            return "??"
        }
        return data.age
    })
    .catch(error => {
        console.log(error)
    })
}

function getGender(userName) {
    return fetch(`https://api.genderize.io?name=${userName}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.gender == "male"){
            return "hombre"
        }
        else if(data.gender == "female") {
            return "mujer"
        }
        else {
            return "??"
        }
    })
    .catch(error => {
        console.log(error)
        return "??"
    })
}

function getNationality(userName) {
    return fetch(`https://api.nationalize.io?name=${userName}`)
    .then(res => res.json())
    .then(data => {
        return data.country[0].country_id
    })
    .catch(error => {
        console.log(error)
        return "??"
    })
}

function getCountry(code) {
    if (code == "??"){
        return code
    }
    return fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then(res => res.json())
    .then(data => {
        return data[0].translations.spa.common
    })
    .catch(error => console.log(error))
}

function checkName(user_name) {
    error_msg.textContent = "" 
    if(user_name.value == "") {
        error_msg.textContent = "Por favor ingrese un nombre"
        return true
    }
    if(/\s/g.test(user_name.value)) {
        error_msg.textContent = "Ingrese solo el primer nombre"
        return true
    }
    if (/\d/.test(user_name.value)) {
        error_msg.textContent = "El nombre no debe contener números"
        return true
    }
    if(!(/[a-zA-Z]+[\W]+[a-zA-Z]/).test(user_name.value) && /\W/.test(user_name.value)) {
        error_msg.textContent = "El nombre no debe contener caracteres especiales"
        return true
    }
}

function loading() {
    if (data_box.classList.contains("hide")){
        data_box.classList.remove("hide")
    }
    else{
        data_box.classList.add("hide")
    }
    if(load.classList.contains("hide")){
        load.classList.remove("hide")
    }
    else{
        load.classList.add("hide")
    }
}