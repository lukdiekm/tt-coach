import type { Move } from "./Move.js";

export type Drill = {
    id: number;
    name: string;
    description: string;
    moves: Move[];
    owner_id?: number;
};