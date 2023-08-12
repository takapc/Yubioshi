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
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Client_1 = require("../api/Client");
require("../utils/extentions");
const codeBlock_1 = require("../utils/codeBlock");
const command = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!interaction.isCommand())
        return;
    const client = new Client_1.ChunithmApiClient(process.env.CHUNIREC_TOKEN || "");
    const field = (_a = interaction.options.get("field")) === null || _a === void 0 ? void 0 : _a.value;
    const amount = (_b = interaction.options.get("amount")) === null || _b === void 0 ? void 0 : _b.value;
    const range = (_c = interaction.options.get("range")) === null || _c === void 0 ? void 0 : _c.value;
    if (typeof field !== "string" ||
        typeof amount !== "number" ||
        typeof range !== "string") {
        return;
    }
    const levelField = field;
    const filterType = range;
    yield client
        .GetAllMusic()
        .then((e) => e.toLevelsWithName())
        .then((e) => e.LevelWithNameFilter(amount, levelField, filterType))
        .then((e) => __awaiter(void 0, void 0, void 0, function* () {
        return yield interaction.reply(e
            .map((t) => (0, codeBlock_1.codeBlock)(`${t.name} Lv.${t.level} ${t.genre}`, "fix"))
            .join(""));
    }));
});
exports.command = command;
