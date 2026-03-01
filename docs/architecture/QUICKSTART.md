````markdown
# 🚀 Quick Start - Water Quick Add

## ⚡ 30 Segundos Setup

### 1. Instalar dependências
```bash
expo install react-native-reanimated react-native-gesture-handler react-native-svg expo-haptics
```

### 2. Atualizar `app.json`
```json
{
  "expo": {
    "plugins": [
      "react-native-reanimated/plugin"
    ]
  }
}
```

### 3. Usar no componente

```tsx
import { WaterQuickAdd } from './src/components/WaterQuickAdd';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [water, setWater] = useState(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Seu conteúdo */}
        <WaterQuickAdd
          goalMl={2000}
          initialMl={water}
          onChange={setWater}
        />
      </View>
    </GestureHandlerRootView>
  );
}
```

## 📁 Arquivos Inclusos

```
src/
└── components/
    ├── WaterQuickAdd.tsx      ← Componente principal (isolado)
    └── WaveFill.tsx           ← Helper SVG (referência)
└── screens/
    └── WaterExampleScreen.tsx ← Exemplo completo de uso
```

## 📚 Documentação

- **WATER_GUIDE.md** - Guia técnico completo (animações, stack, misc)
- **WATER_SETUP.md** - Instruções de instalação detalhadas

## ✨ Features

✅ Botão flutuante circular (topo direito)
✅ Mini painel com seletor de quantidade
✅ Animações premium (reanimated v3)
✅ Preenchimento circular com onda
✅ Bounce & counter flutuante
✅ Haptic feedback (light + success)
✅ Totalmente isolado & reutilizável
✅ TypeScript + Props tipados

## 🎬 Animações

- Painel: scale 0.92→1, opacity 0→1 (250ms)
- Bounce: scale 1→1.12→1 (spring)
- Counter: float -14px, opacity fade (600ms)
- Progresso: 0→novo% (700ms, cubic-out)
- Onda: fase contínua (1500ms, linear)

## 🎯 Props

```typescript
interface WaterQuickAddProps {
  goalMl: number;                    // Meta diária (ex: 2000)
  initialMl: number;                 // Quantidade inicial
  onChange: (totalMl: number) => void; // Callback ao confirmar
}
```

## 🎨 Cores (Customizável)

| Elemento | Cor |
|----------|-----|
| Botão | `#5C51F0` (roxo) |
| Progresso | `rgba(100, 200, 255, 0.6)` (azul) |
| Painel | `#FFFFFF` (branco) |

## ⚙️ Dependências Adicionadas

```json
{
  "react-native-reanimated": "^3.8.0",
  "react-native-gesture-handler": "^2.16.0",
  "react-native-svg": "^14.1.0",
  "expo-haptics": "^13.0.1"
}
```

## 🧪 Testar Componente Isolado

```bash
# 1. Atualizar App.tsx para usar WaterExampleScreen:
import { WaterExampleScreen } from './src/screens';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WaterExampleScreen />
    </GestureHandlerRootView>
  );
}

# 2. Rodar:
expo start
```

## 🔌 Integrar em Tela Existente

```tsx
// DashboardScreen.tsx
import { WaterQuickAdd } from '../components/WaterQuickAdd';

export const DashboardScreen = () => {
  const [water, setWater] = useState(0);

  return (
    <GradientBackground>
      {/* Seu conteúdo */}
      <WaterQuickAdd
        goalMl={2000}
        initialMl={water}
        onChange={setWater}
      />
    </GradientBackground>
  );
};
```

## 💡 Dicas

1. **Customizar quantidade?** Edite `const amounts = [150, 250, 350, 500]`
2. **Mudar cores?** Procure por `#5C51F0` e `rgba(100, 200, 255, ...)`
3. **Sem haptics?** Remova `import * as Haptics` e as calls
4. **Mais rápido/lento?** Ajuste durations (250, 700ms, etc.)

## 📞 Suporte

Se der erro após instalar:
```bash
# Clear cache e reinstale
expo start --clear
# Ou manualmente:
rm -rf node_modules package-lock.json
npm install
```

## 🎓 Aprender Mais

Leia **WATER_GUIDE.md** para entender:
- Como as animações funcionam
- Stack técnico (Reanimated v3)
- SVG dinâmico
- Haptics
- Performance

---

**Pronto para usar! Aproveite as animações premium 🎬✨**

````
