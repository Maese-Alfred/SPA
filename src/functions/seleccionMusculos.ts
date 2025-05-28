import type { Metodologia } from "../tipos/metodologias";

// IDs de músculos según Wger API
export const gruposMusculares: Record<Metodologia, number[]> = {
    PPL: [4, 12, 10], // pecho, espalda, piernas
    Equilibrado: [4, 10, 12, 2, 6], // pecho, piernas, espalda, hombros, abdomen
};

export function getGruposMuscularesPorMetodologia(metodologia: Metodologia): number[] {
    return gruposMusculares[metodologia] || [];
}