import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});
http.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Language"] = localStorage.getItem("lang");
    config.headers["Accept"] = "application/json";
    // 'resolve.fallback: { "http": require.resolve("stream-http") }'
    // resolve.fallback: { "http": false }

    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Content-Type"] = "multipart/form-data";
    // config.headers['Content-Type'] = "application/json"
    return config;
  },
  (error) => Promise.reject(error)
);
// http.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       router.push("/login").then();
//       localStorage.clear();
//     }
//     return Promise.reject(error);
//   }
// );
export default http;
