
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
const vform = document.querySelector('.js-form'),
  vinput = vform.querySelector('input'),
  greetings = document.querySelector('.js-greetings')
const USER_LS = 'currentUsername',
  SHOWING_CN = 'show'

function saveUsername(text) {
  localStorage.setItem(USER_LS, text)
}

function submitHandlerName(event) {
  event.preventDefault()
  const inputValue = vinput.value
  showGreetings(inputValue)
  saveUsername(inputValue)
}

function showGreetings(text) {
  greetings.innerText = `${timeForGreeting()}, ${text}.`
  greetings.classList.add(SHOWING_CN)
  vform.classList.remove(SHOWING_CN)
  img.classList.toggle('zi')
}

function timeForGreeting() {
  const date = new Date()
  const hours = date.getHours()
  if (hours <= 11 && hours >= 06) {
    return 'Доброе утро'
  } if (hours > 11 && hours < 19) {
    return 'Добрый день'
  } if (hours >= 19 && hours < 00) {
    return 'Добрый вечер'
  } if (hours >= 00 && hours < 06) {
    return 'Хорошей ночи'
  }
}

function askUsername() {
  vform.classList.add(SHOWING_CN)
  vform.addEventListener('submit', submitHandlerName)
}
function loadUsername() {
  const currentUsername = localStorage.getItem(USER_LS)
  /* document.querySelector('.wrapper').style.visibility = 'hidden'
  document.querySelector('.js-form').style.visibility = 'visible' */
  img.classList.toggle('zi')
  document.querySelector('.js-form').style.zIndex = "101"
  if (currentUsername === null) {
    askUsername()

  } else {
    showGreetings(currentUsername)
  }
}
const focusDiv = document.querySelector('.bot__focus-div')
const i = focusDiv.querySelector('.js-chec')

function removeChec() {
  if (i.classList.contains("_icon-checkbox-unchecked")) {
    i.classList.remove('_icon-checkbox-unchecked')
    i.classList.add('_icon-checkbox-checked')
  } else {
    i.classList.remove('_icon-checkbox-checked')
    i.classList.add('_icon-checkbox-unchecked')
  }

}

function chec() {

  i.addEventListener('click', removeChec)
}

/////////////////// Name/
/////////////////// ToDo

/* const toDoForm = document.querySelector('.js-toDo'),
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

function submitHandlerTODO(event) {
  event.preventDefault()
  const currentValue = toDoInput.value
  showToDos(currentValue)
  toDoInput.value = ""
} */

/////////////////// ToDo/
/////////////////// Background

const body = document.querySelector('body')
const IMAGE_NUMBER = 4
const img = new Image()
function showImage(number) {
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

const formFocus = document.querySelector('.js-form-focus'),
  inputF = formFocus.querySelector('input'),
  liFocus = document.querySelector('.js-focus-li'),
  askFokus = document.querySelector('.bot__focus')
const USER_FOCUS = 'current',
  SHOW_CNFO = 'showing'

function saveFocus(text) {
  localStorage.setItem(USER_FOCUS, text)
}

function submitHandlerFocus(event) {
  event.preventDefault()
  const inputFocus = inputF.value
  showFocus(inputFocus)
  saveFocus(inputFocus)
}

function showFocus(text) {
  liFocus.innerText = text
  liFocus.classList.add(SHOW_CNFO)
  formFocus.classList.remove(SHOW_CNFO)
  askFokus.classList.add('zad')
  askFokus.innerText = 'Задания на сегодня:'
}

function askFocus() {
  formFocus.classList.add(SHOW_CNFO)
  formFocus.addEventListener('submit', submitHandlerFocus)
}

function loadFocus() {
  const currentFok = localStorage.getItem(USER_FOCUS)
  if (currentFok === null) {
    askFocus()
  } else {
    showFocus(currentFok)
  }
}

function init() {
  loadUsername()
  getTime()
  setInterval(getTime, 1000)
  loadFocus()
  /* loadToDos()
  toDoForm.addEventListener('submit', submitHandlerTODO) */
  const randomNumber = getRandom()
  showImage(randomNumber)
  getCoords()
  chec()
}

init();
