import {WeatherData} from './structures/weather-data';
import {WeatherApiClient} from '../integrations/weather-api-client';

/**
 * WeatherService class
 */
export class WeatherService {
  /**
   * @property {Object}
   */
  suggestions = {
    coldSun: 'Gostaria de tomar um chocolate quente?',
    hotSun: 'Gostaria de ir à praia?',
    hotRainy: 'Gostaria de tomar um sorvete?',
    normalSun: 'Gostaria de fazer alguma atividade ao livre?',
    normalRainy: 'Gostaria de assistir um filme?',
  };

  /**
   * @property {Object}
   */
  tempReferences = {
    cold: 18,
    hot: 30,
  };

  /**
   * @property {Object}
   */
  badConditionsSlugs = [
    'storm',
    'snow',
    'hail',
    'rain',
    'fog',
    'cloud',
    'cloudly_day',
    'cloudly_night',
  ];

  /**
     * Get weather data from an external API
     * @param {String} cityName
     * @return {Promise<WeatherData>}
     */
  async getWeatherDataByCity(cityName) {
    const client = new WeatherApiClient;

    return client.getWeatherDataByCity(cityName)
        .then((result) => this.buildWeatherData(result))
        .catch((err) => this.buildDefaultWeatherData(err.message));
  }

  /**
     * Build weatherData response
     * @param {WeatherApiResponse} weatherApiResponse
     * @return {WeatherData}
     */
  buildWeatherData(weatherApiResponse) {
    const weatherData = this.buildDefaultWeatherData();

    if (weatherApiResponse.weatherDescription) {
      weatherData.condition = weatherApiResponse.weatherDescription;
    }

    if (weatherApiResponse.celsiusTemperature) {
      weatherData.celsiusTemperature = String(
          weatherApiResponse.celsiusTemperature,
      );

      if (weatherApiResponse.weatherDescriptionSlug) {
        weatherData.suggestion = this.getSuggestionBy(
            weatherApiResponse.celsiusTemperature,
            weatherApiResponse.weatherDescriptionSlug,
        );
      }
    }

    return weatherData;
  }

  /**
     * Build a default WeatherData with an error message if necessary
     * @param {String} errorMessage
     * @return {WeatherData}
     */
  buildDefaultWeatherData(errorMessage) {
    const weatherData = new WeatherData;

    weatherData.celsiusTemperature = '?';
    weatherData.condition = '?';
    weatherData.suggestion = '?';
    weatherData.errorMessage = errorMessage || '';

    return weatherData;
  }

  /**
     * Get Suggestion By celsiusTemperature and weatherDescriptionSlug
     * @param {Number} celsiusTemperature
     * @param {String} weatherDescriptionSlug
     * @return {String}
     */
  getSuggestionBy(celsiusTemperature, weatherDescriptionSlug) {
    if (celsiusTemperature <= this.tempReferences.cold) {
      return this.suggestions.coldSun;
    }

    if (
      celsiusTemperature > this.tempReferences.cold &&
            celsiusTemperature < this.tempReferences.hot
    ) {
      if (this.badConditionsSlugs.includes(weatherDescriptionSlug)) {
        return this.suggestions.normalRainy;
      }
      return this.suggestions.normalSun;
    }

    if (celsiusTemperature >= this.tempReferences.hot) {
      if (this.badConditionsSlugs.includes(weatherDescriptionSlug)) {
        return this.suggestions.hotRainy;
      }
      return this.suggestions.hotSun;
    }

    return '?';
  }
}
