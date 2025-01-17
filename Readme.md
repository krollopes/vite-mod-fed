```markdown
# Experimentos com Module Federation

Este repositório contém três mini projetos para experimentar o plugin do Vite para module federation, que permite compartilhar código entre aplicativos ao vivo. Ele também permite trocar código entre Vite, Rollup e Webpack.

## Projetos

### 1. Host

O projeto Host é um aplicativo React configurado com Vite que utiliza o plugin de module federation para consumir módulos expostos pelo projeto Remote.

#### Estrutura de Arquivos

```
host/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public/
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── index.css
│   ├── main.jsx
├── vite.config.js
```

#### Comandos

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run preview`: Visualiza a build de produção.

### 2. Remote

O projeto Remote é um aplicativo React configurado com Vite que expõe módulos utilizando o plugin de module federation.

#### Estrutura de Arquivos

```
remote/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public/
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── Button.css
│   ├── Button.jsx
│   ├── index.css
│   ├── main.jsx
├── vite.config.js
```

#### Comandos

- `npm run dev`: Inicia o servidor de desenvolvimento na porta 5001.
- `npm run build`: Compila o projeto para produção.
- `npm run preview`: Visualiza a build de produção na porta 5001.
- `npm run serve`: Serve a build de produção na porta 5001.

### 3. Webpack Host

O projeto Webpack Host é um aplicativo React configurado com Webpack que consome um módulo exposto pelo projeto Remote.

#### Estrutura de Arquivos

```
webpack-host/
├── .babelrc
├── .gitignore
├── compilation.config.js
├── index.ejs
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── App.jsx
├── webpack.config.js
```

#### Comandos

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.

## Configuração do Plugin de Module Federation

### Vite (Host e Remote)

No arquivo `vite.config.js`, o plugin de module federation é configurado da seguinte forma:

```js
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
        "./store": "./src/store",
      },
      shared: ["react", "react-dom", "jotai"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

### Webpack (Webpack Host)

No arquivo `webpack.config.js`, o plugin de module federation é configurado da seguinte forma:

```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // Configurações do Webpack
  plugins: [
    new ModuleFederationPlugin({
      name: "webpack_host",
      remotes: {
        remote_app: "remote_app@http://localhost:5001/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
```

## Instruções Adicionais

Sempre que houver mudanças no projeto Remote, é necessário rodar os seguintes comandos:

- No Remote: `yarn build && yarn serve`
- No Host: `pnpm build && pnpm preview`

## Conclusão

Esses três mini projetos demonstram como utilizar o plugin do Vite para module federation para compartilhar código entre aplicativos ao vivo e trocar código entre Vite, Rollup e Webpack.
```

Similar code found with 2 license types