// Widget de Clima usando Open-Meteo API (Gratuita, sin API key)
// Documentación: https://open-meteo.com/

// Configuración - Buenos Aires, Argentina por defecto
const WEATHER_CONFIG = {
  latitude: -34.6037,  // Buenos Aires
  longitude: -58.3816,
  timezone: 'America/Argentina/Buenos_Aires'
};

// Mapeo de códigos de clima WMO a emojis
// Basado en WMO Weather interpretation codes (WW)
function getWeatherEmoji(weatherCode, isDay) {
  const weatherMap = {
    0: '☀️',      // Despejado
    1: '🌤️',     // Mayormente despejado
    2: '⛅',     // Parcialmente nublado
    3: '☁️',     // Nublado
    45: '🌫️',    // Niebla
    48: '🌫️',    // Niebla con escarcha
    51: '🌦️',    // Llovizna ligera
    53: '🌦️',    // Llovizna moderada
    55: '🌧️',    // Llovizna intensa
    61: '🌧️',    // Lluvia ligera
    63: '🌧️',    // Lluvia moderada
    65: '⛈️',     // Lluvia intensa
    71: '🌨️',    // Nieve ligera
    73: '🌨️',    // Nieve moderada
    75: '❄️',     // Nieve intensa
    77: '🌨️',    // Granizo
    80: '🌦️',    // Chubascos ligeros
    81: '⛈️',     // Chubascos moderados
    82: '⛈️',     // Chubascos intensos
    85: '🌨️',    // Chubascos de nieve ligeros
    86: '❄️',     // Chubascos de nieve intensos
    95: '⛈️',     // Tormenta
    96: '⛈️',     // Tormenta con granizo ligero
    99: '⛈️'      // Tormenta con granizo intenso
  };

  // Si es de noche y está despejado, usar luna
  if (!isDay && (weatherCode === 0 || weatherCode === 1)) {
    return '🌙';
  }

  return weatherMap[weatherCode] || '🌤️';
}

// Obtener descripción del clima en español
function getWeatherDescription(weatherCode) {
  const descriptions = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna',
    55: 'Llovizna intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia',
    65: 'Lluvia intensa',
    71: 'Nieve ligera',
    73: 'Nieve',
    75: 'Nevada intensa',
    77: 'Granizo',
    80: 'Chubascos',
    81: 'Chubascos moderados',
    82: 'Chubascos intensos',
    85: 'Chubascos de nieve',
    86: 'Nevada intensa',
    95: 'Tormenta',
    96: 'Tormenta con granizo',
    99: 'Tormenta severa'
  };

  return descriptions[weatherCode] || 'Clima variable';
}

// Función principal para obtener el clima
async function fetchWeather() {
  const weatherIcon = document.getElementById('weatherIcon');
  const weatherTemp = document.getElementById('weatherTemp');
  const weatherWidget = document.getElementById('weatherWidget');

  // Verificar que los elementos existen
  if (!weatherIcon || !weatherTemp || !weatherWidget) {
    console.warn('Widget de clima: Elementos no encontrados');
    return;
  }

  try {
    // URL de la API Open-Meteo (sin API key requerida)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_CONFIG.latitude}&longitude=${WEATHER_CONFIG.longitude}&current=temperature_2m,is_day,weather_code&timezone=${WEATHER_CONFIG.timezone}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener datos del clima');
    }

    const data = await response.json();
    const current = data.current;

    // Actualizar temperatura
    const temperature = Math.round(current.temperature_2m);
    weatherTemp.textContent = `${temperature}°C`;

    // Actualizar icono del clima
    const weatherCode = current.weather_code;
    const isDay = current.is_day === 1;
    const emoji = getWeatherEmoji(weatherCode, isDay);
    weatherIcon.textContent = emoji;

    // Agregar título descriptivo
    const description = getWeatherDescription(weatherCode);
    weatherWidget.title = `${description} - ${temperature}°C`;

    // Animación de aparición suave
    weatherWidget.style.opacity = '0';
    setTimeout(() => {
      weatherWidget.style.transition = 'opacity 0.5s ease-in';
      weatherWidget.style.opacity = '1';
    }, 100);

  } catch (error) {
    console.error('Error al cargar el clima:', error);
    // En caso de error, mostrar valores por defecto
    weatherIcon.textContent = '🌤️';
    weatherTemp.textContent = '--°C';
    weatherWidget.title = 'Clima no disponible';
  }
}

// Inicializar el widget cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Cargar clima inmediatamente
  fetchWeather();

  // Actualizar cada 10 minutos (600000 ms)
  setInterval(fetchWeather, 600000);
});

// Actualizar el clima cuando la página vuelve a estar visible
// (útil cuando el usuario vuelve a la pestaña después de un tiempo)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    fetchWeather();
  }
});
