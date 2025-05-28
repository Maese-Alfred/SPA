import EjerciciosLista from "../ejerciciosLista/ejerciciosLista";
import { useRutina } from "../../hooks/useRutina";
import { getConfiguracion } from "../../functions/inicio";
import type { Metodologia } from  "../../tipos/metodologias";
import "./rutinaDiaria.css";

function RutinaDiaria() {
  // 1. Obtener la configuración del usuario
  const configuracion = getConfiguracion();
  const metodologia: Metodologia = configuracion?.metodologia || "PPL"; // Valor por defecto
  const diaDescanso = configuracion?.diaDescanso;

  // 2. Usar el hook useRutina para obtener los ejercicios
  const { rutina, loading, error } = useRutina(metodologia);

  // 3. Lógica para el día de descanso
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, etc.

  if (diaDescanso !== undefined && diaDescanso === diaSemana) {
    return (
      <div className="rutina-diaria-container">
        <h2>Hoy es día de descanso. ¡Relájate!</h2>
        <p>Disfruta tu día libre y recarga energías.</p>
      </div>
    );
  }

  // 4. Manejar estados de carga y error
  if (loading) {
    return (
      <div className="rutina-diaria-container">
        <p>Cargando tu rutina de ejercicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rutina-diaria-container">
        <p className="error-message">Error al cargar la rutina: {error}</p>
        <p>Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  // 5. Mapear los ejercicios obtenidos de la API a un array de strings
  // 'ejercicio.name' ahora sí contendrá el nombre gracias a la segunda llamada de la API.
const ejerciciosParaLista = rutina.map(
  (ejercicio) => ejercicio.translations?.[0]?.name || 'Ejercicio sin nombre'
);
  console.log("Ejercicios para la lista:", ejerciciosParaLista);

  // 6. Renderizar la lista de ejercicios
  return (
    <div className="rutina-diaria-container">
      {rutina.length === 0 ? (
        <p>No se encontraron ejercicios para la metodología "{metodologia}".</p>
      ) : (
        <EjerciciosLista
          items={ejerciciosParaLista} 
          onItemSelect={(item, index) =>
            console.log(`Seleccionaste: ${item} en la posición ${index}`)
          }
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      )}
    </div>
  );
}

export default RutinaDiaria;