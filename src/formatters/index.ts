/**
 * Formateadores para montos, fechas y textos
 */

import { ConfiguracionFormato, TipoMoneda } from '../types';

/**
 * Configuración por defecto para formateo
 */
const CONFIGURACION_DEFAULT: Required<ConfiguracionFormato> = {
  decimales: 2,
  separadorMiles: ',',
  separadorDecimal: '.',
  simboloMoneda: '',
};

/**
 * Formatea un monto como moneda
 * @param monto Monto a formatear
 * @param configuracion Configuración de formateo opcional
 * @returns Monto formateado
 */
export function formatCurrency(
  monto: number,
  configuracion: ConfiguracionFormato = {}
): string {
  const config = { ...CONFIGURACION_DEFAULT, ...configuracion };

  if (!isFinite(monto)) {
    return '0.00';
  }

  const montoRedondeado = Number(monto.toFixed(config.decimales));
  const partes = montoRedondeado.toString().split('.');
  const enteros = partes[0] || '0';
  const decimales = partes[1] || '';

  // Agregar separador de miles
  const enterosFormateados = enteros.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    config.separadorMiles
  );

  // Asegurar que tenga la cantidad correcta de decimales
  const decimalesFormateados = decimales.padEnd(config.decimales, '0');

  const resultado =
    config.decimales > 0
      ? `${enterosFormateados}${config.separadorDecimal}${decimalesFormateados}`
      : enterosFormateados;

  return config.simboloMoneda
    ? `${config.simboloMoneda} ${resultado}`
    : resultado;
}

/**
 * Formatea un monto según el tipo de moneda
 * @param monto Monto a formatear
 * @param tipoMoneda Tipo de moneda
 * @returns Monto formateado con símbolo de moneda
 */
export function formatCurrencyByType(
  monto: number,
  tipoMoneda: TipoMoneda
): string {
  const simbolos = {
    [TipoMoneda.SOLES]: 'S/',
    [TipoMoneda.DOLARES]: '$',
    [TipoMoneda.EUROS]: '€',
  };

  return formatCurrency(monto, {
    simboloMoneda: simbolos[tipoMoneda],
  });
}

/**
 * Formatea una fecha en formato DD/MM/YYYY
 * @param fecha Fecha a formatear
 * @returns Fecha formateada
 */
export function formatDate(fecha: Date): string {
  if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
    return '';
  }

  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
}

/**
 * Formatea una fecha y hora en formato DD/MM/YYYY HH:mm:ss
 * @param fecha Fecha a formatear
 * @returns Fecha y hora formateada
 */
export function formatDateTime(fecha: Date): string {
  if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
    return '';
  }

  const fechaFormateada = formatDate(fecha);
  const hora = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const segundos = fecha.getSeconds().toString().padStart(2, '0');

  return `${fechaFormateada} ${hora}:${minutos}:${segundos}`;
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param texto Texto a capitalizar
 * @returns Texto capitalizado
 */
export function capitalizeWords(texto: string): string {
  if (!texto || typeof texto !== 'string') {
    return '';
  }

  return texto
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

/**
 * Formatea un número de documento agregando guiones
 * @param documento Número de documento
 * @param tipo Tipo de documento para determinar el formato
 * @returns Documento formateado
 */
export function formatDocumento(
  documento: string,
  tipo: 'DNI' | 'RUC' | 'OTROS' = 'OTROS'
): string {
  if (!documento || typeof documento !== 'string') {
    return '';
  }

  const docLimpio = documento.replace(/\D/g, '');

  switch (tipo) {
    case 'DNI':
      return docLimpio.length === 8
        ? `${docLimpio.slice(0, 4)}-${docLimpio.slice(4)}`
        : docLimpio;

    case 'RUC':
      return docLimpio.length === 11
        ? `${docLimpio.slice(0, 2)}-${docLimpio.slice(2, 10)}-${docLimpio.slice(10)}`
        : docLimpio;

    default:
      return docLimpio;
  }
}
