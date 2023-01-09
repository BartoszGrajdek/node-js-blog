import axios from "axios";
import { API_URL } from "../../config";

export async function getCategoriesList() {
	return axios
		.get(`${API_URL}/categories`, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}

export async function addCategory(data: Object) {
	return axios
		.post(`${API_URL}/categories`, data, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res;
		})
		.catch((err) => {
			return err.response;
		});
}

export async function deleteCategories(ids: Array<string>) {
	return axios
		.delete(`${API_URL}/categories/${ids[0]}`, { headers: { "Access-Control-Allow-Origin": "*" } })
		.then((res) => {
			if (res.status < 300 && res.status > 199) return res;
		})
		.catch((err) => {
			return err.response;
		});
}
