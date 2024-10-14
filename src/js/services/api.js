function api() {
  const URL = `https://api.themoviedb.org/3`;

  async function request(path, requestParams) {
    try {
      const init = {
        mode: "cors",
        cache: "default",
        ...requestParams,
      };
      const searchParams = new URLSearchParams({
        api_key: "9c7629cb4cbd5071109b531eab4f8753",
        ...requestParams.query,
      });

      const values = await fetch(`${URL}${path}?${searchParams}`, init).then(function (response) {
        return response.json();
      });

      return values;
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  async function get(path, param = {}) {
    const new_params = { method: "GET", ...param };
    return await request(path, new_params);
  }

  async function post(path, body, param = {}) {
    const new_params = { method: "POST", ...param };
    return await request(path, { ...new_params, body });
  }

  return {
    get,
    post,
  };
}
export default api();
