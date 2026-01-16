import { getParkData } from "./parkService.mjs";
  // import setHeaderFooter from "./setHeaderFooter.mjs";
  // import { mediaCardTemplate } from "./templates.mjs";

const parkData = getParkData();


const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function setHeaderInfo(data) {
  // insert data into disclaimer section
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;
  // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
  document.querySelector("head > title").textContent = data.fullName;
  // set the banner image
  document.querySelector(".hero").style.backgroundImage = `url(${data.images[0].url})`;
  // use the template function above to set the rest of the park specific info in the header
  document.querySelector(".herotext").innerHTML = parkInfoTemplate(data);
  parkInfoTemplate(data)
}

function getMailingAddress(addresses) {
  return addresses.find(address => address.type === "Mailing");
}

function getVoicePhone(numbers) {
  return numbers.find((phoneNumbers) => phoneNumbers.type === "Voice");
}

function footerTemplate(data) {
  // console.log("info in footerTemplate:", data);
  // console.log("addresses:", data?.contacts.phoneNumbers);

  const mailing = getMailingAddress(data.addresses);
  const voice = getVoicePhone(data.contacts.phoneNumbers)

  // console.log (voice.phoneNumber);
  
  return `<section class="contact">
  <h3>Contact Info</h3>
  <h4>Mailing Address:</h4>
  <div><p>${mailing.line1}<p>
  <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
  <h4>Phone:</h4>
  <p>${voice.phoneNumber}</p>
  </section>`;
}


function linkData(data) 
{
  const infoSection = document.getElementById("info");
  data.forEach(item => {
    infoSection.innerHTML += `
    <section>
      <img src="${item.image}" alt="info-image">
      <h1>${item.name}</h1>
      <p>${item.description}</p>
    </section>
      `;
  });

  document.getElementById("contact").innerHTML += footerTemplate(parkData)
}


function addBlerb(data){
  const blerb = document.getElementById("intro")

  blerb.innerHTML =
  `
    <h3>${data.fullName}</h3>
    <p>${data.description}</p>
  `
}

addBlerb(parkData)
setHeaderInfo(parkData)
linkData(parkInfoLinks);