export class Board {
    raw: string;
}

export interface Candidate {
    value: number;
    color: string;
}

export interface Cell {
    id: number;
    value: number;
    color?: string;
    candidates?: Candidate[];
    lastTry?: number;
}

export interface Step {
    position: number;
    value: number;
    isDeterministic: boolean;
    action?: number; // 0:pick, 1:highlight, 2:remove candidate
    nextStep?: Cell[];
}
