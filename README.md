# Backend template

## Pasos iniciales

- Primer commit con el readme y el .gitignore(node modules).
- Conectar repositorio remoto, hacer push del primer commit y proteger la rama.
- Rama initial configs
- Iniciar proyecto npm -> npm i

### Husky + hooks

- Instalar Husky -> npx husky-init && npm install
- Añadir los hooks

### Prettier

- Paso lint-staged -> .lintstagedrc.json (Aplica el eslint y formatea con prettier)
- Instalar prettier como developer.
- Añadir .editorconfig
- Añadir .prettierrc

### Typescript

- Instalar Typescript -> npm i -D typescript @types/node
  - npx tsc --init (se necesita un archivo .ts)
- Añadir carpeta dist a .gitignore

### ESLint

- Añadir .eslintrc.js / .eslintrc.json
- Instalar eslint -> npm init @eslint/config

### Jest

- Instalar jest -> npm install --save-dev jest typescript ts-jest @types/jest
- npx ts-jest config:init
- Jest=true en eslint
- Añadir carpeta coverage a .gitignore

### Resolver

- Necesario para que funcionen los test
- Instalar -> npm i jest-ts-webcompat-resolver
- Añadir a Jest config -> "resolver": "jest-ts-webcompat-resolver"

### Babel // innecesario

- Instalar plugin de Babel para poder usar ES6 modules en Node.js:
- npm i -D @babel/plugin-transform-modules-commonjs
- Configurar Babel en el package.json para que use el plugin anterior:
  "babel": {
  "env": {
  "test": {
  "plugins": [
  "@babel/plugin-transform-modules-commonjs"
  ]
  }
  }
  }

### Sonar

- Añadir sonar-project.properties
- Añadir workflows (audit + sonar + test)

### Express

- Instalar express -> npm i express @types/express

### Debug // No funciona para EMS Modules

- Instalar debug -> npm i debug
- npm i -D @types/debug
- Está deshabilitado por defecto -> crear variable de entorno con dotenv
  - npm install dotenv --save
  - "moduleResolution" = "node" en .tsconfig
  - Añadir .env

### Bunyan

- Instalar bunyan -> npm i bunyan @types/bunyan

### Mongoose

- Instalar Mongoose -> npm i mongoose
