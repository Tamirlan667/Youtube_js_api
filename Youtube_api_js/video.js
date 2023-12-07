window.onload = () => {
  // fetch data from LS
  let video = JSON.parse(localStorage.getItem("video")) || [];
  displayVideos(video);
};

let displayVideos = (data) => {
  console.log(data);
  if (!data) return;
  let iframe = document.querySelector("iframe");
  iframe.src = `https://www.youtube.com/embed/${data.id}`;

  let title = document.querySelector("h3");
  title.innerText = data.snippet.title;

  // let views = document.querySelector("#views");
  // views.innerText = "6,120,767 views • Oct 17, 2021";

  const video = `<img src="${data.snippet.channelLogo}" alt="${data.snippet.title}" />
              <div>
                <p>${data.snippet.channelTitle}</p>
                <span>19.4K subscribers</span>
              </div>
              <button id="subscribeButton" type="button">Subscribe</button>`;
  let channel = document.querySelector(".owner");
  channel.innerHTML += video;
  // if (!data) return;
  // let iframe = document.querySelector("iframe");
  // iframe.src = `https://www.youtube.com/embed/${data.id}`;

  // let title = document.querySelector("#title");
  // title.innerText = data.snippet.title;

  // let views = document.querySelector("#views");
  // views.innerText = "6,120,767 views • Oct 17, 2021";
};
// document.addEventListener("DOMContentLoaded", function () {
//   var subscribeButton = document.getElementById("subscribeButton");

//   subscribeButton.addEventListener("click", function () {
//     // Переключаем класс clicked при каждом клике
//     subscribeButton.classList.toggle("clicked");

//     // Получаем текущий текст кнопки
//     var buttonText = subscribeButton.innerText;

//     // Меняем текст и цвет в зависимости от наличия класса clicked
//     if (subscribeButton.classList.contains("clicked")) {
//       subscribeButton.innerText = "Unsubscribe";
//     } else {
//       subscribeButton.innerText = "Subscribe";
//     }
//   });
// });
