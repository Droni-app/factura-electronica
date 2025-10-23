import { 
  formatCurrency, 
  formatCurrencyByType, 
  formatDate, 
  formatDateTime,
  capitalizeWords,
  formatDocumento 
} from '../src/formatters';
import { TipoMoneda } from '../src/types';

describe('Formateadores', () => {
  describe('formatCurrency', () => {
    test('debe formatear montos básicos', () => {
      expect(formatCurrency(1000)).toBe('1,000.00');
      expect(formatCurrency(1234.56)).toBe('1,234.56');
      expect(formatCurrency(0)).toBe('0.00');
    });

    test('debe manejar configuración personalizada', () => {
      const config = {
        decimales: 3,
        separadorMiles: '.',
        separadorDecimal: ',',
        simboloMoneda: 'S/'
      };
      expect(formatCurrency(1234.567, config)).toBe('S/ 1.234,567');
    });

    test('debe manejar valores inválidos', () => {
      expect(formatCurrency(Infinity)).toBe('0.00');
      expect(formatCurrency(NaN)).toBe('0.00');
    });
  });

  describe('formatCurrencyByType', () => {
    test('debe formatear según el tipo de moneda', () => {
      expect(formatCurrencyByType(100, TipoMoneda.SOLES)).toBe('S/ 100.00');
      expect(formatCurrencyByType(100, TipoMoneda.DOLARES)).toBe('$ 100.00');
      expect(formatCurrencyByType(100, TipoMoneda.EUROS)).toBe('€ 100.00');
    });
  });

  describe('formatDate', () => {
    test('debe formatear fechas correctamente', () => {
      const fecha = new Date(2023, 11, 25); // 25 de diciembre 2023
      expect(formatDate(fecha)).toBe('25/12/2023');
    });

    test('debe manejar fechas inválidas', () => {
      expect(formatDate(new Date('invalid'))).toBe('');
      expect(formatDate(null as any)).toBe('');
    });
  });

  describe('formatDateTime', () => {
    test('debe formatear fecha y hora', () => {
      const fecha = new Date(2023, 11, 25, 14, 30, 45);
      expect(formatDateTime(fecha)).toBe('25/12/2023 14:30:45');
    });
  });

  describe('capitalizeWords', () => {
    test('debe capitalizar palabras', () => {
      expect(capitalizeWords('juan pérez lópez')).toBe('Juan Pérez López');
      expect(capitalizeWords('EMPRESA SAC')).toBe('Empresa Sac');
    });

    test('debe manejar textos vacíos', () => {
      expect(capitalizeWords('')).toBe('');
      expect(capitalizeWords(null as any)).toBe('');
    });
  });

  describe('formatDocumento', () => {
    test('debe formatear DNI', () => {
      expect(formatDocumento('12345678', 'DNI')).toBe('1234-5678');
    });

    test('debe formatear RUC', () => {
      expect(formatDocumento('20123456789', 'RUC')).toBe('20-12345678-9');
    });

    test('debe manejar documentos con caracteres especiales', () => {
      expect(formatDocumento('123-456-78', 'DNI')).toBe('1234-5678');
    });

    test('debe retornar documento sin formato para otros tipos', () => {
      expect(formatDocumento('ABC123', 'OTROS')).toBe('123');
    });
  });
});