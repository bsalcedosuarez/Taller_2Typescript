import { series } from './data.js';

function crearTablaSeries(): void {
    const tabla = document.getElementById('tablaSeries')!.getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar contenido previo

    series.forEach((serie, index) => {
        let fila = tabla.insertRow();
        fila.insertCell(0).innerText = (index + 1).toString();
        fila.insertCell(1).innerText = serie.nombre;
        fila.insertCell(2).innerText = serie.canal;
        fila.insertCell(3).innerText = serie.numTemporadas.toString();

        // Añadir evento para mostrar los detalles al hacer clic en una fila
        fila.addEventListener('click', () => {
            mostrarDetalleSerie(serie); // Mostrar detalles de la serie
        });
    });

    mostrarPromedioTemporadas();
}

function mostrarPromedioTemporadas(): void {
    const promedio = calcularPromedioTemporadas();
    const promedioElem = document.getElementById('promedioTemporadas')!;
    promedioElem.innerText = `Promedio de Temporadas: ${promedio.toFixed(2)}`;
}

function calcularPromedioTemporadas(): number {
    const totalSeasons = series.reduce((acc, serie) => acc + serie.numTemporadas, 0);
    return totalSeasons / series.length;
}

// Función para mostrar el detalle de la serie en la tarjeta (Card)
function mostrarDetalleSerie(serie: any): void {
    const detalleSerieElem = document.getElementById('detalleSerie')!;
    const serieImagenElem = document.getElementById('serieImagen')!;
    const serieTituloElem = document.getElementById('serieTitulo')!;
    const serieSinopsisElem = document.getElementById('serieSinopsis')!;
    const linkNetflixElem = document.getElementById('linkNetflix')!;
    const linkRottenElem = document.getElementById('linkRottenTomatoes')!;

    // Asignar valores a los elementos del Card
    serieImagenElem.setAttribute('src', serie.imagen);
    serieTituloElem.innerText = serie.nombre;
    serieSinopsisElem.innerText = serie.sinopsis;
    linkNetflixElem.setAttribute('href', serie.linkNetflix);
    linkRottenElem.setAttribute('href', serie.linkRottenTomatoes);

    // Mostrar la tarjeta
    detalleSerieElem.style.display = 'block';
}

// Evento para actualizar la tabla
document.getElementById('actualizar')!.addEventListener('click', crearTablaSeries);

// Llamar la función al cargar la página
window.onload = crearTablaSeries;
