import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

// insert data into disclaimer section
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;
// update the title of the site. Notice that we can select things in the head just like in the body with querySelector
document.querySelector("head > title").textContent = parkData.fullName;
// set the banner image
document.querySelector(".hero-banner > img").src = parkData.images[0].url;
// use the template function above to set the rest of the park specific info in the header
document.querySelector(".hero-banner__content").innerHTML =
  parkInfoTemplate(parkData);