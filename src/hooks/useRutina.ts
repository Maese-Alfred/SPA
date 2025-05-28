import { useEffect, useState } from "react";
import { getGruposMuscularesPorMetodologia } from "../functions/seleccionMusculos";
import type { Metodologia } from "../tipos/metodologias";

// Define la interfaz para el objeto completo de ejercicio que obtendrás de /exerciseinfo/
export interface FullExercise {
  id: number;
  uuid: string;
  category: {
    id: number;
    name: string;
  };
  muscles: {
    id: number;
    name: string;
    name_en: string;
    is_front: boolean;
    image_url_main: string;
    image_url_secondary: string;
  }[];
  muscles_secondary: {
    id: number;
    name: string;
    name_en: string;
    is_front: boolean;
    image_url_main: string;
    image_url_secondary: string;
  }[];
  equipment: {
    id: number;
    name: string;
  }[];
  translations: {
    id: number;
    name: string;
    description: string;
    language: number;
    notes: {
      id: number;
      comment: string;
    }[];
  }[];
  images: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
}

export function useRutina(metodologia: Metodologia) {
  const [rutina, setRutina] = useState<FullExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!metodologia) {
      setRutina([]);
      setLoading(false);
      return;
    }

    const muscleIds = getGruposMuscularesPorMetodologia(metodologia);

    const fetchRutina = async () => {
      setLoading(true);
      setError(null); // Limpiar errores anteriores
      try {
        // Primera etapa: Obtener IDs de ejercicios por grupo muscular
        const exerciseIdPromises = muscleIds.map(async (id) => {
          const res = await fetch(
            `https://wger.de/api/v2/exercise/?language=2&muscles=${id}&status=2&limit=5` // Limita a 5 ejercicios por músculo en la primera llamada
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          // Devolvemos solo los IDs de los ejercicios
          return data.results.map((exercise: { id: number }) => exercise.id);
        });

        // Esperamos a que todas las primeras llamadas terminen y aplanamos los IDs
        const allExerciseIdsArrays = await Promise.all(exerciseIdPromises);
        const allExerciseIds = allExerciseIdsArrays.flat();

        // Mezclamos los IDs y seleccionamos un número limitado para hacer las llamadas de detalle
        // Esto evita hacer demasiadas llamadas de detalle si hay muchos ejercicios.
        const shuffledUniqueExerciseIds = Array.from(new Set(allExerciseIds)) // Eliminar duplicados
                                            .sort(() => 0.5 - Math.random())
                                            .slice(0, 10); // Seleccionamos 10 IDs únicos para obtener detalles

        // Segunda etapa: Obtener detalles completos para cada ID seleccionado
        const fullExercisePromises = shuffledUniqueExerciseIds.map(async (id) => {
          const res = await fetch(
            `https://wger.de/api/v2/exerciseinfo/${id}/` // Llamada al endpoint de detalle
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          return data as FullExercise; // Casteamos a FullExercise
        });

        // Esperamos a que todas las llamadas de detalle terminen
        const fullExercises = await Promise.all(fullExercisePromises);

        // Opcional: Si quieres solo una cantidad específica de ejercicios en la rutina final,
        // puedes hacer otro slice aquí.
        const finalRutina = fullExercises.slice(0, 7); // Por ejemplo, 7 ejercicios para la rutina diaria
        console.log("Rutina obtenida:", finalRutina);
        setRutina(finalRutina);
      } catch (err) {
        setError(
          "Error al obtener la rutina" +
            (err instanceof Error ? `: ${err.message}` : "")
        );
        console.error("Error al obtener la rutina:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRutina();
  }, [metodologia]); // El efecto se re-ejecuta cuando cambia la metodología
if (rutina.length > 0) {
  console.log("Rutina actual:", rutina);
}
  return { rutina, loading, error };

}