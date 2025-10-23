# Semantic Release y CI/CD

Este proyecto utiliza **semantic-release** para automatizar el versionado y publicación de paquetes basado en **Conventional Commits**.

## 🏗️ Estructura de Ramas

### Rama `main`
- **Propósito**: Versiones estables para producción
- **Publicación**: Tag `latest` en NPM
- **Activación**: Push a `main` (generalmente desde merge de PR)

### Rama `develop`
- **Propósito**: Versiones pre-release para testing
- **Publicación**: Tag `next` en NPM  
- **Activación**: Push a `develop`

## 📋 Conventional Commits

Este proyecto sigue la especificación de [Conventional Commits](https://www.conventionalcommits.org/). El formato es:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos de Commit

| Tipo | Descripción | Versión |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `minor` |
| `fix` | Corrección de errores | `patch` |
| `perf` | Mejoras de rendimiento | `patch` |
| `refactor` | Refactoring de código | `patch` |
| `revert` | Revierte un commit anterior | `patch` |
| `docs` | Solo documentación | No libera |
| `style` | Formateo, lint, etc. | No libera |
| `test` | Pruebas | No libera |
| `build` | Sistema de construcción | No libera |
| `ci` | Configuración de CI | No libera |
| `chore` | Mantenimiento | No libera |

### Breaking Changes
Para indicar un **breaking change** (versión `major`):
- Agregar `!` después del tipo: `feat!: nueva API incompatible`
- O incluir `BREAKING CHANGE:` en el footer

### Ejemplos de Commits

```bash
# Feature (minor version)
feat(validators): add new email validation function

# Bug fix (patch version)
fix(formatters): correct currency formatting for zero values

# Breaking change (major version)
feat(api)!: remove deprecated validateOldRUC function

BREAKING CHANGE: validateOldRUC function has been removed, use validateRUC instead
```

## 🚀 Flujo de Trabajo

### Para Desarrollo (rama `develop`)

1. **Crear feature branch desde `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Desarrollo y commits**:
   ```bash
   # Usar commitizen para commits consistentes
   npm run commit
   
   # O hacer commit manual siguiendo conventional commits
   git commit -m "feat(validators): add CUIT validation for Argentina"
   ```

3. **Push y crear PR a `develop`**:
   ```bash
   git push origin feature/nueva-funcionalidad
   # Crear PR desde GitHub hacia develop
   ```

4. **Merge a `develop`**: 
   - Al hacer merge, se activará CI/CD
   - Se publicará versión `next` automáticamente

### Para Producción (rama `main`)

1. **Crear release branch desde `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.2.0
   ```

2. **Preparar release** (opcional):
   - Actualizar documentación
   - Últimos ajustes
   
3. **PR a `main`**:
   ```bash
   git push origin release/v1.2.0
   # Crear PR desde GitHub hacia main
   ```

4. **Merge a `main`**:
   - Al hacer merge, se activará CI/CD
   - Se publicará versión `latest` automáticamente
   - Se creará tag de GitHub
   - Se generará CHANGELOG.md

## ⚙️ CI/CD Pipeline

### Verificaciones (en PRs y pushes)
- ✅ **Linting**: ESLint con reglas TypeScript
- ✅ **Formato**: Prettier code formatting
- ✅ **Tests**: Jest con cobertura de código
- ✅ **Build**: Compilación TypeScript
- ✅ **Matrix Testing**: Node.js 18.x y 20.x

### Release (solo en main/develop)
- 📦 **Análisis**: Conventional commits para determinar versión
- 📝 **Changelog**: Generación automática
- 🏷️ **Tagging**: Creación de tags Git
- 📤 **NPM**: Publicación del paquete
- 🎉 **GitHub**: Release con notas

## 🔧 Comandos Útiles

```bash
# Commit interactivo con commitizen
npm run commit

# Release manual (solo para testing local)
npm run semantic-release

# Verificar formato de commits
npx commitlint --from HEAD~1 --to HEAD --verbose

# Verificar qué se publicaría (dry-run)
npx semantic-release --dry-run
```

## 🛠️ Configuración de Secretos

Para que funcione el CI/CD, configura estos secretos en GitHub:

### GitHub Repository Secrets
1. **`NPM_TOKEN`**: Token de NPM para publicación
   - Ir a npmjs.com → Account → Access Tokens
   - Crear token con permisos de "Automation"

2. **`CODECOV_TOKEN`** (opcional): Para reporte de cobertura
   - Registrarse en codecov.io
   - Agregar el repositorio

### Configuración NPM Token
```bash
# En tu local, para testing
npm login
npm whoami  # Verificar autenticación

# Para CI/CD, agregar NPM_TOKEN en GitHub Secrets
```

## 📊 Versionado Automático

### Ejemplos de Versionado

| Commits desde último release | Nueva versión |
|------------------------------|---------------|
| `fix: bug fix` | `1.0.1` |
| `feat: new feature` | `1.1.0` |
| `feat!: breaking change` | `2.0.0` |
| `docs: update readme` | No release |

### Ramas y Tags NPM

```bash
# main branch → latest tag
npm install @dronico/factura-electronica          # última versión estable
npm install @dronico/factura-electronica@latest   # última versión estable

# develop branch → next tag  
npm install @dronico/factura-electronica@next     # última versión pre-release
```

## 🔍 Monitoreo

### Ver Releases
- **GitHub**: `https://github.com/Droni-app/factura-electronica/releases`
- **NPM**: `https://www.npmjs.com/package/@dronico/factura-electronica`

### Verificar Publicación
```bash
npm view @dronico/factura-electronica versions --json
npm view @dronico/factura-electronica dist-tags --json
```

## 🐛 Troubleshooting

### Error de Publicación NPM
```bash
# Verificar autenticación
npm whoami

# Verificar permisos del paquete
npm access list packages

# Re-autenticar
npm logout && npm login
```

### Error de Semantic Release
```bash
# Ver logs detallados
npx semantic-release --debug

# Verificar configuración
npx semantic-release --dry-run
```

### Git Hooks Fallan
```bash
# Reinstalar husky
npm run prepare

# Verificar permisos
chmod +x .husky/*
```

## 📚 Referencias

- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://commitlint.js.org/)
- [Husky](https://typicode.github.io/husky/)