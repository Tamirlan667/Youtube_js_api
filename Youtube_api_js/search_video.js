window.onload = () => {
  // fetch data from LS
  let video = JSON.parse(localStorage.getItem("video_search")) || [];
  displayVideos(video);
};

let displayVideos = (data) => {
  console.log(data);
  if (!data) return;
  let iframe = document.querySelector("iframe");
  iframe.src = `https://www.youtube.com/embed/${data.id.videoId}`;

  let title = document.querySelector("h3");
  title.innerText = data.snippet.title;

  // let views = document.querySelector("#views");
  // views.innerText = "6,120,767 views • Oct 17, 2021";

  const video = `<img src="https://yt3.ggpht.com/ytc/APkrFKZy-QRhSq-CCg77oQfSUQV8Nxe40XlH9Eb6J2LsgmI=s88-c-k-c0x00ffffff-no-rj" alt="${data.snippet.title}" />
                <div>
                  <p>${data.snippet.channelTitle}</p>
                  <span>19.4K subscribers</span>
                </div>
                <button type="button">Subscribe</button>`;
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
