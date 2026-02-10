import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import chroma from 'chroma-js';
import { getColourName } from '@/lib/naming';

export type ColourSpace = 'hex' | 'oklch';

export interface ColourItem {
  id: string;
  value: string;
  hex: string;
  locked: boolean;
  name?: string;
}

interface ColourState {
  colours: ColourItem[];
  generatePalette: () => void;
  toggleLock: (id: string) => void;
  updateColour: (id: string, newColour: string) => void;
  setColours: (colours: ColourItem[]) => void;
}

export const useColourStore = create<ColourState>()(
  persist(
    (set, get) => ({
      colours: [],

      generatePalette: () => {
        set((state) => {
          // Initialize slots if empty
          const currentColours = state.colours.length === 5 ? state.colours : Array(5).fill(null);
          const lockedColours = currentColours.filter(c => c && c.locked);

          let anchor: chroma.Color;

          if (lockedColours.length > 0) {
            // Use the first locked colour as the anchor for harmony
            anchor = chroma(lockedColours[0].hex);
          } else {
            // Establish a random anchor
            anchor = chroma.random();
          }

          // Simple Strategy: Generate a random 'harmony' offset for each unlocked slot
          // This keeps it random but cohesive if we tune the ranges

          const newColours = currentColours.map((c, i) => {
            if (c && c.locked) return c;

            let colour: chroma.Color;

            if (lockedColours.length > 0) {
              // Smart Harmony Logic
              // 1. Pick a random hue offset from the anchor (Analagous, Compl, etc included effectively by random 360, 
              // but we can bias checks if we wanted strict harmony).
              // For "Instant Generation", chaos is okay, but let's constrain saturation/lightness to look "Premium".

              // Premium colours usually have saturation > 0.1 and Lightness between 0.2 and 0.9
              const h = (anchor.get('oklch.h') + (Math.random() * 360)) % 360;
              const l = 0.3 + (Math.random() * 0.6); // 0.3 - 0.9
              const ch = 0.05 + (Math.random() * 0.25); // Vibrant

              colour = chroma.oklch(l, ch, h);
            } else {
              // Completely new random colour
              colour = chroma.oklch(
                0.4 + Math.random() * 0.5,
                0.1 + Math.random() * 0.25,
                Math.floor(Math.random() * 360)
              );
            }

            const hex = colour.hex();

            return {
              id: c?.id || Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
              value: colour.css('oklch'),
              hex: hex,
              locked: false,
              name: getColourName(hex),
            };
          });

          return { colours: newColours };
        });
      },

      toggleLock: (id) =>
        set((state) => ({
          colours: state.colours.map((c) =>
            c.id === id ? { ...c, locked: !c.locked } : c
          ),
        })),

      updateColour: (id, newColour) =>
        set((state) => ({
          colours: state.colours.map((c) => {
            if (c.id !== id) return c;
            try {
              const colour = chroma(newColour);
              const hex = colour.hex();
              return {
                ...c,
                value: colour.css('oklch'),
                hex: hex,
                name: getColourName(hex)
              };
            } catch (e) {
              return c;
            }
          }),
        })),

      setColours: (colours) => set({ colours }),
    }),
    {
      name: 'achroma-storage',
    }
  )
);
