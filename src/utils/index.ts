/**
 * Utilidades generales para facturación electrónica
 */

import { FacturaData, Item } from '../types';

/**
 * Calcula el IGV (18%) de un monto
 * @param monto Monto base sin IGV
 * @returns IGV calculado
 */
export function calcularIGV(monto: number): number {
  if (!isFinite(monto) || monto < 0) {
    return 0;
  }
  return Number((monto * 0.18).toFixed(2));
}

/**
 * Calcula el monto sin IGV a partir de un monto con IGV
 * @param montoConIGV Monto que incluye IGV
 * @returns Monto sin IGV
 */
export function calcularMontoSinIGV(montoConIGV: number): number {
  if (!isFinite(montoConIGV) || montoConIGV < 0) {
    return 0;
  }
  return Number((montoConIGV / 1.18).toFixed(2));
}

/**
 * Calcula los totales de una factura basándose en sus items
 * @param items Array de items de la factura
 * @returns Objeto con subtotal, IGV y total
 */
export function calcularTotalesFactura(items: Item[]): {
  subtotal: number;
  igv: number;
  total: number;
} {
  if (!Array.isArray(items) || items.length === 0) {
    return { subtotal: 0, igv: 0, total: 0 };
  }

  const subtotal = items.reduce((sum, item) => sum + (item.valorTotal || 0), 0);
  const igv = items.reduce((sum, item) => sum + (item.igv || 0), 0);
  const total = subtotal + igv;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    igv: Number(igv.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

/**
 * Genera un número de serie correlativo
 * @param serie Serie base (ej: "F001")
 * @param ultimoNumero Último número usado
 * @returns Siguiente número en la serie
 */
export function generarNumeroSerie(
  serie: string,
  ultimoNumero: number
): string {
  const siguienteNumero = ultimoNumero + 1;
  return `${serie}-${siguienteNumero.toString().padStart(8, '0')}`;
}

/**
 * Convierte números a su representación en palabras (para montos)
 * @param numero Número a convertir
 * @returns Número en palabras
 */
export function numeroEnPalabras(numero: number): string {
  if (numero === 0) return 'CERO';
  if (!isFinite(numero) || numero < 0) return '';

  const unidades = [
    '',
    'UNO',
    'DOS',
    'TRES',
    'CUATRO',
    'CINCO',
    'SEIS',
    'SIETE',
    'OCHO',
    'NUEVE',
  ];
  const decenas = [
    '',
    '',
    'VEINTE',
    'TREINTA',
    'CUARENTA',
    'CINCUENTA',
    'SESENTA',
    'SETENTA',
    'OCHENTA',
    'NOVENTA',
  ];
  const especiales = [
    'DIEZ',
    'ONCE',
    'DOCE',
    'TRECE',
    'CATORCE',
    'QUINCE',
    'DIECISÉIS',
    'DIECISIETE',
    'DIECIOCHO',
    'DIECINUEVE',
  ];
  const centenas = [
    '',
    'CIENTO',
    'DOSCIENTOS',
    'TRESCIENTOS',
    'CUATROCIENTOS',
    'QUINIENTOS',
    'SEISCIENTOS',
    'SETECIENTOS',
    'OCHOCIENTOS',
    'NOVECIENTOS',
  ];

  function convertirGrupo(num: number): string {
    if (num === 0) return '';
    if (num === 100) return 'CIEN';

    let resultado = '';
    const c = Math.floor(num / 100);
    const d = Math.floor((num % 100) / 10);
    const u = num % 10;

    if (c > 0) {
      resultado += centenas[c];
    }

    if (d === 1) {
      // Casos especiales del 10 al 19
      resultado += (resultado ? ' ' : '') + especiales[u];
    } else {
      if (d > 0) {
        resultado += (resultado ? ' ' : '') + decenas[d];
      }
      if (u > 0) {
        resultado += (resultado ? ' Y ' : '') + unidades[u];
      }
    }

    return resultado;
  }

  const enteros = Math.floor(numero);
  if (enteros >= 1000000) {
    return 'MONTO DEMASIADO GRANDE';
  }

  if (enteros < 1000) {
    return convertirGrupo(enteros);
  }

  const miles = Math.floor(enteros / 1000);
  const resto = enteros % 1000;

  let resultado = '';
  if (miles === 1) {
    resultado = 'MIL';
  } else {
    resultado = convertirGrupo(miles) + ' MIL';
  }

  if (resto > 0) {
    resultado += ' ' + convertirGrupo(resto);
  }

  return resultado;
}

/**
 * Valida la estructura básica de una factura
 * @param factura Datos de la factura
 * @returns Array de errores encontrados
 */
export function validarEstructuraFactura(
  factura: Partial<FacturaData>
): string[] {
  const errores: string[] = [];

  if (!factura.serie || factura.serie.trim() === '') {
    errores.push('Serie es requerida');
  }

  if (!factura.numero || factura.numero.trim() === '') {
    errores.push('Número es requerido');
  }

  if (!factura.emisor) {
    errores.push('Datos del emisor son requeridos');
  }

  if (!factura.receptor) {
    errores.push('Datos del receptor son requeridos');
  }

  if (
    !factura.items ||
    !Array.isArray(factura.items) ||
    factura.items.length === 0
  ) {
    errores.push('Al menos un item es requerido');
  }

  if (!factura.fechaEmision || !(factura.fechaEmision instanceof Date)) {
    errores.push('Fecha de emisión válida es requerida');
  }

  return errores;
}

/**
 * Genera un hash simple para identificar únicamente una factura
 * @param factura Datos de la factura
 * @returns Hash generado
 */
export function generarHashFactura(factura: FacturaData): string {
  const datos = `${factura.serie}${factura.numero}${factura.emisor.numeroDocumento}${factura.fechaEmision.getTime()}`;

  // Hash simple usando charCodeAt
  let hash = 0;
  for (let i = 0; i < datos.length; i++) {
    const char = datos.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convertir a 32-bit integer
  }

  return Math.abs(hash).toString(16).toUpperCase();
}
