const baseUrl = "https://developer.nps.gov/api/v1/";

const apiKey = import.meta.env.VITE_NPS_API_KEY;

export async function getParkData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const response = await fetch(baseUrl + "parks" + "?parkCode=abli", options);
  // check to make sure the reponse was ok.
  if (response.ok) {
    // convert to JSON
    data = await response.json();
  } else throw new Error("response not ok");
    return data.data[0];
  
}

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok");
  return data;
}

export function getInfoLinks(data) {
  // Why index + 2 below? no real reason. we don't want index 0 since that is the one we used for the banner...I decided to skip an image.
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    item.image = data[index + 2].url;
    return item;
  });
  return withUpdatedImages;
}

export async function getParkAlerts(code) {
  const parkData = await getJson(`alerts?parkCode=${code}`);
  return parkData.data;
}

export async function getParkVisitorCenters(code) {
  const parkData = await getJson(`visitorcenters?parkCode=${code}`);
  return parkData.data;
}