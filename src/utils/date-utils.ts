/**
 * Formatea una fecha al estilo "DDMMYYYY".
 */
export function formatDDMMYYYY(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}${m}${y}`;
}

/**
 * Formatea una fecha al estilo "DDMM".
 */
export function formatDDMM(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}${m}`;
}

/**
 * Formatea una fecha en formato "YYYY-MM-DDTHH:mm:ss-05:00"
 * ajustando automáticamente al horario de Ecuador (UTC-5).
 * Si ya estás en Ecuador, no hace ninguna conversión.
 */
export function formatDateTimeEcuador(date: Date = new Date()): string {
  const localOffset = date.getTimezoneOffset(); // en minutos
  const desiredOffset = 300; // UTC-5 → Ecuador

  // Si ya estamos en Ecuador, no modificar
  const targetDate =
    localOffset === desiredOffset
      ? date
      : new Date(date.getTime() + (desiredOffset - localOffset) * 60_000);

  const y = targetDate.getFullYear();
  const mo = String(targetDate.getMonth() + 1).padStart(2, "0");
  const d = String(targetDate.getDate()).padStart(2, "0");
  const h = String(targetDate.getHours()).padStart(2, "0");
  const mi = String(targetDate.getMinutes()).padStart(2, "0");
  const s = String(targetDate.getSeconds()).padStart(2, "0");

  return `${y}-${mo}-${d}T${h}:${mi}:${s}-05:00`;
}
