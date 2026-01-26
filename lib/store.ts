import { create } from 'zustand';
import chroma from 'chroma-js';
import { getColorName } from '@/lib/naming';

export type ColorSpace = 'hex' | 'oklch';

export interface ColorItem {
  id: string;
  value: string; // The primary value (oklch string)
  hex: string;   // Derived hex for compatibility
  locked: boolean;
  name?: string;
}

interface ColorState {
  colors: ColorItem[];
  generatePalette: () => void;
  toggleLock: (id: string) => void;
  updateColor: (id: string, newColor: string) => void;
  setColors: (colors: ColorItem[]) => void;
}

export const useColorStore = create<ColorState>((set, get) => ({
  colors: [],

  generatePalette: () => {
    set((state) => {
      // If we have no colors, initialize 5 random ones
      // If we have colors, respect locks

      const currentColors = state.colors.length === 5 ? state.colors : Array(5).fill(null);

      // Basic random generation for open slots
      // TODO: Implement harmony algorithms (complementary, split-complimentary) if locks exist

      const newColors = currentColors.map((c, i) => {
        if (c && c.locked) return c;

        // Generate random color in OKLCH space
        // L: 0.4-0.9 (visible light)
        // C: 0.0-0.3 (chroma)
        // H: 0-360 (hue)
        const l = 0.4 + Math.random() * 0.5;
        const cVal = 0.05 + Math.random() * 0.25;
        const h = Math.floor(Math.random() * 360);

        const color = chroma.oklch(l, cVal, h);
        const hex = color.hex();

        return {
          id: c?.id || crypto.randomUUID(),
          value: `oklch(${l.toFixed(3)} ${cVal.toFixed(3)} ${h})`,
          hex: hex,
          locked: false,
          name: getColorName(hex), // Semantic naming
        };
      });

      return { colors: newColors };
    });
  },

  toggleLock: (id) =>
    set((state) => ({
      colors: state.colors.map((c) =>
        c.id === id ? { ...c, locked: !c.locked } : c
      ),
    })),

  updateColor: (id, newColor) =>
    set((state) => ({
      colors: state.colors.map((c) => {
        if (c.id !== id) return c;
        // Validate and update
        try {
          // Assume newColor is valid hex or oklch
          const color = chroma(newColor);
          const [l, cVal, h] = color.oklch();
          return {
            ...c,
            value: `oklch(${l.toFixed(3)} ${cVal.toFixed(3)} ${h || 0})`,
            hex: color.hex()
          };
        } catch (e) {
          return c;
        }
      }),
    })),

  setColors: (colors) => set({ colors }),
}));
