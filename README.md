# KodaPet Mobile 🐾

Aplicativo mobile de petshop desenvolvido com **React Native + Expo**, inspirado na Petlove.com.br.
Projeto acadêmico para a disciplina de Mobile Application Development.

---

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo SDK 51](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/) — navegação baseada em arquivos
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) — persistência local
- TypeScript

---

## 📱 Telas e Funcionalidades

| Tela | Rota | Descrição |
|---|---|---|
| Início | `/(tabs)` | Banner, categorias, produtos e serviços em destaque |
| Produtos | `/(tabs)/produtos` | Listagem com busca e filtro por categoria |
| Serviços | `/(tabs)/servicos` | Banho, hospedagem, veterinário, creche e mais |
| Carrinho | `/(tabs)/carrinho` | Gerenciamento de itens com persistência AsyncStorage |
| Perfil | `/(tabs)/perfil` | Dados do usuário logado + logout |
| Login | `/(auth)/login` | Formulário controlado com useState + AsyncStorage |
| Cadastro | `/(auth)/cadastro` | Formulário com preview em tempo real |
| Detalhe | `/produto/[id]` | Informações completas + adicionar ao carrinho |

---

## 📂 Estrutura de Pastas

```
├── app/
│   ├── _layout.tsx          # Layout raiz (Stack)
│   ├── index.tsx            # Redirect para (tabs)
│   ├── (auth)/              # Grupo de rotas de autenticação
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── cadastro.tsx
│   ├── (tabs)/              # Navegação por abas (5 rotas)
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Home
│   │   ├── produtos.tsx
│   │   ├── servicos.tsx
│   │   ├── carrinho.tsx
│   │   └── perfil.tsx
│   └── produto/
│       └── [id].tsx         # Rota dinâmica de detalhe
├── constants/
│   ├── Colors.ts
│   └── MockData.ts
├── hooks/
│   └── useAsyncStorage.ts
└── types/
    └── index.ts
```

---

## ⚙️ Como Rodar

```bash
# Instalar dependências
npm install

# Iniciar o Expo
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios
```

---

## ✅ Requisitos Acadêmicos Atendidos

| Requisito | Pontos | Status |
|---|---|---|
| Navegação entre telas (≥ 5 rotas) | 20 pts | ✅ 8 rotas (tabs + auth + produto dinâmico) |
| Protótipo visual completo | 30 pts | ✅ Layout coerente em todas as telas |
| Formulário com manipulação de estado | 20 pts | ✅ Cadastro (useState + preview em tempo real) + Login |
| Armazenamento local com AsyncStorage | 20 pts | ✅ Carrinho e usuário persistidos |
| Demonstração em vídeo narrada | 10 pts | 🎥 A gravar |

---

## 👥 Equipe

<!-- Adicione os nomes dos integrantes aqui -->

---

## 🎥 Vídeo de Demonstração

<!-- Adicione o link do YouTube após a gravação -->

