# Ejemplos de Uso

Esta documentación muestra ejemplos prácticos de cómo usar la librería de facturación electrónica.

## Instalación

```bash
npm install factura-electronica
```

## Importación

```typescript
import {
  validateRUC,
  validateDNI,
  formatCurrency,
  formatCurrencyByType,
  calcularIGV,
  numeroEnPalabras,
  FacturaData,
  TipoDocumento,
  TipoMoneda,
  TipoComprobante
} from 'factura-electronica';
```

## Validación de Documentos

### Validar RUC

```typescript
const ruc = '20123456789';
const esValido = validateRUC(ruc);
console.log(`¿Es válido el RUC ${ruc}?`, esValido); // true o false
```

### Validar DNI

```typescript
const dni = '12345678';
const esValido = validateDNI(dni);
console.log(`¿Es válido el DNI ${dni}?`, esValido); // true o false
```

### Validar Documento Genérico

```typescript
import { validateDocumento, TipoDocumento } from 'factura-electronica';

const resultado = validateDocumento(TipoDocumento.RUC, '20123456789');
if (resultado.esValido) {
  console.log('Documento válido');
} else {
  console.log('Errores encontrados:', resultado.errores);
}
```

## Formateo de Montos

### Formateo Básico

```typescript
const monto = 1500.75;
const montoFormateado = formatCurrency(monto);
console.log(montoFormateado); // "1,500.75"
```

### Formateo con Configuración Personalizada

```typescript
const config = {
  decimales: 3,
  separadorMiles: '.',
  separadorDecimal: ',',
  simboloMoneda: 'S/'
};

const montoFormateado = formatCurrency(1234.567, config);
console.log(montoFormateado); // "S/ 1.234,567"
```

### Formateo por Tipo de Moneda

```typescript
const montoSoles = formatCurrencyByType(100, TipoMoneda.SOLES);
console.log(montoSoles); // "S/ 100.00"

const montoDolares = formatCurrencyByType(100, TipoMoneda.DOLARES);
console.log(montoDolares); // "$ 100.00"
```

## Cálculos de IGV

### Calcular IGV de un Monto

```typescript
const montoSinIGV = 100;
const igv = calcularIGV(montoSinIGV);
console.log(`IGV de ${montoSinIGV}:`, igv); // 18.00
```

### Calcular Monto sin IGV

```typescript
import { calcularMontoSinIGV } from 'factura-electronica';

const montoConIGV = 118;
const montoSinIGV = calcularMontoSinIGV(montoConIGV);
console.log(`Monto sin IGV de ${montoConIGV}:`, montoSinIGV); // 100.00
```

## Conversión de Números a Palabras

```typescript
const numero = 1500;
const numeroEnTexto = numeroEnPalabras(numero);
console.log(`${numero} en palabras:`, numeroEnTexto); // "MIL QUINIENTOS"
```

## Formateo de Fechas

```typescript
import { formatDate, formatDateTime } from 'factura-electronica';

const fecha = new Date();
const fechaFormateada = formatDate(fecha);
console.log('Fecha:', fechaFormateada); // "25/12/2023"

const fechaHoraFormateada = formatDateTime(fecha);
console.log('Fecha y hora:', fechaHoraFormateada); // "25/12/2023 14:30:45"
```

## Crear una Factura Completa

```typescript
const factura: FacturaData = {
  serie: 'F001',
  numero: '00000001',
  tipoComprobante: TipoComprobante.FACTURA,
  moneda: TipoMoneda.SOLES,
  fechaEmision: new Date(),
  emisor: {
    tipoDocumento: TipoDocumento.RUC,
    numeroDocumento: '20123456789',
    razonSocial: 'Mi Empresa SAC',
    direccion: 'Av. Principal 123, Lima',
    email: 'contacto@miempresa.com'
  },
  receptor: {
    tipoDocumento: TipoDocumento.DNI,
    numeroDocumento: '12345678',
    razonSocial: 'Juan Pérez García',
    direccion: 'Jr. Los Olivos 456, Lima'
  },
  items: [
    {
      codigo: 'PROD001',
      descripcion: 'Producto de ejemplo',
      cantidad: 2,
      unidadMedida: 'NIU',
      valorUnitario: 100,
      valorTotal: 200,
      igv: 36,
      tipoAfectacion: '10'
    }
  ],
  subtotal: 200,
  igv: 36,
  total: 236,
  observaciones: 'Factura de ejemplo'
};

// Validar estructura
import { validarEstructuraFactura } from 'factura-electronica';
const errores = validarEstructuraFactura(factura);
if (errores.length === 0) {
  console.log('Factura válida');
} else {
  console.log('Errores en la factura:', errores);
}
```

## Calcular Totales Automáticamente

```typescript
import { calcularTotalesFactura } from 'factura-electronica';

const items = [
  {
    codigo: 'PROD001',
    descripcion: 'Producto 1',
    cantidad: 1,
    unidadMedida: 'NIU',
    valorUnitario: 100,
    valorTotal: 100,
    igv: 18,
    tipoAfectacion: '10'
  },
  {
    codigo: 'PROD002',
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
console.log('Subtotal:', totales.subtotal); // 200
console.log('IGV:', totales.igv); // 36
console.log('Total:', totales.total); // 236
```

## Generar Números de Serie

```typescript
import { generarNumeroSerie } from 'factura-electronica';

const serie = 'F001';
const ultimoNumero = 5;
const siguienteNumero = generarNumeroSerie(serie, ultimoNumero);
console.log('Siguiente número:', siguienteNumero); // "F001-00000006"
```

## Generar Hash de Factura

```typescript
import { generarHashFactura } from 'factura-electronica';

const hashFactura = generarHashFactura(factura);
console.log('Hash de la factura:', hashFactura); // Ej: "A1B2C3D4"
```

## Manejo de Errores

La librería incluye validaciones robustas que manejan casos edge:

```typescript
// Validaciones que retornan false para valores inválidos
console.log(validateRUC('')); // false
console.log(validateDNI('abc')); // false

// Formateos que manejan valores inválidos
console.log(formatCurrency(NaN)); // "0.00"
console.log(formatDate(new Date('invalid'))); // ""

// Cálculos que manejan valores inválidos
console.log(calcularIGV(-100)); // 0
console.log(numeroEnPalabras(-1)); // ""
```

## TypeScript

La librería está completamente tipada en TypeScript, lo que proporciona:

- Autocompletado en IDEs
- Detección de errores en tiempo de compilación
- Documentación inline de funciones y parámetros
- Mejor experiencia de desarrollo

```typescript
// Los tipos están disponibles automáticamente
const factura: FacturaData = {
  // TypeScript te ayudará con el autocompletado
  serie: 'F001',
  tipoComprobante: TipoComprobante.FACTURA, // Autocompletado de enum
  // ... resto de propiedades
};
```