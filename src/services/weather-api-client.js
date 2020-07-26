import axios from 'axios';
import { WeatherData } from './structures/weather-data';
import { WeatherApiResponse } from '../integrations/structures/weather-api-response';

export class WeatherApiClient {
    constructor() {
        this.suggestions = {
            coldSun: 'Gostaria de tomar um chocolate quente?',
            hotSun: 'Gostaria de ir à praia?',
            hotRainy: 'Gostaria de tomar um sorvete?',
            normalSun: 'Gostaria de fazer alguma atividade ao livre?',
            normalRainy: 'Gostaria de assistir um filme?'
        };

        this.tempReferences = {
            cold: 18,
            hot: 30
        };

        this.badConditionsSlugs = [
            'storm',
            'snow',
            'hail',
            'rain',
            'fog',
            'cloud',
            'cloudly_day',
            'cloudly_night'
        ];
    }

    /**
     * Build weatherData response
     * @param {WeatherApiResponse} weatherApiResponse
     */
    buildWeatherData(weatherApiResponse) {
        const response = new WeatherData;

        response.celsiusTemperature = String(weatherApiResponse.celsiusTemperature) || '?';
        response.condition = weatherApiResponse.weatherDescription || '?';
        response.suggestion = this.getSuggestionBy(
            weatherApiResponse.celsiusTemperature,
            weatherApiResponse.weatherDescriptionSlug
        );

        return response;
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
