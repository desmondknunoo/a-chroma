import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import chroma from 'chroma-js';
import { getColorName } from '@/lib/naming';

export type ColorSpace = 'hex' | 'oklch';

export interface ColorItem {
  id: string;
  value: string;
  hex: string;
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

export const useColorStore = create<ColorState>()(
  persist(
    (set, get) => ({
      colors: [],

      generatePalette: () => {
        set((state) => {
          // Initialize slots if empty
          const currentColors = state.colors.length === 5 ? state.colors : Array(5).fill(null);
          const lockedColors = currentColors.filter(c => c && c.locked);

          let anchor: chroma.Color;

          if (lockedColors.length > 0) {
            // Use the first locked color as the anchor for harmony
            anchor = chroma(lockedColors[0].hex);
          } else {
            // Establish a random anchor
            anchor = chroma.random();
          }

          // Simple Strategy: Generate a random 'harmony' offset for each unlocked slot
          // This keeps it random but cohesive if we tune the ranges

          const newColors = currentColors.map((c, i) => {
            if (c && c.locked) return c;

            let color: chroma.Color;

            if (lockedColors.length > 0) {
              // Smart Harmony Logic
              // 1. Pick a random hue offset from the anchor (Analagous, Compl, etc included effectively by random 360, 
              // but we can bias checks if we wanted strict harmony).
              // For "Spacebar Magic", chaos is okay, but let's constrain saturation/lightness to look "Premium".

              // Premium colors usually have saturation > 0.1 and Lightness between 0.2 and 0.9
              const h = (anchor.get('oklch.h') + (Math.random() * 360)) % 360;
              const l = 0.3 + (Math.random() * 0.6); // 0.3 - 0.9
              const ch = 0.05 + (Math.random() * 0.25); // Vibrant

              color = chroma.oklch(l, ch, h);
            } else {
              // Completely new random color
              color = chroma.oklch(
                0.4 + Math.random() * 0.5,
                0.1 + Math.random() * 0.25,
                Math.floor(Math.random() * 360)
              );
            }

            const hex = color.hex();

            return {
              id: c?.id || Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
              value: color.css('oklch'),
              hex: hex,
              locked: false,
              name: getColorName(hex),
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
            try {
              const color = chroma(newColor);
              const hex = color.hex();
              return {
                ...c,
                value: color.css('oklch'),
                hex: hex,
                name: getColorName(hex)
              };
            } catch (e) {
              return c;
            }
          }),
        })),

      setColors: (colors) => set({ colors }),
    }),
    {
      name: 'chromaflow-storage',
    }
  )
);
