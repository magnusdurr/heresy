import {ItemCategory} from "./itemCategory";

export class ItemCost {
    readonly entries: Map<ItemCategory, number>

    constructor(entries: Map<ItemCategory, number>) {
        this.entries = entries;
    }

    merge(other: ItemCost): ItemCost {
        const merged = new Map(this.entries);

        other.entries.forEach((value, key) => {
            merged.set(key, (merged.get(key) || 0) + value);
        });

        return new ItemCost(merged);
    }

    getOrZero(category: ItemCategory): number {
        return this.entries.get(category) || 0;
    }

    toList(): ItemCostEntry[] {
        return Array.from(this.entries).map(([key, value]) => ({category: key, count: value}));
    }

    static fromList(list: ItemCategory[]) {
        return new ItemCost(list.reduce((acc, category) => {
            acc.set(category, (acc.get(category) || 0) + 1);
            return acc;
        }, new Map()));
    }

    static fromCounts(list: ItemCostEntry[]) {
        return new ItemCost(new Map(list.map(it => [it.category, it.count])))
    }
}

export interface ItemCostEntry {
    category: ItemCategory
    count: number
}
