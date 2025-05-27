import type { Configuracion } from "../tipos/configuracion";

export function setConfiguracion(
  configuracion: Configuracion,
): void {
  localStorage.setItem("configuracion", JSON.stringify(configuracion));
}

export function setDiaDescanso(diaDescanso: number): void {
  const configuracion = getConfiguracion() || { diaDescanso: 0, metodologia: "PPL" };
  configuracion.diaDescanso = diaDescanso;
  setConfiguracion(configuracion);
}

export function setMetodologia(metodologia: "PPL" | "Equilibrado"): void {
  const configuracion = getConfiguracion() || { diaDescanso: 0, metodologia: "PPL" };
  configuracion.metodologia = metodologia;
  setConfiguracion(configuracion);
}

export function getConfiguracion(): Configuracion | null {
  const configuracion = localStorage.getItem("configuracion");
  if (configuracion) {
    return JSON.parse(configuracion) as Configuracion;
  }
  return null;
}

export function eliminarConfiguracion(): void {
    localStorage.removeItem("configuracion");
}

export function resetConfiguracion(): void {
    eliminarConfiguracion();
    setConfiguracion({
        diaDescanso: 0,
        metodologia: "PPL",
    });
}