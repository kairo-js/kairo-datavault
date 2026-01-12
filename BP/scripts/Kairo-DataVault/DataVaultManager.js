import { KairoUtils } from "../Kairo/utils/KairoUtils";
import { DataVaultReceiver } from "./DataVaultReceiver";
import { DynamicPropertyStorage } from "./DynamicPropertyStorage";
export class DataVaultManager {
    constructor() {
        this.dataVaultReceiver = DataVaultReceiver.create(this);
        this.dynamicPropertyStorage = DynamicPropertyStorage.create(this);
    }
    static getInstance() {
        if (!DataVaultManager.instance) {
            DataVaultManager.instance = new DataVaultManager();
        }
        return DataVaultManager.instance;
    }
    async handleScriptEvent(data) {
        return this.dataVaultReceiver.handleScriptEvent(data);
    }
    async saveData(addonId, key, value, type) {
        const parseValue = type === "string" ? value : JSON.parse(value);
        this.dynamicPropertyStorage.save(addonId, key, parseValue, type);
    }
    async loadData(addonId, key) {
        const dataLoaded = this.dynamicPropertyStorage.load(addonId, key);
        const value = dataLoaded.type === "string" ? dataLoaded.value : JSON.stringify(dataLoaded.value);
        return KairoUtils.buildKairoResponse({ dataLoaded });
    }
}
