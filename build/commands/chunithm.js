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
const constants_1 = require("../api/constants");
const codeBlock_1 = require("../utils/codeBlock");
const command = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!interaction.isCommand())
        return;
    const client = new Client_1.ChunithmApiClient(process.env.CHUNIREC_TOKEN || "");
    const field = (_a = interaction.options.get("field")) === null || _a === void 0 ? void 0 : _a.value;
    const amount = (_b = interaction.options.get("amount")) === null || _b === void 0 ? void 0 : _b.value;
    const range = (_c = interaction.options.get("range")) === null || _c === void 0 ? void 0 : _c.value;
    const kosuu = (_d = interaction.options.get("kosuu")) === null || _d === void 0 ? void 0 : _d.value;
    if (typeof field !== "string" ||
        typeof amount !== "number" ||
        typeof range !== "string") {
        return;
    }
    const levelField = field;
    const filterType = range;
    let msg = "";
    switch (levelField) {
        case constants_1.LevelField.const:
            msg += "定数";
            break;
        case constants_1.LevelField.level:
            msg += "レベル";
            break;
        case constants_1.LevelField.maxcombo:
            msg += "コンボ数";
            break;
    }
    msg += " " + amount;
    switch (filterType) {
        case constants_1.FilterType.equal:
            msg += "と等しい";
            break;
        case constants_1.FilterType.gt:
            msg += "より大きい";
            break;
        case constants_1.FilterType.gte:
            msg += "以上";
            break;
        case constants_1.FilterType.lt:
            msg += "より小さい";
            break;
        case constants_1.FilterType.lte:
            msg += "以下";
            break;
    }
    if (typeof kosuu === "number")
        msg += " x" + kosuu;
    yield client
        .GetAllMusic()
        .then((e) => e.toLevelsWithName())
        .then((e) => randomSelect(e.LevelWithNameFilter(amount, levelField, filterType), kosuu))
        .then((e) => __awaiter(void 0, void 0, void 0, function* () {
        return yield interaction.reply(msg +
            "\n" +
            e
                .map((t) => (0, codeBlock_1.codeBlock)(`${t.name} Lv.${t.level} ${t.genre}`, "fix"))
                .join(""));
    }));
});
exports.command = command;
function randomSelect(array, num) {
    let newArray = [];
    if (typeof num !== "number")
        return array;
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
