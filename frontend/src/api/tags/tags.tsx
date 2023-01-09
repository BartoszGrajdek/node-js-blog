import axios from "axios";
import { API_URL } from "../../config";

export async function getTagsList() {
	return axios
		.get(`${API_URL}/tags`, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}

export async function addTag(data: Object) {
	return axios
		.post(`${API_URL}/tags`, data, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res;
		})
		.catch((err) => {
			return err.response;
		});
}

export async function updateTag(data: Object, id: string) {
	return axios
		.put(`${API_URL}/tags/${id}`, data, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res;
		})
		.catch((err) => {
			return err.response;
		});
}

export async function deleteTags(ids: Array<string>) {
	return axios
		.delete(`${API_URL}/tags/${ids[0]}`, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res;
		})
		.catch((err) => {
			return err.response;
		});
}
