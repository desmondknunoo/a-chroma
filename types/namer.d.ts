declare module 'namer' {
    export interface NameSet {
        name: string;
        dist: number;
        hex: string;
    }

    export interface NamerResult {
        basic: NameSet[];
        roygbiv: NameSet[];
        pantone: NameSet[];
        ntc: NameSet[];
        html: NameSet[];
        x11: NameSet[];
    }

    export default function namer(color: string, options?: any): NamerResult;
}
