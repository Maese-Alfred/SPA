import { getConfiguracion } from "./inicio";
import type { Metodologia } from "../tipos/metodologias";


//esta funcion devuelve un array de ejercicios dependiendo de la metodologia, los arreglos seran cambiados por hooks en el futuro
export function mostrarEjercicios(): string[] {
    const configuracion = getConfiguracion();
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, etc.

    // Definimos los ejercicios para cada metodología usando un Map
    const ejerciciosPorMetodologia = new Map<Metodologia, string[]>([
        ["PPL", [
            "Press Banca",
            "Dominadas",
            "Sentadillas",
            "Remo con Barra",
            "Press de Hombros",
            "Curl de Bíceps",
            "Extensiones de Tríceps"
        ]],
        ["Equilibrado", [
            "Press Banca",
            "Dominadas",
            "Sentadillas",
            "Peso Muerto",
            "Press Militar",
            "Remo Sentado",
            "Extensiones de Cuádriceps",
            "Femoral Tumbado",
            "Elevaciones Laterales"
        ]],
    ]);
    if (!configuracion || !configuracion.metodologia || !ejerciciosPorMetodologia.has(configuracion.metodologia)) {
        console.warn("No hay configuración válida disponible o la metodología no está definida/soportada.");
        return []; 
    }
    if (configuracion.diaDescanso !== undefined && configuracion.diaDescanso === diaSemana) {
        console.log(`Hoy es día de descanso. ¡Relájate! (Día: ${diaSemana})`);
        return []; 
    }
    return ejerciciosPorMetodologia.get(configuracion.metodologia) || [];
}





//esta funcion creara una rutina en el futuro, por ahora solo comprueba si el ejercicio ya existe
export function crearEjercicio(nombre: string): void {
    const configuracion = getConfiguracion();
    if (!configuracion) {
        console.error("No hay configuración disponible");
        return;
    }
    const ejercicios = mostrarEjercicios();
    if (ejercicios.includes(nombre)) {
        console.error(`El ejercicio ${nombre} ya existe en la metodología ${configuracion.metodologia}`);
        return;
    }
}