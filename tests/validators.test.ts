import { validateRUC, validateDNI, validateDocumento, validateEmail, validateMonto } from '../src/validators';
import { TipoDocumento } from '../src/types';

describe('Validadores', () => {
  describe('validateRUC', () => {
    test('debe validar RUC válidos', () => {
      expect(validateRUC('20123456789')).toBe(true);
      expect(validateRUC('10123456789')).toBe(true);
    });

    test('debe rechazar RUC inválidos', () => {
      expect(validateRUC('12345678901')).toBe(false); // Prefijo inválido
      expect(validateRUC('2012345678')).toBe(false);  // Muy corto
      expect(validateRUC('201234567890')).toBe(false); // Muy largo
      expect(validateRUC('ABC12345678')).toBe(false);  // Contiene letras
      expect(validateRUC('')).toBe(false);             // Vacío
    });

    test('debe manejar valores null/undefined', () => {
      expect(validateRUC(null as any)).toBe(false);
      expect(validateRUC(undefined as any)).toBe(false);
    });
  });

  describe('validateDNI', () => {
    test('debe validar DNI válidos', () => {
      expect(validateDNI('12345678')).toBe(true);
      expect(validateDNI('87654321')).toBe(true);
    });

    test('debe rechazar DNI inválidos', () => {
      expect(validateDNI('01234567')).toBe(false); // Empieza con 0
      expect(validateDNI('1234567')).toBe(false);  // Muy corto
      expect(validateDNI('123456789')).toBe(false); // Muy largo
      expect(validateDNI('1234567A')).toBe(false);  // Contiene letras
      expect(validateDNI('')).toBe(false);          // Vacío
    });
  });

  describe('validateDocumento', () => {
    test('debe validar documentos según su tipo', () => {
      const resultadoDNI = validateDocumento(TipoDocumento.DNI, '12345678');
      expect(resultadoDNI.esValido).toBe(true);
      expect(resultadoDNI.errores).toHaveLength(0);

      const resultadoRUC = validateDocumento(TipoDocumento.RUC, '20123456789');
      expect(resultadoRUC.esValido).toBe(true);
      expect(resultadoRUC.errores).toHaveLength(0);
    });

    test('debe retornar errores para documentos inválidos', () => {
      const resultado = validateDocumento(TipoDocumento.DNI, '0123456');
      expect(resultado.esValido).toBe(false);
      expect(resultado.errores.length).toBeGreaterThan(0);
    });

    test('debe validar carné de extranjería', () => {
      const resultado = validateDocumento(TipoDocumento.CARNET_EXTRANJERIA, 'ABC123456');
      expect(resultado.esValido).toBe(true);
    });
  });

  describe('validateEmail', () => {
    test('debe validar emails válidos', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    test('debe rechazar emails inválidos', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateMonto', () => {
    test('debe validar montos válidos', () => {
      expect(validateMonto(0)).toBe(true);
      expect(validateMonto(100.50)).toBe(true);
      expect(validateMonto(1000000)).toBe(true);
    });

    test('debe rechazar montos inválidos', () => {
      expect(validateMonto(-1)).toBe(false);
      expect(validateMonto(Infinity)).toBe(false);
      expect(validateMonto(NaN)).toBe(false);
      expect(validateMonto('100' as any)).toBe(false);
    });
  });
});