/**
 * Tipos comunes para facturación electrónica
 */

// Tipos de documentos de identidad
export enum TipoDocumento {
  DNI = '1',
  CARNET_EXTRANJERIA = '4',
  RUC = '6',
  PASAPORTE = '7',
}

// Tipos de comprobantes
export enum TipoComprobante {
  FACTURA = '01',
  BOLETA = '03',
  NOTA_CREDITO = '07',
  NOTA_DEBITO = '08',
}

// Monedas
export enum TipoMoneda {
  SOLES = 'PEN',
  DOLARES = 'USD',
  EUROS = 'EUR',
}

// Datos básicos de una persona/empresa
export interface Entidad {
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  razonSocial: string;
  direccion?: string;
  email?: string;
  telefono?: string;
}

// Item de factura
export interface Item {
  codigo: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  valorUnitario: number;
  valorTotal: number;
  igv: number;
  tipoAfectacion: string;
}

// Estructura básica de factura
export interface FacturaData {
  serie: string;
  numero: string;
  tipoComprobante: TipoComprobante;
  moneda: TipoMoneda;
  fechaEmision: Date;
  emisor: Entidad;
  receptor: Entidad;
  items: Item[];
  subtotal: number;
  igv: number;
  total: number;
  observaciones?: string;
}

// Resultado de validación
export interface ValidacionResultado {
  esValido: boolean;
  errores: string[];
}

// Configuración de formateo
export interface ConfiguracionFormato {
  decimales?: number;
  separadorMiles?: string;
  separadorDecimal?: string;
  simboloMoneda?: string;
}
