import {v4 as uuidv4} from "uuid";
import {UpgradeSpec} from "./upgradeSpec";

export class Upgrade {
    readonly id: string = uuidv4();
    readonly spec: UpgradeSpec

    constructor(spec: UpgradeSpec) {
        this.spec = spec;
    }
}