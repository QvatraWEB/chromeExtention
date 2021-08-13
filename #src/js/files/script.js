////////////////////// clock
const clockContainer = document.querySelector('.js-clock'),
  clockTitle = clockContainer.querySelector('h1')

function getTime() {
  const date = new Date()
  const minutes = date.getMinutes()
  const hours = date.getHours()
  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
}
////////////////////// clock/

/////////////////// Name
const form = document.querySelector('.js-form'),
  input = form.querySelector('input'),
  greetings = document.querySelector('.js-greetings')
const USER_LS = 'currentUsername',
  SHOWING_ON = 'show'

function saveUsername(text) {
  localStorage.setItem(USER_LS, text)
}

function submitHandler(event) {
  event.preventDefault()
  const inputValue = input.value
  showGreetings(inputValue)
  saveUsername(inputValue)
}

function showGreetings(text) {
  greetings.innerText = `Hi, ${text}`
  greetings.classList.add(SHOWING_ON)
  form.classList.remove(SHOWING_ON)
}

function askUsername() {
  form.classList.add(SHOWING_ON)
  form.addEventListener('submit', submitHandler)
}

function loadUsername() {
  const currentUsername = localStorage.getItem(USER_LS)
  if (currentUsername === null) {
    askUsername()
  } else {
    showGreetings(currentUsername)
  }
}

/////////////////// Name/
/////////////////// ToDo

const toDoForm = document.querySelector('.js-toDo'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList')

const TODOS_LS = 'toDoS'

let toDos = []

function loadToDos() {
  const loaded_todos = localStorage.getItem(TODOS_LS)
  if (loaded_todos !== null) {
    const parsedToDos = JSON.parse(loaded_todos)
    parsedToDos.forEach(function (toDo) {
      showToDos(toDo.name)
    })
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function deleteToDo(event) {
  const btn = event.target
  const li = btn.parentNode
  toDoList.removeChild(li)
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id)
  })
  toDos = cleanToDos
  saveToDos()
}

function showToDos(text) {
  const li = document.createElement('li')
  const delBtn = document.createElement('button')
  const span = document.createElement('span')
  const newId = toDos.length + 1
  delBtn.innerHTML = 'x'
  span.innerText = text
  li.appendChild(delBtn)
  delBtn.addEventListener('click', deleteToDo)
  li.appendChild(span)
  li.id = newId
  toDoList.appendChild(li)
  const toDoObject = {
    name: text,
    id: newId
  }
  toDos.push(toDoObject)
  saveToDos()
}

function submitHandler(event) {
  event.preventDefault()
  const currentValue = toDoInput.value
  showToDos(currentValue)
  toDoInput.value = ""
}

/////////////////// ToDo/
/////////////////// Background

const body = document.querySelector('body')
const IMAGE_NUMBER = 4
function showImage(number) {
  const img = new Image()
  img.src = `img/back/${number + 1}.webp`
  img.classList.add('bgImage')
  body.prepend(img)
}

function getRandom() {
  const number = Math.floor(Math.random() * IMAGE_NUMBER)
  return number
}

/////////////////// bg/
/////////////////// weather
const COORDS_LS = 'coords',
  API_KEY = '1a0118170d7e56b406ef1df59c20cb93',
  cityContainer = document.querySelector('.js-city'),
  tempContainer = document.querySelector('.js-temp'),
  locationIcon = document.querySelector('.weather-icon')


function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=ru`)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const { icon } = json.weather[0]
      const temperature = Math.round(json.main.temp)
      const place = json.name
      cityContainer.innerText = `${place}`
      tempContainer.innerHTML = `${temperature} &deg;`
      locationIcon.innerHTML = `<img src="img/icons/${icon}.webp"></img>`
    })
}

function saveCoords(positionObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(positionObj))
}

function geoSuccessHandler(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const positionObj = {
    latitude,
    longitude
  }
  saveCoords(positionObj)
  getWeather(latitude, longitude)
}

function geoErrorHandler() {
  console.log('Error');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler)

}

function getCoords() {
  const coords = localStorage.getItem(COORDS_LS)
  if (coords === null) {
    askForCoords()
  } else {
    const loadedCoords = JSON.parse(coords)
    getWeather(loadedCoords.latitude, loadedCoords.longitude)
  }
}

/////////////////// weather/
function init() {
  getTime()
  setInterval(getTime, 1000)
  loadUsername()
  loadToDos()
  toDoForm.addEventListener('submit', submitHandler)
  const randomNumber = getRandom()
  showImage(randomNumber)
  getCoords()
}

init();
