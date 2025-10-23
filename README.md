# Factura Electrónica Library

[![CI/CD Pipeline](https://github.com/Droni-app/factura-electronica/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/Droni-app/factura-electronica/actions)
[![NPM Version](https://img.shields.io/npm/v/@dronico/factura-electronica.svg)](https://www.npmjs.com/package/@dronico/factura-electronica)
[![Coverage](https://codecov.io/gh/Droni-app/factura-electronica/branch/main/graph/badge.svg)](https://codecov.io/gh/Droni-app/factura-electronica)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release: conventional commits](https://img.shields.io/badge/semantic--release-conventional%20commits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

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
# Versión estable (latest)
npm install @dronico/factura-electronica

# Versión de desarrollo (next)
npm install @dronico/factura-electronica@next
```

## 🛠️ Uso

```typescript
import { validateRUC, formatCurrency, FacturaData } from '@dronico/factura-electronica';

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

## 🤝 Contribuir

Este proyecto utiliza [Conventional Commits](https://www.conventionalcommits.org/) y [Semantic Release](https://semantic-release.gitbook.io/) para automatizar el versionado y publicación.

### Flujo de Trabajo

1. **Fork** el proyecto
2. **Crear** rama desde `develop`: `git checkout -b feature/amazing-feature`  
3. **Commit** usando conventional commits: `npm run commit`
4. **Push** a tu fork: `git push origin feature/amazing-feature`
5. **Crear** Pull Request hacia `develop`

### Branches

- `main`: Versiones estables → publica `latest` en NPM
- `develop`: Versiones pre-release → publica `next` en NPM

### Commits

Usa `npm run commit` para crear commits con formato correcto:

```bash
npm run commit
```

O manualmente siguiendo [Conventional Commits](https://www.conventionalcommits.org/):
```bash
feat(validators): add new validation function
fix(formatters): correct currency display
docs(readme): update installation instructions
```

📖 **Ver guía completa**: [docs/semantic-release.md](docs/semantic-release.md)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

Si tienes alguna pregunta o problema, no dudes en:

- Crear un issue en GitHub
- Contactar al equipo de desarrollo

---

Hecho con ❤️ para la comunidad de desarrollo peruano