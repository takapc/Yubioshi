import { CacheType, Interaction } from "discord.js";

export interface CommandFile {
    command: (interaction: Interaction<CacheType>) => Promise<void>;
}
