import { setConfiguracion } from "../../functions/inicio";
import { useState } from "react";

export function ModalConfiguracion() {
    const [diaDescanso, setDiaDescanso] = useState(0);
    const [metodologia, setMetodologia] = useState<'PPL' | 'Equilibrado'>('PPL');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfiguracion({
            diaDescanso,
            metodologia,
        });
        alert("Configuración guardada correctamente.");
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Configuración de la Rutina</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="diaDescanso">Día de Descanso (0-6):</label>
                        <input
                            type="number"
                            id="diaDescanso"
                            value={diaDescanso}
                            onChange={(e) => setDiaDescanso(Number(e.target.value))}
                            min="0"
                            max="6"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="metodologia">Metodología:</label>
                        <select
                            id="metodologia"
                            value={metodologia}
                            onChange={(e) => setMetodologia(e.target.value as 'PPL' | 'Equilibrado')}
                        >
                            <option value="PPL">PPL</option>
                            <option value="Equilibrado">Equilibrado</option>
                        </select>
                    </div>
                    <button type="submit">Guardar Configuración</button>
                </form>
                <button onClick={() => setConfiguracion({ diaDescanso: 0, metodologia: 'PPL' })}>
                    Restablecer Configuración
                </button>
            </div>
        </div>
    );
}