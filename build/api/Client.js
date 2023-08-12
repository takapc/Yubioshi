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
exports.ChunithmApiClient = void 0;
class ChunithmApiClient {
    constructor(token) {
        this.token = token;
        this.endpoint = "https://api.chunirec.net/2.0";
    }
    SearchMusic(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.endpoint}/music/search.json?q=${p}&region=jp2&token=${this.token}`).then((e) => e.json());
            return res;
        });
    }
    GetMusicByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.endpoint}/music/show.json?id=${id}&region=jp2&token=${this.token}`).then((e) => e.json());
            return res;
        });
    }
    GetAllMusic() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.endpoint}/music/showall.json?region=jp2&token=${this.token}`).then((e) => e.json());
            return res;
        });
    }
}
exports.ChunithmApiClient = ChunithmApiClient;
