import {
    Client,
    GatewayIntentBits,
    Partials,
    Events,
    ApplicationCommandData,
    ApplicationCommandOptionType,
    Interaction,
    CacheType,
} from "discord.js";
import dotenv from "dotenv";
import { CommandFile } from "./constants";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel],
});

//Register
const chunithm: ApplicationCommandData = {
    name: "chunithm",
    description: "CHUNITHMの楽曲を選択します",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "field",
            description: "検索するフィールドを指定",
            required: true,
            choices: [
                {
                    name: "レベル",
                    value: "level",
                },
                {
                    name: "定数",
                    value: "const",
                },
                {
                    name: "コンボ数",
                    value: "maxcombo",
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Number,
            name: "amount",
            description: "検索する値を指定",
            required: true,
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "range",
            description: "検索する範囲を指定",
            required: true,
            choices: [
                {
                    name: "同値",
                    value: "equal",
                },
                {
                    name: "より大きい",
                    value: "gt",
                },
                {
                    name: "以上",
                    value: "gt",
                },
                {
                    name: "より小さい",
                    value: "lt",
                },
                {
                    name: "以下",
                    value: "lte",
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Number,
            name: "kosuu",
            description: "出力する個数を指定(指定しないならAll)",
            required: false,
        },
    ],
};

const commandsRegister = [chunithm];

client.once("ready", async () => {
    console.log("Ready!");
    console.log(client.user?.tag);
    await client.application?.commands.set(
        commandsRegister,
        process.env.GUILD_ID || ""
    );
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "chunithm") {
        try {
            const chunithm: CommandFile = require("./commands/chunithm");
            await chunithm.command(interaction);
        } catch (e) {
            await interaction.reply({
                content: "```エラーが発生しました。```",
                ephemeral: true,
            });
        }
    }
});

client.login(process.env.TOKEN);
