// Lista de preguntas organizadas por secciones y criterios
const preguntas = [
    // Sección 1: Responsabilidad Contigo Mismo/a
    {
        seccion: "Responsabilidad Contigo Mismo/a",
        criterio: "Autorregulación Emocional",
        preguntas: [
            "¿Reconozco mis emociones antes de reaccionar en una situación difícil?",
            "¿Utilizo técnicas específicas para calmarme cuando me siento abrumado/a?",
            "¿Evito transferir mis emociones negativas a mi pareja?",
            "¿Puedo mantener la calma cuando mi pareja está emocionalmente alterada?",
            "¿Busco maneras de promover la tranquilidad en situaciones de conflicto?"
        ]
    },
    {
        seccion: "Responsabilidad Contigo Mismo/a",
        criterio: "Autoconocimiento y Esquemas",
        preguntas: [
            "¿Soy consciente de los patrones repetitivos en mi comportamiento que afectan mi bienestar?",
            "¿Reflexiono regularmente sobre cómo mis creencias y experiencias pasadas influyen en mi relación actual?",
            "¿Trabajo activamente para transformar esquemas o creencias limitantes que identifico en mí?",
            "¿Reconozco cuándo estoy proyectando inseguridades en mi pareja?",
            "¿Adapto mis patrones cuando reconozco que no están funcionando?"
        ]
    },
    {
        seccion: "Responsabilidad Contigo Mismo/a",
        criterio: "Responsabilidad Personal",
        preguntas: [
            "¿Reconozco mi contribución a los conflictos o tensiones en la relación?",
            "¿Asumo la responsabilidad de tomar decisiones que me permitan crecer y estar en paz conmigo mismo/a?",
            "¿Busco soluciones antes de culpar a los demás por los problemas que enfrento?",
            "¿Evito actuar desde la ira o la frustración en mis interacciones?",
            "¿Acepto mis errores y los comparto con honestidad?"
        ]
    },
    // Sección 2: Responsabilidad en la Relación de Pareja y Otros Ámbitos
    {
        seccion: "Responsabilidad en la Relación de Pareja y Otros Ámbitos",
        criterio: "Comunicación Consciente",
        preguntas: [
            "¿Expreso mis necesidades de manera clara y respetuosa?",
            "¿Uso un lenguaje que refleja respeto y evita culpar a mi pareja?",
            "¿Evito escalar conflictos con comentarios defensivos o agresivos?",
            "¿Formulo mis críticas de manera constructiva en lugar de destructiva?",
            "¿Reflexiono antes de hablar en situaciones de tensión emocional?"
        ]
    },
    {
        seccion: "Responsabilidad en la Relación de Pareja y Otros Ámbitos",
        criterio: "Empatía y Validación",
        preguntas: [
            "¿Escucho activamente a mi pareja sin interrumpir ni invalidar sus emociones?",
            "¿Hago un esfuerzo por comprender el punto de vista de mi pareja, incluso si no estoy de acuerdo?",
            "¿Valido las emociones de mi pareja, reconociendo su experiencia como válida?",
            "¿Reconozco y valoro los esfuerzos de mi pareja en la relación?",
            "¿Expreso gratitud regularmente hacia mi pareja?"
        ]
    },
    {
        seccion: "Responsabilidad en la Relación de Pareja y Otros Ámbitos",
        criterio: "Apertura a la Vulnerabilidad",
        preguntas: [
            "¿Comparto mis pensamientos y emociones internas, incluso cuando me siento inseguro/a?",
            "¿Acepto mostrarme vulnerable frente a mi pareja para fortalecer nuestra conexión?",
            "¿Pido ayuda o apoyo cuando lo necesito sin temor al rechazo?",
            "¿Me permito ser imperfecto/a frente a mi pareja sin temor al juicio?",
            "¿Creo espacios seguros para que ambos seamos vulnerables?"
        ]
    },
    {
        seccion: "Responsabilidad en la Relación de Pareja y Otros Ámbitos",
        criterio: "Reparación y Perdón",
        preguntas: [
            "¿Tomo la iniciativa para reparar la relación después de un conflicto?",
            "¿Practico el perdón hacia mi pareja y hacia mí mismo/a, liberando resentimientos?",
            "¿Evalúo y ajusto acuerdos cuando noto que no están funcionando bien?",
            "¿Reconozco cuándo es necesario disculparme?",
            "¿Puedo dejar de lado el orgullo para priorizar la relación en los conflictos?"
        ]
    }
];

