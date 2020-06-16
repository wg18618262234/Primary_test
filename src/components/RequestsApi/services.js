import axios from 'axios'
const path = 'http://primary-tools-admin.gh.test'
// const path = 'http://10.8.18.37:3000'

export async function curl_request(data) {
    try {
        const response = await axios.post(`${path}/batch`,data);
        return response
    } catch (error) {
        console.error(error);
    }
}