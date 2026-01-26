import { colorsData, ColorData } from './colors-data';

export function getDailyColor(): ColorData {
    const today = new Date();
    // simple day index
    const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const colorIndex = dayIndex % colorsData.length;
    return colorsData[colorIndex];
}
