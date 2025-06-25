// ========================================
// CONFIGURACIÓN DE PELÍCULAS
// ========================================

/**
 * Base de datos de películas con toda la información necesaria
 * Cada película tiene: id, título, género, duración, videoId de YouTube y sinopsis
 */
const peliculas = {
    spiderman: {
        titulo: "Spider-Man: No Way Home",
        genero: "Acción, Aventura, Sci-Fi",
        duracion: "148 min",
        videoId: "dM2hrHNJHiE",
        sinopsis: "Por primera vez en la historia cinematográfica de Spider-Man, nuestro héroe vecino es desenmascarado y ya no puede separar su vida normal de los enormes riesgos de ser un superhéroe. Cuando pide ayuda al Doctor Strange, los riesgos se vuelven aún más peligrosos, obligándole a descubrir lo que realmente significa ser Spider-Man."
    },
    dune: {
        titulo: "Dune",
        genero: "Sci-Fi, Drama, Aventura",
        duracion: "155 min",
        videoId: "n9xhJrPXop4",
        sinopsis: "Una historia mítica y emotiva sobre el heroísmo, Paul Atreides, un joven brillante y talentoso nacido para un gran destino más allá de su entendimiento, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su gente."
    },
    bond: {
        titulo: "No Time to Die",
        genero: "Acción, Aventura, Thriller",
        duracion: "163 min",
        videoId: "BIhNsAtPbPI",
        sinopsis: "James Bond se encuentra disfrutando de unas merecidas vacaciones en Jamaica. Sin embargo, su paz se ve interrumpida cuando su viejo amigo de la CIA, Felix Leiter, aparece pidiendo ayuda. La misión de rescatar a un científico secuestrado resulta ser mucho más compleja de lo esperado."
    },
    encanto: {
        titulo: "Encanto",
        genero: "Animación, Familia, Comedia",
        duracion: "102 min",
        videoId: "CaimKeDcudo",
        sinopsis: "La película de Walt Disney Animation Studios cuenta la historia de los Madrigal, una familia extraordinaria que vive escondida en las montañas de Colombia, en una casa mágica, en un pueblo vibrante, en un lugar maravilloso conocido como un Encanto."
    },
    guerramundialz: {
        titulo: "Guerra Mundial Z",
        genero: "Acción, Aventura, Thriller",
        duracion: "116 min",
        videoId: "tsC_lkyp6GA",
        sinopsis: "Cuando una pandemia de zombis amenaza con destruir a la humanidad, un ex-investigador de Naciones Unidas es obligado a regresar al servicio para intentar descubrir la fuente de la infección."
    },
    estacionzombie: {
        titulo: "Estación Zombie",
        genero: "Terror, Acción, Suspenso",
        duracion: "102 min",
        videoId: "IEmBxtpbWs4",
        sinopsis: "Un brote viral misterioso pone a Corea en estado de emergencia. Sok-woo y su hija Soo-ahn suben al KTX, un tren rápido que une los 442 km que separan Seúl de Busan, una ciudad que se defiende con éxito de la epidemia. Sin embargo, justo en el momento de su partida, la estación es invadida por zombis que matan al conductor del tren y a otros pasajeros."
    }
};

// ========================================
// FUNCIONES PRINCIPALES
// ========================================

/**
 * Función que se ejecuta cuando se hace clic en "Ver Tráiler"
 * @param {string} videoId - ID del video de YouTube
 * @param {string} movieTitle - Título de la película
 */
function verTrailer(videoId, movieTitle) {
    // Buscar la película en nuestra base de datos
    const pelicula = Object.values(peliculas).find(p => p.videoId === videoId);
    
    if (pelicula) {
        // Guardar información en localStorage para la página de detalles
        localStorage.setItem('peliculaActual', JSON.stringify(pelicula));
        
        // Redirigir a la página de detalles
        window.location.href = 'pelicula.html';
    } else {
        // Mostrar error si no se encuentra la película
        console.error('Película no encontrada');
        alert('Error: No se pudo cargar la información de la película');
    }
}

/**
 * Función que carga los detalles de la película en la página de detalles
 * Se ejecuta automáticamente cuando se carga la página pelicula.html
 */
