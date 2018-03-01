import axios from 'axios';

export const getWeather = (latitude, longitude) => {
    const url = `/forecast/${latitude},${longitude}`
    return axios.get(url);
}
export const getZipForWeather = (zip) => {
    const url = `/geocode/json?address=${zip}`
    return axios.get(url);
}