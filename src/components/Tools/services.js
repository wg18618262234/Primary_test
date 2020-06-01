import axios from 'axios'
const path = 'http://192.168.31.174:5000'

export async function getTools() {
    try {
        const response = await axios.get(`${path}/get_tools`);
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function insertTools(data) {
    try {
        const response = await axios.post(`${path}/insert_tools`, data);
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function deleteTools(data) {
    try {
        const response = await axios.post(`${path}/delete_tools`, data);
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function updateTools(data) {
    try {
        const response = await axios.post(`${path}/update_tools`, data);
        return response
    } catch (error) {
        console.error(error);
    }
}