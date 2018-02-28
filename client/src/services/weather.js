import axios from 'axios';

export const getWeather = (latitude, longitude) => {
    const url = `/forecast/${latitude},${longitude}`
    return axios.get(url);
}
export const getZipForWeather = (zip) => {
    const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`
    return axios.get(url);
}