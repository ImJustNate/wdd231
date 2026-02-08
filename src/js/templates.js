import spritePath from '../images/sprite.symbol.svg';

export function alertTemplate(alert) {
  let alertType = "";
  // most of the alerts are one word and line up with the icons nicely. "Park Closure" is the exception
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  // note the new path below for the SVG!
  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="${spritePath}#alert-${alertType}"></use>  
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`;
}



export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
  <h4>${center.name}</h4>
  <p>${center.description}</p>
  <p>${center.directionsInfo}</p>
  </li>`;
}

export function activityListTemplate(activities) {
  return activities.map((activity) => `<li>${activity.name}</li>`).join("");
}