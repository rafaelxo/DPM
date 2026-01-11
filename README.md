# 🚀 GitHub Dashboard DPM

Dashboard pessoal para visualizar estatísticas e dados do GitHub usando a API oficial do GitHub.

![GitHub](https://img.shields.io/badge/GitHub-API-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61dafb)

## 📊 Funcionalidades

- ✅ Visualização completa do perfil do GitHub
- ✅ Estatísticas de repositórios (stars, forks, etc)
- ✅ Gráfico de linguagens de programação mais usadas
- ✅ Top 5 repositórios por popularidade
- ✅ Lista de issues abertas
- ✅ Atualização em tempo real dos dados

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Octokit** - Cliente oficial da API do GitHub
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Controle de acesso entre origens

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool e dev server
- **CSS3** - Estilização

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Conta no GitHub
- Personal Access Token do GitHub

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/rafaelxo/DPM.git
cd DPM
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione seu token do GitHub:
```
GITHUB_TOKEN=seu_token_aqui
PORT=5000
```

**Como obter o GitHub Token:**
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione os escopos:  `repo`, `user`, `read:org`
4. Copie o token gerado

Inicie o servidor:
```bash
npm run dev
```

### 3. Configure o Frontend

Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

### 4. Acesse a aplicação

Abra seu navegador em:  **http://localhost:5173**

## 📸 Screenshots

(Adicione screenshots da sua aplicação aqui)

## 🔑 Variáveis de Ambiente

### Backend (`backend/.env`)
```
GITHUB_TOKEN=seu_personal_access_token
PORT=5000
```

## 📚 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/user` | Retorna dados do usuário autenticado |
| GET | `/api/repos` | Lista todos os repositórios do usuário |
| GET | `/api/stats` | Retorna estatísticas compiladas |
| GET | `/api/issues` | Lista issues abertas do usuário |
| GET | `/api/commits/: owner/:repo` | Lista commits de um repositório |

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Rafael**
- GitHub: [@rafaelxo](https://github.com/rafaelxo)

## 🙏 Agradecimentos

- GitHub API Documentation
- Comunidade React
- Comunidade Node.js

---

⭐ Se este projeto te ajudou, considere dar uma estrela! 
