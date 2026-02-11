const searchData = [
    { title: "Inicio", url: "home.html", keywords: "inicio principal portada" },
    { title: "Energía en Argentina", url: "fuentes-energia-argentina.html", keywords: "argentina energía nacional país recursos" },
    { title: "Energía Eólica", url: "eolica.html", keywords: "viento molino aerogenerador renovable" },
    { title: "Energía Solar", url: "solar.html", keywords: "sol fotovoltaica panel térmica renovable" },
    { title: "Energía Hidroeléctrica", url: "hidroelectrica.html", keywords: "agua represa hidroeléctrica hidroelectrica río renovable" },
    { title: "Energía de Biomasa", url: "biomasa.html", keywords: "biomasa biocombustible orgánico residuos biodiesel bioetanol" },
    { title: "Energía Geotérmica", url: "geotermica.html", keywords: "geotérmica geotermica tierra calor subterránea renovable" },
    { title: "Energía Nuclear", url: "nuclear.html", keywords: "nuclear átomo fisión fusión uranio reactor" },
    { title: "Ley de Faraday", url: "faraday.html", keywords: "faraday inducción electromagnética ley" },
    { title: "Electricidad", url: "electricidad.html", keywords: "electricidad corriente voltaje circuito" },
    { title: "Definición de Energía", url: "definicion-energia.html", keywords: "definición concepto qué es energía" },
    { title: "Energía Cinética", url: "cinetica.html", keywords: "cinética movimiento velocidad masa" },
    { title: "Energía Potencial", url: "gravitatoria.html", keywords: "potencial altura gravitatoria posición" },
    { title: "Trabajo y Energía", url: "trabajo.html", keywords: "trabajo fuerza desplazamiento joule" },
    { title: "Potencia", url: "potencia-energia.html", keywords: "potencia watt tiempo rapidez" },
    { title: "Conservación de la Energía", url: "mecanica02.html", keywords: "conservación mecánica transformación" },
    { title: "Mecánica", url: "mecanica01.html", keywords: "mecánica física movimiento" },
    { title: "Calor y Temperatura", url: "calor.html", keywords: "calor temperatura térmica caliente frío" },
    { title: "Cambios de Estado", url: "cambios-estado.html", keywords: "cambio estado sólido líquido gas fusión evaporación" },
    { title: "Ley de Coulomb", url: "coulomb.html", keywords: "coulomb carga eléctrica electrostática" },
    { title: "Magnetismo", url: "magnetismo.html", keywords: "magnetismo imán magnético campo" },
    { title: "Circuito Simple", url: "circuito-simple.html", keywords: "circuito simple básico pila lámpara" },
    { title: "Circuito Serie", url: "circuito-serie.html", keywords: "circuito serie conexión resistencia" },
    { title: "Circuito Paralelo", url: "circuito-paralelo.html", keywords: "circuito paralelo conexión resistencia" },
    { title: "Calculadora Física", url: "calculadora.html", keywords: "calculadora calcular resolver problemas" },
    { title: "Quiz de Física", url: "quiz.html", keywords: "quiz test evaluación examen preguntas" },
    { title: "Guía de Estudio", url: "guia.html", keywords: "guía estudio fórmulas aprender" },
    { title: "Tipos de Energía", url: "tipos-energia.html", keywords: "tipos clases formas energía" },
    { title: "Energías Alternativas", url: "alternativas.html", keywords: "alternativas renovables limpias verdes" }
];

// Función de búsqueda mejorada con keywords
function searchContent(term) {
    const lowerTerm = term.toLowerCase().trim();

    return searchData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(lowerTerm);
        const keywordMatch = item.keywords && item.keywords.toLowerCase().includes(lowerTerm);
        return titleMatch || keywordMatch;
    });
}

// Inicialización del buscador
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('grokSearch');
    const results = document.getElementById('searchResults');

    // Verificar que los elementos existen
    if (!input || !results) {
        console.warn('Grokipedia: Elementos de búsqueda no encontrados');
        return;
    }

    // Evento de búsqueda
    input.addEventListener('input', (e) => {
        const term = e.target.value;
        results.innerHTML = '';

        // Buscar solo si hay al menos 2 caracteres
        if (term.length >= 2) {
            const filtered = searchContent(term);

            if (filtered.length > 0) {
                results.style.display = 'block';

                // Limitar a 8 resultados para mejor UX
                filtered.slice(0, 8).forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-item';

                    // Crear HTML con título destacado
                    const titleHtml = highlightMatch(item.title, term);
                    div.innerHTML = `<strong>${titleHtml}</strong>`;

                    // Click en resultado
                    div.onclick = () => {
                        window.location.href = item.url;
                    };

                    // Hover effect
                    div.onmouseover = () => {
                        div.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                    };
                    div.onmouseout = () => {
                        div.style.backgroundColor = '';
                    };

                    results.appendChild(div);
                });

                // Mostrar mensaje si hay más resultados
                if (filtered.length > 8) {
                    const moreDiv = document.createElement('div');
                    moreDiv.className = 'search-item';
                    moreDiv.style.fontStyle = 'italic';
                    moreDiv.style.color = '#666';
                    moreDiv.textContent = `+ ${filtered.length - 8} más resultados...`;
                    results.appendChild(moreDiv);
                }
            } else {
                // No hay resultados
                results.style.display = 'block';
                const noResults = document.createElement('div');
                noResults.className = 'search-item';
                noResults.style.color = '#999';
                noResults.textContent = '❌ No se encontraron resultados';
                results.appendChild(noResults);
            }
        } else {
            results.style.display = 'none';
        }
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !results.contains(e.target)) {
            results.style.display = 'none';
        }
    });

    // Cerrar con tecla ESC
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            results.style.display = 'none';
            input.blur();
        }
    });

    // Abrir resultados al hacer focus si hay texto
    input.addEventListener('focus', (e) => {
        if (e.target.value.length >= 2) {
            const filtered = searchContent(e.target.value);
            if (filtered.length > 0) {
                results.style.display = 'block';
            }
        }
    });
});

// Función para resaltar coincidencias
function highlightMatch(text, term) {
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index >= 0) {
        const before = text.substring(0, index);
        const match = text.substring(index, index + term.length);
        const after = text.substring(index + term.length);
        return `${before}<mark style="background-color: #fff59d; padding: 2px 4px; border-radius: 3px;">${match}</mark>${after}`;
    }
    return text;
}
