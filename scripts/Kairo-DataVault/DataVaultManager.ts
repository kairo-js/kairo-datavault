import { DataVaultReceiver } from "./DataVaultReceiver";

export class DataVaultManager {
    private readonly dataVaultReceiver: DataVaultReceiver;
    private static instance: DataVaultManager;
    private constructor() {
        this.dataVaultReceiver = DataVaultReceiver.create(this);
    }

    public static getInstance(): DataVaultManager {
        if (!DataVaultManager.instance) {
            DataVaultManager.instance = new DataVaultManager();
        }
        return DataVaultManager.instance;
    }

    public saveData(key: string, value: string): void {
        this.dataVaultReceiver.save(key, value);
    }

    public loadData(key: string): void {
        this.dataVaultReceiver.load(key);
    }
}