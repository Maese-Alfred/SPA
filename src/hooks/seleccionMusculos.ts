// src/functions/seleccionMusculos.ts
import type { Metodologia } from "../tipos/metodologias"; // Asume que esta ruta es correcta

// Mapeo de metodologías a IDs de grupos musculares de WGER
// Puedes ajustar estos IDs según los grupos musculares exactos que quieras para cada metodología.
// Por ejemplo, para PPL, podrías tener 3 IDs (uno para Push, uno para Pull, uno para Legs)
// o varios IDs que representen los músculos de cada día (ej. pecho, hombro, tríceps para Push).
// Los IDs de WGER para músculos populares son:
// 1: Biceps
// 2: Deltoids (Hombros)
// 3: Pectorals (Pecho)
// 4: Quadriceps (Cuádriceps)
// 5: Triceps
// 6: Abdominals (Abdomen)
// 7: Back (Espalda)
// 8: Hamstrings (Isquiotibiales)
// 9: Calves (Gemelos)
// 10: Glutes (Glúteos)

export const gruposMuscularesPorMetodologia: Record<Metodologia, number[]> = {
  PPL: [3, 2, 5, 7, 1, 4, 10], // Ejemplo: Pecho, Hombros, Tríceps (Push), Espalda, Bíceps (Pull), Cuádriceps, Glúteos (Legs)
  Equilibrado: [3, 7, 4, 2, 6], // Ejemplo: Pecho, Espalda, Cuádriceps, Hombros, Abdomen
};

export function getGruposMuscularesPorMetodologia(
  metodologia: Metodologia
): number[] {
  return gruposMuscularesPorMetodologia[metodologia] || [];
}