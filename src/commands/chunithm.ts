import { CacheType, Interaction } from "discord.js";
import { ChunithmApiClient } from "../api/Client";
import "../utils/extentions";
import { FilterType, LevelField } from "../api/constants";
import { codeBlock } from "../utils/codeBlock";

export const command = async (interaction: Interaction<CacheType>) => {
    if (!interaction.isCommand()) return;
    const client = new ChunithmApiClient(process.env.CHUNIREC_TOKEN || "");
    const field = interaction.options.get("field")?.value;
    const amount = interaction.options.get("amount")?.value;
    const range = interaction.options.get("range")?.value;
    if (
        typeof field !== "string" ||
        typeof amount !== "number" ||
        typeof range !== "string"
    ) {
        return;
    }
    const levelField = field as LevelField;
    const filterType = range as FilterType;
    await client
        .GetAllMusic()
        .then((e) => e.toLevelsWithName())
        .then((e) => e.LevelWithNameFilter(amount, levelField, filterType))
        .then(
            async (e) =>
                await interaction.reply(
                    e
                        .map((t) =>
                            codeBlock(
                                `${t.name} Lv.${t.level} ${t.genre}`,
                                "fix"
                            )
                        )
                        .join("")
                )
        );
};
