import axios from 'axios';

export const getWeather = (latitude, longitude) => {
    const url = `/forecast/${latitude},${longitude}`
    return axios.get(url);
}
export const getZipForWeather = (zip) => {
    const url = `/geocode/${zip}`
    return axios.get(url)
        .then(response => {
            const zipLat = response.data.results[0].geometry.location.lat;
            const zipLong = response.data.results[0].geometry.location.lng;
            return getWeather(zipLat, zipLong);
        })        
        
    }