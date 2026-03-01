# Estrutura do Projeto - Fitness Tracker App

## 📁 Arquitetura de Pastas

```
ps-rn/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── HeaderInfo.tsx   # Componente do header com stats
│   │   ├── BarChart.tsx     # Gráfico de barras animado
│   │   ├── StepsCard.tsx    # Card principal de passos
│   │   └── index.ts         # Export barrel
│   ├── screens/             # Telas/Páginas
│   │   ├── DashboardScreen.tsx  # Tela principal
│   │   └── index.ts             # Export barrel
│   ├── styles/              # Estilos globais
│   │   └── globalStyles.ts  # Todos os StyleSheets
│   ├── constants/           # Constantes do app
│   │   └── chartData.ts     # Dados do gráfico
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts         # Interfaces e tipos
│   └── utils/               # Funções utilitárias (para futuros usos)
├── App.tsx                  # Entry point
├── app.json                 # Configuração do Expo
├── package.json
└── README.md
```

## 🎯 Padrão de Organização

### `src/components/`
Componentes reutilizáveis e independentes:
- **HeaderInfo** - Exibe informações do header (876 steps, 76%)
- **BarChart** - Gráfico de barras animado com dados do mês
- **StepsCard** - Card principal com número de passos, progresso e controles

### `src/screens/`
Telas completas que combinam componentes:
- **DashboardScreen** - Tela principal que monta todos os componentes

### `src/styles/`
Centraliza todos os estilos da aplicação para fácil manutenção e atualização.

### `src/constants/`
Dados estáticos que não mudam durante a execução:
- `chartData.ts` - Dados do gráfico de semana

### `src/types/`
Tipagem TypeScript para melhor documentação e autocompletar:
- Interfaces de componentes
- Tipos de dados

### `App.tsx` (raiz)
Entry point minimal que apenas importa e renderiza a tela principal.

## 📦 Padrão de Imports

```typescript
// Usar barrel exports para imports mais limpos
import { HeaderInfo, BarChart, StepsCard } from './src/components';
import { DashboardScreen } from './src/screens';
import { styles } from './src/styles/globalStyles';
```

## ✨ Benefícios desta Arquitetura

✅ **Separação de Responsabilidades** - Cada pasta tem um propósito claro
✅ **Fácil Manutenção** - Encontrar código é intuitivo
✅ **Escalabilidade** - Adicionar novos componentes/telas é simples
✅ **Reutilização** - Componentes podem ser usados em diferentes contextos
✅ **Tipagem** - TypeScript bem organizado facilita o desenvolvimento
✅ **Performance** - Estrutura clara melhora tree-shaking e bundle size

## 🚀 Próximos Passos

Quando precisar adicionar novas funcionalidades:
1. **Novo componente** → `src/components/NomeComponente.tsx`
2. **Nova tela** → `src/screens/NomeScreen.tsx`
3. **Novas constantes** → `src/constants/novaConstante.ts`
4. **Funções auxiliares** → `src/utils/funcoesAuxiliares.ts`
5. **Novos tipos** → Adicionar em `src/types/index.ts`
