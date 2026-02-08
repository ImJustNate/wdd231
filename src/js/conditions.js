import{getParkData, getParkAlerts, getParkVisitorCenters} from "./parkInfo"  
import {setHeaderFooter} from "./main" 
import { alertTemplate, activityListTemplate, visitorCenterTemplate} from "./templates";



function setAlerts(alerts) {
  console.log(alerts)
  const alertsContainer = document.querySelector(".alerts > ul");
  alertsContainer.innerHTML = "";
  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setVisitorCenters(centers) {
  const alertsContainer = document.querySelector(".visior-services  ul");
  const html = centers.map(visitorCenterTemplate);
  alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivities(activities) {
  const alertsContainer = document.querySelector(".activities  ul");
  alertsContainer.innerHTML = "";
  const html = activityListTemplate(activities);
  alertsContainer.insertAdjacentHTML("beforeend", html);
}

async function initCondtitionsPage() {
  let parkData = await getParkData();
  const alerts = await getParkAlerts(parkData.parkCode); 
  const visitorCenters = await getParkVisitorCenters(parkData.parkCode);


  setHeaderFooter(parkData)
  setAlerts(alerts);
  setVisitorCenters(visitorCenters);
  setActivities(parkData.activities);
}

initCondtitionsPage()
