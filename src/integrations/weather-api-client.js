import axios from 'axios';
import {WeatherApiResponse} from './structures/weather-api-response';

/**
 * WeatherApiClient class
 */
export class WeatherApiClient {
  /**
   * Constructor method.
   */
  constructor() {
    this.apiUri = `${
      process.env.WEATHER_API_URI
    }/?key=${
      process.env.WEATHER_API_KEY
    }`;
  }

  /**
     * Get weather data by city
     * @param {String} cityName
     * @return {WeatherApiResponse}
     */
  async getWeatherDataByCity(cityName) {
    const normalizedCity = cityName.normalize(
        'NFD',
    ).replace(/[\u0300-\u036f]/g, '');

    return axios.get(`${this.apiUri}&city_name=${normalizedCity}`)
        .then((result) => {
          const apiResult = result.data.results || {};

          const response = new WeatherApiResponse;

          response.celsiusTemperature = Number(apiResult.temp) || null;
          response.weatherDescription = String(apiResult.description) || null;
          response.weatherDescriptionSlug = String(
              apiResult.condition_slug,
          ) || null;

          return response;
        })
        .catch((err) => {
          throw new Error(`Weather Api Error: ${err.message}`);
        });
  }
}
