"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel],
});
//Register
const chunithm = {
    name: "chunithm",
    description: "CHUNITHMの楽曲を選択します",
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
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
            type: discord_js_1.ApplicationCommandOptionType.Number,
            name: "amount",
            description: "検索する値を指定",
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
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
    ],
};
const commandsRegister = [chunithm];
client.once("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("Ready!");
    console.log((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag);
    yield ((_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(commandsRegister, process.env.GUILD_ID || ""));
}));
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === "chunithm") {
        try {
            const chunithm = require("./commands/chunithm");
            yield chunithm.command(interaction);
        }
        catch (e) {
            yield interaction.reply({
                content: "```エラーが発生しました。```",
                ephemeral: true,
            });
        }
    }
}));
client.login(process.env.TOKEN);
