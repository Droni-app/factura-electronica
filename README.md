# Factura Electrónica Library

Una biblioteca de funciones útiles para facturación electrónica en TypeScript.

## 🚀 Características

- ✅ **TypeScript**: Tipado fuerte y mejor experiencia de desarrollo
- ✅ **Validaciones**: Funciones para validar documentos de identidad, RUC, etc.
- ✅ **Formateadores**: Utilidades para formatear montos, fechas y textos
- ✅ **Utilidades**: Herramientas comunes para facturación electrónica
- ✅ **Testing**: Suite completa de pruebas con Jest
- ✅ **Linting**: ESLint + Prettier para código consistente

## 📦 Instalación

```bash
npm install factura-electronica
```

## 🛠️ Uso

```typescript
import { validateRUC, formatCurrency, FacturaData } from 'factura-electronica';

// Validar RUC
const isValidRUC = validateRUC('20123456789');
console.log(isValidRUC); // true o false

// Formatear moneda
const formatted = formatCurrency(1500.50);
console.log(formatted); // "1,500.50"
```

## 🏗️ Desarrollo

### Prerrequisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

### Comandos disponibles

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Modo desarrollo con watch
npm run build:watch

# Ejecutar tests
npm run test

# Tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Formateo de código
npm run format
npm run format:check

# Limpiar directorio dist
npm run clean
```

## 📁 Estructura del proyecto

```
factura-electronica/
├── src/
│   ├── types/          # Definiciones de tipos TypeScript
│   ├── validators/     # Funciones de validación
│   ├── formatters/     # Funciones de formateo
│   ├── utils/          # Utilidades generales
│   └── index.ts        # Punto de entrada principal
├── tests/              # Pruebas unitarias
├── dist/               # Código compilado
├── docs/               # Documentación
└── ...archivos de configuración
```

## 🧪 Testing

Este proyecto utiliza Jest para las pruebas. Los tests se encuentran en el directorio `tests/` y siguen la convención de nombres `*.test.ts` o `*.spec.ts`.

```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## 📝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

Si tienes alguna pregunta o problema, no dudes en:

- Crear un issue en GitHub
- Contactar al equipo de desarrollo

---

Hecho con ❤️ para la comunidad de desarrollo peruano