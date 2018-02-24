import axios from 'axios';

export const getWeather = (latitude, longitude) => {
    const url = `/forecast/${latitude},${longitude}`
    return axios.get(url);
}