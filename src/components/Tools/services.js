import axios from 'axios'

export async function getTools() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/get_tools');
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function insertTools() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/insert_tools');
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function deleteTools() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/delete_tools');
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function updateTools() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/update_tools');
        return response
    } catch (error) {
        console.error(error);
    }
}