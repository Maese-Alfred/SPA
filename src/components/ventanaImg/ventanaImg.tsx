import "./ventanaImg.css";
import { getConfiguracion } from "../../functions/inicio";
import type { Metodologia } from  "../../tipos/metodologias";

function VentanaImg() {
    // Obtener la configuración del usuario
    const configuracion = getConfiguracion();
    const metodologia: Metodologia = configuracion?.metodologia || "PPL"; // Valor por defecto
    return (
        <div className="ventana-img-container">
            <div className="ventana-img">
            <img
                src="https://raw.githubusercontent.com/ventana-ml/ventana/main/docs/assets/ventana-logo.png"
                alt="Ventana Logo"
                style={{ width: '100px', height: '100px' }}
            />
            </div>
             {/* esto debe ser cambiado por una variable dependiendo del tipo de ejercio que envie la api */}
            <h2>Hoy toca  ({metodologia})</h2> 
        </div>
    )
}

export default VentanaImg;