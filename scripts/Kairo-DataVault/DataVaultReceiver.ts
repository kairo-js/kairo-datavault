import type { DataVaultManager } from "./DataVaultManager";

export class DataVaultReceiver {
    private constructor(private readonly dataVaultManager: DataVaultManager) {}
    public static create(dataVaultManager: DataVaultManager): DataVaultReceiver {
        return new DataVaultReceiver(dataVaultManager);
    }

    public save(key: string, value: string): void {

    }

    public load(key: string): void {

    }
}