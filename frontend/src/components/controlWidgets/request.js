import { defaultViewport, host, namesCities, foods, drinks, foodDrinks } from "../../consts/consts.js";

let fetchSentiment = (start_time, end_time, wl, setfunc) => {
  fetch(host + "/api/tweets/keywords", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "specify_time": 1,
      "start_time": start_time,
      "end_time": end_time,
      "keywords": wl,
      "returnSentiment": "true",
    })
  })
  .then(rp =>
    rp.json()
  )
  .then(res => {
    // weeklyd = res["content"];
    let w = res["content"];
    // weekly1 = w;
    // wwcc = w;
    console.log(w);
    // console.log(res["content"]);
    // setWeeklyd(w);
    setfunc(w);
  })
}

let fetchCount = (start_time, end_time, wl, setfunc) => {
  fetch(host + "/api/tweets/keywords", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "specify_time": 1,
      "start_time": start_time,
      "end_time": end_time,
      "keywords": wl,
      "returnSentiment": "false",
    })
  })
  .then(rp =>
    rp.json()
  )
  .then(res => {
    // weeklyd = res["content"];
    let w = res["content"];
    // weekly1 = w;
    // wwcc = w;
    console.log(w);
    // console.log(res["content"]);
    // setWeeklyd(w);
    setfunc(w);
  })
}

export {fetchSentiment, fetchCount}