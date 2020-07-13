const axios = require('axios');

const badConditionsSlugs = [
    'storm', 'snow', 'hail', 'rain', 'fog', 'cloud', 'cloudly_day', 'cloudly_night'
];

const tempReferences = {
    cold: 18,
    hot: 30
};

const suggestions = {
    coldSun: 'Gostaria de tomar um chocolate quente?',
    hotSun: 'Gostaria de ir à praia?',
    hotRainy: 'Gostaria de tomar um sorvete?',
    normalSun: 'Gostaria de fazer alguma atividade ao livre?',
    normalRainy: 'Gostaria de assistir um filme?'
};

class WeatherApiClient {
    constructor() {
        this.apiUri = `${process.env.WEATHER_API_URI}/?key=${process.env.WEATHER_API_KEY}`;
    }

    buildResponseByTempAndConditionSlug(temp, conditionSlug) {
        if (temp <= tempReferences.cold) {
            return suggestions.coldSun;
        }

        if (temp > tempReferences.cold && temp < tempReferences.hot) {
            if (badConditionsSlugs.includes(conditionSlug)) {
                return suggestions.normalRainy;
            }
            return suggestions.normalSun;
        }

        if (temp >= tempReferences.hot) {
            if (badConditionsSlugs.includes(conditionSlug)) {
                return suggestions.hotRainy;
            }
            return suggestions.hotSun;
        }

        return '';
    }

    async getWeatherDataByCity(cityName) {
        const weatherData = {
            temp: '?',
            condition: '?',
            suggestion: '?'
        };

        const normalizedCity = cityName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        return await axios.get(`${this.apiUri}&city_name=${normalizedCity}`)
            .then(result => {
                if (!result.data.results) {
                    return weatherData;
                }

                const apiResult = result.data.results;

                if (!apiResult.temp || !apiResult.condition_slug || !apiResult.description) {
                    return weatherData;
                }

                weatherData.temp = apiResult.temp;
                weatherData.condition = apiResult.description;
                weatherData.suggestion = this.buildResponseByTempAndConditionSlug(
                    apiResult.temp,
                    apiResult.condition_slug
                );

                return weatherData;
            })
            .catch(() => (weatherData));
    }
}

module.exports = WeatherApiClient;