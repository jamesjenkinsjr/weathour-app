import clearDay from './clear-day.svg';
import clearNight from './clear-night.svg';
import cloudy from './cloudy.svg';
import partlyCloudyDay from './partly-cloudy-day.svg';
import partlyCloudyNight from './partly-cloudy-night.svg';
import rain from './rain.svg';
import sleet from './sleet.svg';
import snow from './snow.svg';
import wind from './wind.svg';
import fog from './fog.svg';
import notAvailable from './not-available.svg';

export const selection = (name) => {
    switch(name) {
        case 'rain': 
            return rain;
        case 'clear-night':
            return clearNight;
        case 'clear-day':
            return clearDay;
        case 'snow':
            return snow;
        case 'sleet':
            return sleet;
        case 'wind':
            return wind;
        case 'fog':
            return fog;
        case 'cloudy':
            return cloudy;
        case 'partly-cloudy-day':
            return partlyCloudyDay;
        case 'partly-cloudy-night':
            return partlyCloudyNight;
        default:
            return notAvailable;
    }
}
