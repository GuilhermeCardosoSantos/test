# 🚀 Projeto Next.js — Catálogo de Produtos

## 📦 1. Setup do Projeto

### 🔽 Clonar o repositório
```bash
git clone https://github.com/GuilhermeCardosoSantos/test.git

cd test
```

### 📥 Instalar dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

---

### ⚙️ Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_API_BASE=https://apihomolog.innovationbrindes.com.br/api/innova-dinamica
```

---

### ▶️ Rodar o projeto
```
npm run dev
```

Acesse:
```
http://localhost:3000
```

---
## ✅ Funcionalidades Implementadas

### 🔐 Autenticação
✔ Login com email e senha  
✔ Persistência de token  
✔ Redirecionamento após login  
✔ Proteção de rotas privadas  

---

### 🛍️ Produtos
✔ Listagem em grid responsivo  
✔ Busca com debounce  
✔ Filtro por nome/código  
✔ Paginação / scroll infinito  
✔ Ordenação por nome e preço  

---

### 🔍 Detalhes
✔ Modal de visualização do produto  
✔ Fechamento por botão e ESC  

---

### ⭐ Favoritos
✔ Marcar/desmarcar produtos  
✔ Persistência em localStorage  
✔ Filtro de favoritos  

---

### 🎯 Estados da UI
✔ Loading (skeleton)  
✔ Tratamento de erro com retry  
✔ Logout automático em caso de 401  
✔ Preços formatados em BRL  

---

## ⚙️ Tecnologias Principais

✔ Next.js + TypeScript  
✔ Zustand  
✔ React Query / SWR  
✔ Tailwind CSS  

---

## 🌟 Diferenciais

✔ Rotas protegidas  
✔ Code splitting (modal lazy)  
✔ Teste E2E (Playwright)  
✔ Boas práticas de performance e UX  

---

## 🧠 Decisões Técnicas

- **React Query / SWR**: para facilitar cache, loading e atualização de dados  
- **Playwright**: para validar o fluxo principal da aplicação de ponta a ponta  
- **Vitest**: escolhido para testes unitários por ser rápido, simples de configurar e integrar
---

## 📊 Lighthouse

### Desktop (Performance e Acessibilidade)

📌 Resultado obtido:

### SignIn
![Lighthouse Desktop SignIn](./public/page-signin.gif)


### Produtos
![Lighthouse Desktop Produtos](./public/page-produtos.gif)

---


## 👨‍💻 Autor

Guilherme Cardoso