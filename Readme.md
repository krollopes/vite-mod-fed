# 🏗️ Experimentos com Module Federation

Este repositório contém três mini projetos que exploram o uso do **plugin de module federation para Vite**, permitindo compartilhamento de código entre aplicações em tempo de execução. Além disso, o projeto também demonstra a interoperabilidade entre **Vite, Rollup e Webpack**.

## 📌 Projetos

### 1️⃣ Host (Vite + React)
O **Host** é um aplicativo React configurado com Vite que **consome módulos expostos pelo projeto Remote**.

📂 **Estrutura de Arquivos**
```bash
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

🚀 **Comandos**
```bash
pnpm dev        # Inicia o servidor de desenvolvimento
pnpm build      # Compila o projeto para produção
pnpm preview    # Visualiza a build de produção
```

### 2️⃣ Remote (Vite + React)
O **Remote** é um aplicativo React configurado com Vite que **expõe módulos utilizando o plugin de module federation**.

📂 **Estrutura de Arquivos**
```bash
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

🚀 **Comandos**
```bash
pnpm dev        # Inicia o servidor de desenvolvimento na porta 5001
pnpm build      # Compila o projeto para produção
pnpm preview    # Visualiza a build de produção na porta 5001
pnpm serve      # Serve a build de produção na porta 5001
```

### 3️⃣ Webpack Host (Webpack + React)
O **Webpack Host** é um aplicativo React configurado com Webpack que **consome módulos expostos pelo projeto Remote**.

📂 **Estrutura de Arquivos**
```bash
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

🚀 **Comandos**
```bash
pnpm dev        # Inicia o servidor de desenvolvimento
pnpm build      # Compila o projeto para produção
```

---

## ⚙️ Configuração do Module Federation

### 🛠️ Vite (Host e Remote)
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

### 🛠️ Webpack (Webpack Host)
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

---

## 🔄 Fluxo de Desenvolvimento
Sempre que houver mudanças no projeto **Remote**, execute os seguintes comandos:

```bash
# No Remote
pnpm build && pnpm serve

# No Host
pnpm build && pnpm preview
```

---

## 📢 Conclusão

Esses três mini projetos demonstram como utilizar o **plugin do Vite para module federation** para compartilhar código entre aplicativos ao vivo e integrar diferentes ferramentas como **Vite, Rollup e Webpack**. 

Se tiver sugestões ou dúvidas, sinta-se à vontade para abrir uma issue! 🚀
