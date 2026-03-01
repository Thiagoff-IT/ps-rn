````markdown
# Water Quick Add Installation & Setup

## 🚀 Instalação de Dependências

O componente `WaterQuickAdd.tsx` requer as seguintes bibliotecas:

```bash
# Core animation & gesture libraries
expo install react-native-reanimated react-native-gesture-handler react-native-svg expo-haptics
```

### Ou via npm (se não usar Expo directly):

```bash
npm install react-native-reanimated@^3.8.0 react-native-gesture-handler@^2.16.0 react-native-svg@^14.1.0 expo-haptics@^13.0.1
```

## 📋 Dependências Adicionadas

- **react-native-reanimated** (v3.8.0) - Animações de alta performance
- **react-native-gesture-handler** (v2.16.0) - Gestos e eventos touch
- **react-native-svg** (v14.1.0) - SVG para progress circle e wave
- **expo-haptics** (v13.0.1) - Feedback háptico (vibração)

## ⚙️ Configuração Requerida (Expo)

Se estiver usando Expo, adicione isto ao seu `app.json`:

```json
{
  "expo": {
    "plugins": [
      "react-native-reanimated/plugin"
    ]
  }
}
```

## 📁 Componentes Inclusos

- **WaterQuickAdd.tsx** - Componente principal (isolado e reutilizável)
- **WaveFill.tsx** - Helper para SVG animado (opcional, incluído para referência)

## 💡 Uso Básico

```tsx
import { WaterQuickAdd } from './src/components/WaterQuickAdd';

export function MyScreen() {
  const [waterMl, setWaterMl] = useState(0);

  return (
    <View>
      {/* Seu conteúdo */}
      
      <WaterQuickAdd
        goalMl={2000}           // Meta diária em ml
        initialMl={waterMl}     // Valor inicial
        onChange={setWaterMl}   // Callback ao adicionar água
      />
    </View>
  );
}
```

## 🎯 Props

| Prop | Type | Descrição |
|------|------|-----------|
| `goalMl` | `number` | Meta diária de água em ml (ex: 2000) |
| `initialMl` | `number` | Quantidade inicial ingerida |
| `onChange` | `(totalMl: number) => void` | Callback ao confirmar adição |

## 🔧 Stack Técnico

- **Expo 55+** com TypeScript
- **React Native Reanimated v3** (withTiming, withSpring, useSharedValue)
- **Easing.out(Easing.cubic)** para curva suave
- **SVG nativo** para progress circle e onda
- **Haptics** (Light ao abrir, Success ao confirmar)

## 🎬 Sequência de Animações

1. **Abertura do painel** (250ms)
   - Scale: 0.92 → 1
   - Opacity: 0 → 1
   - TranslateY: -8 → 0

2. **Confirmação** (após fechar painel)
   - Bounce do botão: 1 → 1.12 → 1
   - Counter flutuante: translateY -14, opacity fade
   - Preenchimento circular: 0% → novo%, 700ms

3. **Onda animada**
   - Dentro do círculo de progresso
   - Move horizontalmente a cada confirmação

## 🎨 Customização

### Cores
- Botão: `#5C51F0` (roxo)
- Progresso: `rgba(100, 200, 255, 0.8)` (azul)
- Painel: `#FFFFFF` (branco)

### Dimensões
- Botão: 56x56 px
- Painel: 240 px de largura

## ⚡ Performance

- Todas as animações usam **Native Driver** quando possível
- Without re-renders desnecessários via `useSharedValue`
- Stagger manual com `withDelay` para sequência controlada

## 🐛 Troubleshooting

### Erro: "Não é possível localizar react-native-reanimated"
```bash
expo install react-native-reanimated
# E reinicie o servidor Expo
```

### Sem haptics no web/simulator
Haptics é automático (sem erro) e funciona em dispositivosReais

### Onda não aparece
Verifique se `progressValue > 0` e o SVG está renderizando corretamente

## 📚 Referências

- [React Native Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)

````
