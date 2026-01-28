const searchData = [
    { title: "Inicio", url: "index.html" },
    { title: "Energía en Argentina", url: "fuentes-energia-argentina.html" },
    { title: "Energía Eólica", url: "eolica.html" },
    { title: "Energía Solar", url: "solar.html" },
    { title: "Energía Hidroeléctrica", url: "hidroelectrica.html" },
    { title: "Energía de Biomasa", url: "biomasa.html" },
    { title: "Energía Geotérmica", url: "geotermica.html" },
    { title: "Ley de Faraday", url: "eolica.html#faraday" },
    { title: "Definición de Energía", url: "definicion-energia.html" },
    { title: "Energía Cinética", url: "cinetica.html" },
    { title: "Energía Potencial", url: "gravitatoria.html" },
    { title: "Trabajo y Energía", url: "trabajo.html" },
    { title: "Calor y Temperatura", url: "calor.html" },
    { title: "Quiz de Energía", url: "quiz.html" }
];

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('grokSearch');
    const results = document.getElementById('searchResults');

    if (input && results) {
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            results.innerHTML = '';
            
            if (term.length > 0) {
                const filtered = searchData.filter(item => 
                    item.title.toLowerCase().includes(term)
                );

                if (filtered.length > 0) {
                    results.style.display = 'block';
                    filtered.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'search-item';
                        div.textContent = item.title;
                        div.onclick = () => window.location.href = item.url;
                        results.appendChild(div);
                    });
                } else {
                    results.style.display = 'none';
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
    }
});
