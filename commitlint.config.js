module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva funcionalidad
        'fix',      // Corrección de errores
        'docs',     // Documentación
        'style',    // Formateo, missing semi colons, etc; no code change
        'refactor', // Refactoring production code
        'test',     // Adding tests, refactoring test; no production code change
        'build',    // Cambios en el sistema de construcción o dependencias externas
        'ci',       // Cambios en archivos y scripts de CI
        'chore',    // Actualización de tareas de construcción, configuraciones del administrador de paquetes, etc; no hay cambios en el código de producción
        'revert',   // Revierte un commit anterior
        'perf',     // Mejoras de rendimiento
      ],
    ],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lowerCase'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};