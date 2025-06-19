import axios from 'axios';

export default axios.create({
    baseURL:'',
    params: {
        api_key: process.env.TMDB_API_KEY,
    },
})