let preguntaActual = 0;
let seccionActual = 0;
let criterioActual = 0;
let puntuaciones = [];

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    const preguntasContainer = document.getElementById('preguntasContainer');
    if (preguntasContainer) {
        const seccion = preguntas[seccionActual];
        const criterio = seccion.criterio;
        const preguntaTexto = seccion.preguntas[preguntaActual];

        preguntasContainer.innerHTML = `
            <div class="pregunta">
                <h3>${seccion.seccion} - ${criterio}</h3>
                <label>${preguntaTexto}</label>
                <input type="range" min="0" max="10" value="5" step="1" id="rangoPregunta">
                <span id="valorPregunta">5</span>
            </div>
            <div class="botones">
                ${preguntaActual > 0 || seccionActual > 0 ? '<button type="button" id="anteriorBtn">Anterior</button>' : ''}
                <button type="button" id="siguienteBtn">Siguiente</button>
            </div>
        `;

        // Actualizar el valor del rango
        const rango = document.getElementById('rangoPregunta');
        const valor = document.getElementById('valorPregunta');
        rango.addEventListener('input', () => {
            valor.textContent = rango.value;
        });

        // Actualizar la barra de progreso
        const totalPreguntas = preguntas.reduce((sum, seccion) => sum + seccion.preguntas.length, 0);
        const preguntasRespondidas = (seccionActual * preguntas[0].preguntas.length) + preguntaActual;
        const progreso = ((preguntasRespondidas + 1) / totalPreguntas) * 100;
        document.getElementById('progreso').style.width = `${progreso}%`;

        // Manejar el botón "Siguiente"
        const siguienteBtn = document.getElementById('siguienteBtn');
        siguienteBtn.addEventListener('click', () => {
            puntuaciones.push(parseInt(rango.value));
            preguntaActual++;
            if (preguntaActual < seccion.preguntas.length) {
                mostrarPregunta();
            } else {
                preguntaActual = 0;
                seccionActual++;
                if (seccionActual < preguntas.length) {
                    mostrarPregunta();
                } else {
                    mostrarResultado();
                }
            }
        });

        // Manejar el botón "Anterior"
        if (preguntaActual > 0 || seccionActual > 0) {
            const anteriorBtn = document.getElementById('anteriorBtn');
            anteriorBtn.addEventListener('click', () => {
                if (preguntaActual > 0) {
                    preguntaActual--;
                } else {
                    seccionActual--;
                    preguntaActual = preguntas[seccionActual].preguntas.length - 1;
                }
                puntuaciones.pop(); // Eliminar la última respuesta
                mostrarPregunta();
            });
        }
    }
}

// Función para mostrar el resultado final
function mostrarResultado() {
    const total = puntuaciones.reduce((sum, val) => sum + val, 0);
    const resultado = document.getElementById('resultado');
    const contenidoResultado = document.getElementById('contenidoResultado');

    // Determinar el grupo de valoración
    let valoracion = "";
    let interpretacion = "";
    if (total >= 0 && total <= 70) {
        valoracion = "Responsabilidad Muy Baja";
        interpretacion = "Este nivel indica una falta significativa de responsabilidad personal y relacional. Es necesario trabajar en aspectos fundamentales como la autorregulación y la comunicación consciente.";
    } else if (total >= 71 && total <= 140) {
        valoracion = "Responsabilidad Baja";
        interpretacion = "Muestras un nivel inicial de consciencia, pero aún te cuesta aplicar la responsabilidad en tus relaciones. Se recomienda un enfoque activo en identificar patrones y mejorar tus interacciones.";
    } else if (total >= 141 && total <= 210) {
        valoracion = "Responsabilidad Moderada";
        interpretacion = "Estás en el camino correcto. Reconoces aspectos importantes de tu responsabilidad, pero existen áreas clave que necesitan mayor atención y desarrollo constante.";
    } else if (total >= 211 && total <= 280) {
        valoracion = "Responsabilidad Alta";
        interpretacion = "Demuestras una sólida capacidad para asumir responsabilidad. Tus habilidades emocionales y de comunicación son efectivas, aunque aún puedes realizar ajustes para alcanzar la excelencia.";
    } else if (total >= 281 && total <= 350) {
        valoracion = "Responsabilidad Sobresaliente";
        interpretacion = "Eres un ejemplo de responsabilidad personal y relacional. Has integrado prácticas de autorregulación, empatía y vulnerabilidad de manera extraordinaria, promoviendo relaciones sanas y equilibradas.";
    }

    // Mostrar el resultado en grande
    contenidoResultado.innerHTML = `
        <h2>Resultado del Test</h2>
        <p><strong>Puntuación Total:</strong> ${total} puntos.</p>
        <p><strong>Nivel de Responsabilidad:</strong> ${valoracion}</p>
        <p><strong>Interpretación:</strong> ${interpretacion}</p>
        <button type="button" id="verRecomendacionesBtn">Ver Recomendaciones y Conclusión</button>
        <button type="button" id="repetirTestBtn">Repetir Test</button>
    `;

    // Mostrar el contenedor de resultados
    resultado.style.display = "flex";

    // Manejar el botón "Ver Recomendaciones y Conclusión"
    const verRecomendacionesBtn = document.getElementById('verRecomendacionesBtn');
    verRecomendacionesBtn.addEventListener('click', () => {
        mostrarRecomendaciones(valoracion);
    });

    // Manejar el botón "Repetir Test"
    const repetirTestBtn = document.getElementById('repetirTestBtn');
    repetirTestBtn.addEventListener('click', () => {
        reiniciarTest();
    });
}

