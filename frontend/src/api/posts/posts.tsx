import axios from "axios";
import { API_URL } from "../../config";

export async function getPostsList() {
	return axios
		.get(`${API_URL}/posts`, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}
