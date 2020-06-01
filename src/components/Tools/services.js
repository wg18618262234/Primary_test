import axios from 'axios'

export async function getTools() {
    try {
        const response = await axios.get('http://10.8.17.142:5000/get_tools');
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function insertTools(data) {
    try {
        const response = await axios.post('http://10.8.17.142:5000/insert_tools', data);
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function deleteTools(data) {
    try {
        const response = await axios.post('http://10.8.17.142:5000/delete_tools',data);
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function updateTools(data) {
    try {
        const response = await axios.post('http://10.8.17.142:5000/update_tools', data);
        return response
    } catch (error) {
        console.error(error);
    }
}