import { CacheType, Interaction } from "discord.js";
import { ChunithmApiClient } from "../api/Client";
import "../utils/extentions";
import {
    FilterType,
    LevelField,
    MusicLevel,
    MusicLevelWithName,
} from "../api/constants";
import { codeBlock } from "../utils/codeBlock";

export const command = async (interaction: Interaction<CacheType>) => {
    if (!interaction.isCommand()) return;
    const client = new ChunithmApiClient(process.env.CHUNIREC_TOKEN || "");
    const field = interaction.options.get("field")?.value;
    const amount = interaction.options.get("amount")?.value;
    const range = interaction.options.get("range")?.value;
    const kosuu = interaction.options.get("kosuu")?.value;
    if (
        typeof field !== "string" ||
        typeof amount !== "number" ||
        typeof range !== "string"
    ) {
        return;
    }
    const levelField = field as LevelField;
    const filterType = range as FilterType;
    let msg = "";
    switch (levelField) {
        case LevelField.const:
            msg += "定数";
            break;
        case LevelField.level:
            msg += "レベル";
            break;
        case LevelField.maxcombo:
            msg += "コンボ数";
            break;
    }
    msg += " " + amount;
    switch (filterType) {
        case FilterType.equal:
            msg += "と等しい";
            break;
        case FilterType.gt:
            msg += "より大きい";
            break;
        case FilterType.gte:
            msg += "以上";
            break;
        case FilterType.lt:
            msg += "より小さい";
            break;
        case FilterType.lte:
            msg += "以下";
            break;
    }
    if (typeof kosuu === "number") msg += " x" + kosuu;
    await client
        .GetAllMusic()
        .then((e) => e.toLevelsWithName())
        .then((e) =>
            randomSelect(
                e.LevelWithNameFilter(amount, levelField, filterType),
                kosuu
            )
        )
        .then(
            async (e) =>
                await interaction.reply(
                    msg +
                        "\n" +
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

function randomSelect(
    array: MusicLevelWithName[],
    num: number | string | boolean | undefined
) {
    let newArray = [];
    if (typeof num !== "number") return array;

    while (newArray.length < num && array.length > 0) {
        // 配列からランダムな要素を選ぶ
        const rand = Math.floor(Math.random() * array.length);
        // 選んだ要素を別の配列に登録する
        newArray.push(array[rand]);
        // もとの配列からは削除する
        array.splice(rand, 1);
    }

    return newArray;
}
