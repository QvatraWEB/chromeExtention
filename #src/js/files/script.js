
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
  SHOWING_CN = 'showing'

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
  const hour = date.getHours()
  if (hour >= 05 && hour < 12) {
    return 'Good morning'
  } if (hour >= 12 && hour < 18) {
    return 'Good day'
  } if (hour >= 18 && hour < 24) {
    return 'Good evening'
  } if (hour >= 00 && hour < 05) {
    return 'Good night'
  }
}

function askUsername() {
  vform.classList.add(SHOWING_CN)
  vform.addEventListener('submit', submitHandlerName)
}
function loadUsername() {
  const currentUsername = localStorage.getItem(USER_LS)
  img.classList.toggle('zi')
  document.querySelector('.js-form').style.zIndex = "101"
  if (currentUsername === null) {
    askUsername()

  } else {
    showGreetings(currentUsername)
  }
}
/////////////////// Name/
const toDoDate = document.querySelector('.js-toDoDate')
let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '.');
toDoDate.innerText = `${utc}`

/////////////////// ToDo

const toDoForm = document.querySelector('.js-toDo'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList'),
  toDoApp = document.querySelector('.todo__app'),
  toDoBtn = document.querySelector('.js-toDoBtn'),
  clickToDoFooter = document.querySelector('.js-todoFooter')

const TODOS_LS = 'toDoS'

let toDos = []

function footerHandlerTODO() {
  toDoApp.classList.toggle(SHOWING_CN)
  toDoInput.classList.remove(SHOWING_CN)
  toDoBtn.classList.add(SHOWING_CN)

}


function clickBtn() {
  toDoBtn.addEventListener('click', clickHandlerTODO)
  toDoForm.addEventListener('submit', submitHandlerTODO)

}

function clickHandlerTODO() {
  toDoBtn.classList.remove(SHOWING_CN)
  toDoInput.classList.add(SHOWING_CN)
  toDoInput.focus()
}

function loadToDos() {
  const loaded_todos = localStorage.getItem(TODOS_LS)
  if (loaded_todos !== null) {
    toDoBtn.classList.add(SHOWING_CN)
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


  span.innerText = text
  delBtn.innerHTML = 'x'
  li.classList.add('li-todo')
  delBtn.classList.add('btn-todo')
  span.classList.add('span-todo')
  li.appendChild(span)
  li.appendChild(delBtn)
  delBtn.addEventListener('click', deleteToDo)
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
}

/////////////////// ToDo/
/////////////////// Background

const body = document.querySelector('body')
const IMAGE_NUMBER = 8
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
  locationIcon = document.querySelector('.weather-icon'),
  lang = 'en'


function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=${lang}`)
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
const focusDiv = document.querySelector('.bot__focus-div')
const i = focusDiv.querySelector('.js-chec')
const delChec = focusDiv.querySelector('span')

function del() {
  delChec.addEventListener('click', deleteFocus)
}






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




const formFocus = document.querySelector('.js-form-focus'),
  inputF = formFocus.querySelector('input'),
  liFocus = document.querySelector('.js-focus-li'),
  askFokus = document.querySelector('.bot__focus'),
  html = document.querySelector('html')
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
  formFocus.style.display = ''
  askFokus.classList.add('zad')
  askFokus.innerText = 'Today\'s goal:'
  i.classList.add(SHOW_CNFO)
  delChec.classList.add(SHOW_CNFO)
}
function deleteFocus() {
  localStorage.removeItem(USER_FOCUS)
  loadFocus()
  askFokus.classList.remove('zad')
  askFokus.innerText = 'What do you want to achieve today?'
  delChec.classList.remove(SHOW_CNFO)
  i.classList.remove(SHOW_CNFO)
  liFocus.classList.remove(SHOW_CNFO)
  inputF.value = ""
  if (i.classList.contains('_icon-checkbox-checked')) {
    i.classList.remove('_icon-checkbox-checked')
    i.classList.add('_icon-checkbox-unchecked')
  }
}

function askFocus() {
  formFocus.classList.add(SHOW_CNFO)
  formFocus.style.display = 'flex'
  formFocus.addEventListener('submit', submitHandlerFocus)
  formFocus.querySelector('.bot__focus-plus').addEventListener('click', submitHandlerFocus)
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
  const randomNumber = getRandom()
  showImage(randomNumber)
  loadUsername()
  getTime()
  setInterval(getTime, 1000)
  loadFocus()
  loadToDos()
  getCoords()
  chec()
  del()
  clickBtn()
  clickToDoFooter.addEventListener('click', footerHandlerTODO)
}

init()
