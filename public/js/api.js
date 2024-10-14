function api(uri) {
  var URL = "https://api.themoviedb.org/3";
  var myHeaders = new Headers();
  var init = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default"
  };
  const searchParams = new URLSearchParams("api_key=9c7629cb4cbd5071109b531eab4f8753");
  fetch(URL + uri + "?" + searchParams, init).then(function (response) {
    return response.json();
  });
  return {};
}
module.exports = api;