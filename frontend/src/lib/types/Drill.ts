import type { Move } from "./Move.js";
import type { DrillCategory } from "./DrillCategory.js";

export type Drill = {
    id: number;
    name: string;
    description: string;
    moves: Move[];
    owner_id?: number;
    drill_category?: DrillCategory;
    drill_category_id?: number;
    is_public: boolean;
};