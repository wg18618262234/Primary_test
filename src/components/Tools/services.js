import Axios from 'axios'

export const getTools = () => {
    return Axios.post('http://10.8.17.35:5000/select',{id:1})
}
