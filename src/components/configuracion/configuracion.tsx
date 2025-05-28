import React, { useState, useEffect } from 'react';
import { setDiaDescanso, setConfiguracion, setMetodologia, setNombre } from "../../functions/inicio";
import './configuracion.css';

function Configuracion() {
    const [diaDescansoSeleccionado, setDiaDescansoSeleccionado] = useState<number>(0);
    const [metodologiaSeleccionada, setMetodologiaSeleccionada] = useState<'PPL' | 'Equilibrado'>('PPL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enviarPress, setEnviarPress] = useState(false);


    // ✅ Mostrar modal solo la primera vez
    useEffect(() => {
        const modalYaMostrado = localStorage.getItem('modalConfiguracionMostrado');
        if (!modalYaMostrado) {
            setEnviarPress(false);
            setIsModalOpen(true);
            localStorage.setItem('modalConfiguracionMostrado', 'true');
        }
    }, []);

    const onCancel = () => {
        if (!enviarPress) {
            alert("Por favor, guarda la configuración antes de cerrar.");
            return;
        }
        setIsModalOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target;

        if (id === "diaDescanso") {
            setDiaDescansoSeleccionado(parseInt(value, 10));
        } else if (id === "metodologia") {
            setMetodologiaSeleccionada(value as 'PPL' | 'Equilibrado');
        }
    };

    const handleGuardarConfiguracion = () => {
        setNombre((document.getElementById("nombre") as HTMLInputElement).value);
        setDiaDescanso(diaDescansoSeleccionado);
        setMetodologia(metodologiaSeleccionada);
        setConfiguracion({
            nombre: (document.getElementById("nombre") as HTMLInputElement).value,
            diaDescanso: diaDescansoSeleccionado,
            metodologia: metodologiaSeleccionada,
        });
        alert("Configuración guardada correctamente.");
        setIsModalOpen(false); // opcional: cerrar al guardar
    };

    return (
        <><button onClick={() => {
  localStorage.removeItem('modalConfiguracionMostrado');
  alert('Variable reiniciada');
}}>
  Reiniciar Modal
</button>
            {isModalOpen && (
                <div className='modal'>
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={onCancel}>
                            &#x2715;
                        </button>
                        <h2 className='titulo-configuracion'>¡HOLA!</h2>
                        <div className='input-container'>
                            <label htmlFor="nombre">¿Cómo te llamas?</label>
                            <input
                                className='input-nombre'
                                type="text"
                                id="nombre"
                                placeholder="Escribe tu nombre"
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="diaDescanso">Día de descanso:</label>
                            <select
                                id="diaDescanso"
                                value={diaDescansoSeleccionado}
                                onChange={handleInputChange}
                            >
                                <option value="0">Lunes</option>
                                <option value="1">Martes</option>
                                <option value="2">Miércoles</option>
                                <option value="3">Jueves</option>
                                <option value="4">Viernes</option>
                                <option value="5">Sábado</option>
                                <option value="6">Domingo</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label htmlFor="metodologia">Metodología:</label>
                            <select
                                id="metodologia"
                                value={metodologiaSeleccionada}
                                onChange={handleInputChange}
                            >
                                <option value="PPL">PPL</option>
                                <option value="Equilibrado">Equilibrado</option>
                            </select>
                        </div>
                        <button className='boton-guardar' onClick={handleGuardarConfiguracion}>
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Configuracion;