function cargarDetallesPelicula() {
    // Verificar si estamos en la página de detalles
    if (!document.getElementById('movie-trailer')) {
        return; // Si no estamos en la página correcta, salir
    }
    
    // Obtener información de la película desde localStorage
    const peliculaData = localStorage.getItem('peliculaActual');
    
    if (peliculaData) {
        // Convertir el JSON string de vuelta a objeto
        const pelicula = JSON.parse(peliculaData);
        
        // Actualizar todos los elementos de la página con la información
        actualizarElementosPelicula(pelicula);
    } else {
        // Si no hay datos, mostrar mensaje de error
        mostrarErrorPelicula();
    }
}

/**
 * Actualiza todos los elementos HTML con la información de la película
 * @param {Object} pelicula - Objeto con datos de la película
 */
function actualizarElementosPelicula(pelicula) {
    // Actualizar el iframe del video de YouTube
    const iframe = document.getElementById('movie-trailer');
    iframe.src = `https://www.youtube.com/embed/${pelicula.videoId}?autoplay=1&rel=0`;
    
    // Actualizar el título de la película
    const tituloElement = document.getElementById('movie-title-detail');
    tituloElement.textContent = pelicula.titulo;
    
    // Actualizar el género
    const generoElement = document.getElementById('movie-genre-detail');
    generoElement.textContent = pelicula.genero;
    
    // Actualizar la duración
    const duracionElement = document.getElementById('movie-duration-detail');
    duracionElement.textContent = pelicula.duracion;
    
    // Actualizar la sinopsis
    const sinopsisElement = document.getElementById('movie-synopsis');
    sinopsisElement.textContent = pelicula.sinopsis;
    
    // Actualizar el título de la pestaña del navegador
    document.title = `${pelicula.titulo} - Valeria Films`;
}

/**
 * Muestra un mensaje de error cuando no se pueden cargar los detalles
 */
function mostrarErrorPelicula() {
    const container = document.querySelector('.movie-detail');
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <h2 style="color: #ff4444; margin-bottom: 1rem;">
                <i class="fas fa-exclamation-triangle"></i>
                Error al cargar la película
            </h2>
            <p style="color: #cccccc;">No se pudo cargar la información de la película.</p>
            <a href="index.html" class="nav-link" style="display: inline-block; margin-top: 1rem;">
                <i class="fas fa-home"></i>
                Volver al inicio
            </a>
        </div>
    `;
}

// ========================================
// FUNCIONES DE NAVEGACIÓN Y UTILIDADES
// ========================================

/**
 * Función para navegar de vuelta al inicio
 * Limpia el localStorage y redirige
 */
function volverAlInicio() {
    localStorage.removeItem('peliculaActual');
    window.location.href = 'index.html';
}

/**
 * Función para añadir efectos visuales adicionales
 * Añade animaciones y efectos especiales a las tarjetas
 */
function inicializarEfectosVisuales() {
    // Añadir efecto de brillo a las tarjetas al pasar el mouse
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        // Efecto de brillo al entrar con el mouse
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(0, 255, 65, 0.4)';
        });
        
        // Remover efecto al salir con el mouse
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.5)';
        });
    });
}

/**
 * Función para hacer la página más accesible
 * Añade soporte para navegación con teclado
 */
function inicializarAccesibilidad() {
    // Permitir activar botones con Enter
    const botones = document.querySelectorAll('.trailer-btn');
    
    botones.forEach(boton => {
        boton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Función para manejar el scroll suave
 * Mejora la experiencia de navegación
 */
function inicializarScrollSuave() {
    // Scroll suave al hacer clic en enlaces internos
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ========================================

/**
 * Función principal que se ejecuta cuando la página se carga completamente
 * Inicializa todas las funcionalidades
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Valeria Films - Aplicación iniciada');
    
    // Cargar detalles de película si estamos en esa página
    cargarDetallesPelicula();
    
    // Inicializar efectos visuales
    inicializarEfectosVisuales();
    
    // Inicializar accesibilidad
    inicializarAccesibilidad();
    
    // Inicializar scroll suave
    inicializarScrollSuave();
    
    // Añadir animación de carga a las tarjetas
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // Animación escalonada
    });
});

/**
 * Función para manejar errores de carga de imágenes
 * Muestra una imagen por defecto si no se puede cargar la original
 */
function manejarErrorImagen(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMjIyMjIyIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDBmZjQxIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
}

// ========================================
// MANEJO DE ERRORES GLOBALES
// ========================================

/**
 * Captura errores JavaScript globales
 * Útil para debugging y manejo de errores
 */
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // En producción, podrías enviar estos errores a un servicio de logging
});

/**
 * Maneja errores de promesas no capturadas
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
    e.preventDefault(); // Previene que se muestre en la consola del navegador
});