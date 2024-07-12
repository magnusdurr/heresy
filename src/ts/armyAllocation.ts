import {ArmySpec} from "./armySpec";
import {Formation} from "./formation";
import {ItemCost} from "./itemCost";

export class ArmyAllocation {
    cost: ItemCost
    grants: ItemCost

    constructor(cost: ItemCost, grants: ItemCost) {
        this.cost = cost;
        this.grants = grants;
    }

    static fromFormations(army: ArmySpec, formations: Formation[]): ArmyAllocation {
        const totalCost = formations.map(formation => formation.costWithUpgrades())
            .reduce((acc, formation) => acc.merge(formation), new ItemCost(new Map()));

        const allGrants = formations
            .map(formation => formation.spec.grants)
            .reduce((acc, grants) => acc.merge(grants), army.grants);

        return new ArmyAllocation(totalCost, allGrants);
    }
}