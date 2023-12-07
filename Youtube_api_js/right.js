const rightsidebar = document.querySelector(".right-sidebar");
const overview = document.querySelector(".overview");
const overviewLeft = document.querySelector(".overview__background--left");
const overviewLeftButton = document.querySelector(".overview__left");
const overviewRight = document.querySelector(".overview__background--right");
const overviewRightButton = document.querySelector(".overview__right");
const overviewWrapper = document.querySelectorAll(".overview__wrapper");

const menuBtn = document.querySelector(".header__menu");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

const api_key = "AIzaSyAn8h71VOzmap8ve9kxoCHqKoE_T79ADD8";
const video_url = "https://www.googleapis.com/youtube/v3/videos?";
const channel_url = "https://www.googleapis.com/youtube/v3/channels?";

async function getVideo() {
  const video = await fetch(
    video_url +
      new URLSearchParams({
        key: api_key,
        part: "snippet, statistics, contentDetails",
        chart: "mostPopular",
        maxResults: 10,
        regionCode: "US",
      })
  );

  const data = await video.json();
  console.log(data);
  data.items.forEach((item) => {
    // Video Date
    let now = new Date();
    let videoDate = new Date(item.snippet.publishedAt);

    let ms = now - videoDate;
    let second = ms / 1000;
    let minute = second / 60;
    let hour = minute / 60;
    let day = hour / 24;
    let month = day / 30;
    let year = month / 12;

    if (second < 60) {
      item.snippet.publishedAt = `${Math.floor(second)} seconds ago`;
    } else if (minute < 60) {
      if (minute < 2) {
        item.snippet.publishedAt = `${Math.floor(minute)} minute ago`;
      } else {
        item.snippet.publishedAt = `${Math.floor(minute)} minutes ago`;
      }
    } else if (hour < 24) {
      if (hour < 2) {
        item.snippet.publishedAt = `${Math.floor(hour)} hour ago`;
      } else {
        item.snippet.publishedAt = `${Math.floor(hour)} hours ago`;
      }
    } else if (day < 30) {
      if (day < 2) {
        item.snippet.publishedAt = `${Math.floor(day)} day ago`;
      } else {
        item.snippet.publishedAt = `${Math.floor(day)} days ago`;
      }
    } else if (month < 12) {
      if (month < 2) {
        item.snippet.publishedAt = `${Math.floor(month)} month ago`;
      } else {
        item.snippet.publishedAt = `${Math.floor(month)} months ago`;
      }
    } else if (year >= 1) {
      if (year < 2) {
        item.snippet.publishedAt = `${Math.floor(year)} year ago`;
      } else {
        item.snippet.publishedAt = `${Math.floor(year)} years ago`;
      }
    }

    // Video Views
    if (
      item.statistics.viewCount > 999 &&
      item.statistics.viewCount < 1000000
    ) {
      item.statistics.Count =
        convertToInternationalCurrencySystem(item.statistics.viewCount)
          .substring(0, 3)
          .replace(".", "") + "K";
    } else if (
      item.statistics.viewCount > 1000000 &&
      item.statistics.viewCount < 1000000000
    ) {
      item.statistics.Count =
        convertToInternationalCurrencySystem(item.statistics.viewCount)
          .substring(0, 3)
          .replace(".0", "") + "M";
    } else {
      item.statistics.Count =
        convertToInternationalCurrencySystem(
          item.statistics.viewCount
        ).substring(0, 3) + "B";
    }

    // Video Duration
    item.contentDetails.duration = converTime(item.contentDetails.duration);
    getChannel(item);
  });
}

// Video id'e göre bilgiler alnıp thumbnail video'ya ekleniyor
async function getChannel(video) {
  const channel = await fetch(
    channel_url +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video.snippet.channelId,
      })
  );

  const data = await channel.json();
  video.snippet.channelLogo = data.items[0].snippet.thumbnails.default.url;
  createVideo(video);
}

function converTime(d) {
  //ignore the "PT" part
  d = d.search(/PT/i) > -1 ? d.slice(2) : d;
  let h, m, s;
  //indexes of the letters h, m, s in the duration
  let hIndex = d.search(/h/i),
    mIndex = d.search(/m/i),
    sIndex = d.search(/s/i);
  //is h, m, s inside the duration
  let dContainsH = hIndex > -1,
    dContainsM = mIndex > -1,
    dContainsS = sIndex > -1;
  //setting h, m, s
  h = dContainsH ? d.slice(0, hIndex) + ":" : "";
  m = dContainsM
    ? d.slice(dContainsH ? hIndex + 1 : 0, mIndex)
    : dContainsH
    ? "0"
    : "0";
  s = dContainsS ? d.slice(dContainsM ? mIndex + 1 : hIndex + 1, sIndex) : "0";
  //adding 0 before m or s
  s = (dContainsM || dContainsS) && s < 10 ? "0" + s : s;
  m = (dContainsH || dContainsM) && m < 10 ? "0" + m + ":" : m + ":";
  return d !== "0S" ? h + m + s : "LIVE";
}

// gelen sayının karşılığını döndürür
function convertToInternationalCurrencySystem(count) {
  // Nine Zeroes for Billions
  return Math.abs(Number(count)) >= 1.0e9
    ? (Math.abs(Number(count)) / 1.0e9).toFixed(3) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(count)) >= 1.0e6
    ? (Math.abs(Number(count)) / 1.0e6).toFixed(3) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(count)) >= 1.0e3
    ? (Math.abs(Number(count)) / 1.0e3).toFixed(3) + "K"
    : Math.abs(Number(count));
}
// Video oluşturma
function createVideo(data) {
  const video = `
  <div class="side-video-list"> <img src="${data.snippet.thumbnails.medium.url}" alt="" srcset=""/>
<div class="vid-info">
  <a href="">${data.snippet.channelTitle}</a>
  <p>${data.snippet.title}/p>
  <p>${data.statistics.Count}</p>
</div></div>
    `;
  console.log(video);
  const videoGroup = document.createElement("div");
  videoGroup.innerHTML += video;
  videoGroup.addEventListener("click", () => {
    // You can customize this part to define what happens when a video is clicked
    // For now, let's just log the video's title to the console
    saveVideo(data);
  });
  rightsidebar.appendChild(videoGroup);
}
let saveVideo = (element) => {
  localStorage.setItem("video", JSON.stringify(element));
  window.location.href = "./video.html";
};
getVideo();