// Función para mostrar recomendaciones y conclusión
function mostrarRecomendaciones(valoracion) {
    const resultado = document.getElementById('resultado');
    const contenidoResultado = document.getElementById('contenidoResultado');

    let recomendaciones = "";
    if (valoracion === "Responsabilidad Muy Baja" || valoracion === "Responsabilidad Baja") {
        recomendaciones = `
            <h3>Qué Hacer Según Tu Resultado:</h3>
            <p>Reconoce que este es un punto de partida. Comienza a trabajar en la mentalidad de ser el creador de tu propia vida, tu autorreflexión y toma pequeños pasos hacia un cambio significativo. Participar activamente en actividades como el taller intensivo puede ser crucial para empezar a transformar tu relación.</p>
        `;
    } else if (valoracion === "Responsabilidad Moderada") {
        recomendaciones = `
            <h3>Qué Hacer Según Tu Resultado:</h3>
            <p>Aprovecha tu nivel de consciencia para profundizar en tus prácticas de comunicación, empatía y autorregulación. Identifica áreas específicas donde puedes mejorar para seguir avanzando hacia relaciones más saludables. El taller intensivo te ayudará a subir de nivel.</p>
        `;
    } else if (valoracion === "Responsabilidad Alta" || valoracion === "Responsabilidad Sobresaliente") {
        recomendaciones = `
            <h3>Qué Hacer Según Tu Resultado:</h3>
            <p>Continúa fortaleciendo tus habilidades y comparte tus aprendizajes con tu pareja y entorno. Usa este nivel como una base para mantener relaciones equilibradas y apoyar a otros en su camino de crecimiento personal y relacional.</p>
        `;
    }

    // Mostrar recomendaciones y conclusión
    contenidoResultado.innerHTML = `
        <h2>Recomendaciones y Conclusión</h2>
        ${recomendaciones}
        <h3>Conclusión:</h3>
        <p>
            Este test no solo te ayuda a identificar dónde te encuentras actualmente, sino que también es una guía para
            construir relaciones basadas en la responsabilidad, la empatía y el compromiso. Recuerda que el cambio
            comienza contigo, y este test es el primer paso hacia relaciones más plenas y satisfactorias.
        </p>
        <p>
            ¡Te invitamos a completar el test con sinceridad y a aprovechar esta oportunidad para transformar tu vida y tus
            relaciones!
        </p>
        <p class="firma">creandoparejasextraordinarias.com<br>Jon Jaureguizar Núñez</p>
        <button type="button" id="volverResultadosBtn">Volver a Resultados</button>
        <button type="button" id="repetirTestBtn">Repetir Test</button>
    `;

    // Manejar el botón "Volver a Resultados"
    const volverResultadosBtn = document.getElementById('volverResultadosBtn');
    volverResultadosBtn.addEventListener('click', () => {
        mostrarResultado();
    });

    // Manejar el botón "Repetir Test"
    const repetirTestBtn = document.getElementById('repetirTestBtn');
    repetirTestBtn.addEventListener('click', () => {
        reiniciarTest();
    });
}

// Función para reiniciar el test
function reiniciarTest() {
    preguntaActual = 0;
    seccionActual = 0;
    criterioActual = 0;
    puntuaciones = [];
    document.getElementById('resultado').style.display = "none";
    mostrarPregunta();
}

// Iniciar el test
mostrarPregunta();