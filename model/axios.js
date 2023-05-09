import axios from "axios";

const Axios = axios.create({
	baseURL: "https://api.weatherapi.com/v1",
});

// Add a request interceptor
Axios.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
Axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	},
);

export default Axios;
