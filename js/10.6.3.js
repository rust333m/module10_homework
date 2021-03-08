// const btnSend = document.querySelector('.j-btn');

// const output = document.getElementById('#output');

// let websocket;

// const wsUri = "wss://echo.websocket.org/";

// function writeToScreen(message) {
//   let pre = document.createElement("p");
//   pre.style.wordWrap = "break-word";
//   pre.innerHTML = message;
//   output.appendChild(pre);
// }

// btnSend.addEventListener('click', () => {
//   const inpuText = document.querySelector("input").value;
//   websocket = new WebSocket(wsUri);
//   websocket.onmessage = function (e) {
//     writeToScreen(
//       '<span style="color: blue;">' + e.data + '</span>'
//     );
//   };
//   writeToScreen(inpuText);
//   websocket.send(inpuText);
// })



const wsUri = "wss://echo.websocket.org/";
const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "59aaed6f10d8ae0565183dd571a3b596";

function pageLoaded() {

  const chatOutput = document.querySelector('.output');
  const input = document.querySelector('input');
  const sendBtn = document.querySelector('.j-btn');
  const sendGeo = document.querySelector('.j-btn-geo')

  let socket = new WebSocket(wsUri);

  socket.onopen = () => {
    console.log("Соединение установлено");
  }

  socket.onmessage = (event) => {
    writeToChat(event.data, true)
  }
  socket.onerror = () => {
    console.log("При передаче данных произошла ошибка");
  }

  sendBtn.addEventListener('click', sendMessage);
  sendGeo.addEventListener("click", getLocation);

  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }

  function writeToChat(message, isReceived) {
    let messageHTML = `<div class="${isReceived ? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }
    else {
      let messageHTML = `<div class="recieved">В вашем браузере недоступна возможность определения местоположения</div>`
      chatOutput.innerHTML += messageHTML;
    }
  }
  function locationSuccess(data) {
    let coords = [data.coords.longitude, data.coords.latitude];
    let url = formatURL(coords);
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let outputText = formatOutput(data);
        let messageHTML = `<div class="recieved">${outputText}</div>`
        chatOutput.innerHTML += messageHTML;
      })
  }
  function locationError() {
    let messageHTML = `<div class="recieved">При определении местоположения произошла ошибка</div>`
    chatOutput.innerHTML += messageHTML;
  }
  function formatURL(coords) {
    let url = new URL(apiURL);
    url.searchParams.set("lat", coords[1]);
    url.searchParams.set("lon", coords[0]);
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", "metric");
    url.searchParams.set("lang", "ru");
    return url;
  }
  function formatOutput(data) {
    console.log(data);
    let html = `
      <p>Город: ${data.name}</p>
    `;
    return html;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);


