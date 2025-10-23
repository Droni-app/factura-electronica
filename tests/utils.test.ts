import {
  calcularIGV,
  calcularMontoSinIGV,
  calcularTotalesFactura,
  generarNumeroSerie,
  numeroEnPalabras,
  validarEstructuraFactura,
  generarHashFactura
} from '../src/utils';
import { Item, FacturaData, TipoComprobante, TipoMoneda, TipoDocumento } from '../src/types';

describe('Utilidades', () => {
  describe('calcularIGV', () => {
    test('debe calcular IGV correctamente', () => {
      expect(calcularIGV(100)).toBe(18);
      expect(calcularIGV(1000)).toBe(180);
      expect(calcularIGV(0)).toBe(0);
    });

    test('debe manejar valores inválidos', () => {
      expect(calcularIGV(-100)).toBe(0);
      expect(calcularIGV(Infinity)).toBe(0);
      expect(calcularIGV(NaN)).toBe(0);
    });
  });

  describe('calcularMontoSinIGV', () => {
    test('debe calcular monto sin IGV', () => {
      expect(calcularMontoSinIGV(118)).toBe(100);
      expect(calcularMontoSinIGV(1180)).toBe(1000);
    });
  });

  describe('calcularTotalesFactura', () => {
    test('debe calcular totales de items', () => {
      const items: Item[] = [
        {
          codigo: '001',
          descripcion: 'Producto 1',
          cantidad: 1,
          unidadMedida: 'NIU',
          valorUnitario: 100,
          valorTotal: 100,
          igv: 18,
          tipoAfectacion: '10'
        },
        {
          codigo: '002',
          descripcion: 'Producto 2',
          cantidad: 2,
          unidadMedida: 'NIU',
          valorUnitario: 50,
          valorTotal: 100,
          igv: 18,
          tipoAfectacion: '10'
        }
      ];

      const totales = calcularTotalesFactura(items);
      expect(totales.subtotal).toBe(200);
      expect(totales.igv).toBe(36);
      expect(totales.total).toBe(236);
    });

    test('debe manejar array vacío', () => {
      const totales = calcularTotalesFactura([]);
      expect(totales.subtotal).toBe(0);
      expect(totales.igv).toBe(0);
      expect(totales.total).toBe(0);
    });
  });

  describe('generarNumeroSerie', () => {
    test('debe generar número de serie correlativo', () => {
      expect(generarNumeroSerie('F001', 0)).toBe('F001-00000001');
      expect(generarNumeroSerie('B001', 99)).toBe('B001-00000100');
    });
  });

  describe('numeroEnPalabras', () => {
    test('debe convertir números básicos', () => {
      expect(numeroEnPalabras(0)).toBe('CERO');
      expect(numeroEnPalabras(1)).toBe('UNO');
      expect(numeroEnPalabras(10)).toBe('DIEZ');
      expect(numeroEnPalabras(20)).toBe('VEINTE');
      expect(numeroEnPalabras(100)).toBe('CIEN');
    });

    test('debe convertir números compuestos', () => {
      expect(numeroEnPalabras(21)).toBe('VEINTE Y UNO');
      expect(numeroEnPalabras(101)).toBe('CIENTO Y UNO');
      expect(numeroEnPalabras(1000)).toBe('MIL');
      expect(numeroEnPalabras(1001)).toBe('MIL UNO');
    });

    test('debe manejar números grandes', () => {
      expect(numeroEnPalabras(999999)).toBe('NOVECIENTOS NOVENTA Y NUEVE MIL NOVECIENTOS NOVENTA Y NUEVE');
      expect(numeroEnPalabras(1000000)).toBe('MONTO DEMASIADO GRANDE');
    });

    test('debe manejar valores inválidos', () => {
      expect(numeroEnPalabras(-1)).toBe('');
      expect(numeroEnPalabras(Infinity)).toBe('');
      expect(numeroEnPalabras(NaN)).toBe('');
    });
  });

  describe('validarEstructuraFactura', () => {
    const facturaBasica: Partial<FacturaData> = {
      serie: 'F001',
      numero: '00000001',
      tipoComprobante: TipoComprobante.FACTURA,
      moneda: TipoMoneda.SOLES,
      fechaEmision: new Date(),
      emisor: {
        tipoDocumento: TipoDocumento.RUC,
        numeroDocumento: '20123456789',
        razonSocial: 'Empresa SAC'
      },
      receptor: {
        tipoDocumento: TipoDocumento.DNI,
        numeroDocumento: '12345678',
        razonSocial: 'Cliente'
      },
      items: [{
        codigo: '001',
        descripcion: 'Producto',
        cantidad: 1,
        unidadMedida: 'NIU',
        valorUnitario: 100,
        valorTotal: 100,
        igv: 18,
        tipoAfectacion: '10'
      }],
      subtotal: 100,
      igv: 18,
      total: 118
    };

    test('debe validar factura completa', () => {
      const errores = validarEstructuraFactura(facturaBasica);
      expect(errores).toHaveLength(0);
    });

    test('debe detectar campos faltantes', () => {
      const facturaIncompleta = { ...facturaBasica };
      delete facturaIncompleta.serie;
      delete facturaIncompleta.emisor;

      const errores = validarEstructuraFactura(facturaIncompleta);
      expect(errores.length).toBeGreaterThan(0);
      expect(errores).toContain('Serie es requerida');
      expect(errores).toContain('Datos del emisor son requeridos');
    });
  });

  describe('generarHashFactura', () => {
    test('debe generar hash único', () => {
      const factura: FacturaData = {
        serie: 'F001',
        numero: '00000001',
        tipoComprobante: TipoComprobante.FACTURA,
        moneda: TipoMoneda.SOLES,
        fechaEmision: new Date('2023-12-25'),
        emisor: {
          tipoDocumento: TipoDocumento.RUC,
          numeroDocumento: '20123456789',
          razonSocial: 'Empresa SAC'
        },
        receptor: {
          tipoDocumento: TipoDocumento.DNI,
          numeroDocumento: '12345678',
          razonSocial: 'Cliente'
        },
        items: [],
        subtotal: 100,
        igv: 18,
        total: 118
      };

      const hash1 = generarHashFactura(factura);
      const hash2 = generarHashFactura(factura);
      
      expect(hash1).toBe(hash2); // Mismo input, mismo hash
      expect(typeof hash1).toBe('string');
      expect(hash1.length).toBeGreaterThan(0);

      // Cambiar algo y verificar que el hash cambie
      factura.numero = '00000002';
      const hash3 = generarHashFactura(factura);
      expect(hash3).not.toBe(hash1);
    });
  });
});