import { ConsoleManager } from "../Kairo/utils/ConsoleManager";
import { SCRIPT_EVENT_COMMAND_IDS } from "./constants";
export class DataVaultReceiver {
    constructor(dataVaultManager) {
        this.dataVaultManager = dataVaultManager;
    }
    static create(dataVaultManager) {
        return new DataVaultReceiver(dataVaultManager);
    }
    async handleScriptEvent(command) {
        if (!DataVaultReceiver.VALID_COMMANDS.has(command.commandType)) {
            return;
        }
        if (!command.sourceAddonId) {
            ConsoleManager.error(`Addon ID missing: ${command}`);
            return;
        }
        if (!command.data.key) {
            ConsoleManager.error(`Key missing: ${command}`);
            return;
        }
        switch (command.commandType) {
            case SCRIPT_EVENT_COMMAND_IDS.SAVE_DATA:
                return this.dataVaultManager.saveData(command.sourceAddonId, command.data.key, command.data.value, command.data.type);
            case SCRIPT_EVENT_COMMAND_IDS.LOAD_DATA:
                return this.dataVaultManager.loadData(command.sourceAddonId, command.data.key);
            default:
                return;
        }
    }
}
DataVaultReceiver.VALID_COMMANDS = new Set([
    SCRIPT_EVENT_COMMAND_IDS.SAVE_DATA,
    SCRIPT_EVENT_COMMAND_IDS.LOAD_DATA,
]);
