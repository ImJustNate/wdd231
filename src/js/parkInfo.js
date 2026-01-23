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
