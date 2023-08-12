"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicLevelWithName = exports.MusicLevel = exports.FilterType = exports.LevelField = exports.Field = exports.MusicGenre = void 0;
var MusicGenre;
(function (MusicGenre) {
    MusicGenre["ORIGINAL"] = "ORIGINAL";
    MusicGenre["POPS_ANIME"] = "POPS&ANIME";
    MusicGenre["NICONICO"] = "niconico";
    MusicGenre["TOUHOU"] = "\u6771\u65B9Project";
    MusicGenre["VARIETY"] = "VARIETY";
    MusicGenre["IRODORI"] = "\u30A4\u30ED\u30C9\u30EA\u30DF\u30C9\u30EA";
    MusicGenre["GEKIMAI"] = "\u30B2\u30AD\u30DE\u30A4";
})(MusicGenre || (exports.MusicGenre = MusicGenre = {}));
var Field;
(function (Field) {
    Field["title"] = "title";
    Field["artist"] = "artist";
    Field["genre"] = "genre";
    Field["id"] = "id";
    Field["release"] = "release";
    Field["bpm"] = "bpm";
})(Field || (exports.Field = Field = {}));
var LevelField;
(function (LevelField) {
    LevelField["level"] = "level";
    LevelField["const"] = "const";
    LevelField["maxcombo"] = "maxcombo";
})(LevelField || (exports.LevelField = LevelField = {}));
var FilterType;
(function (FilterType) {
    FilterType["equal"] = "equal";
    FilterType["gt"] = "gt";
    FilterType["gte"] = "gte";
    FilterType["lt"] = "lt";
    FilterType["lte"] = "lte";
    FilterType["not"] = "not";
})(FilterType || (exports.FilterType = FilterType = {}));
class MusicLevel {
    constructor(lv, con, maxcom, is_const_unknown) {
        this.level = lv;
        this.const = con;
        this.maxcombo = maxcom;
        this.is_const_unknown = is_const_unknown;
    }
}
exports.MusicLevel = MusicLevel;
class MusicLevelWithName extends MusicLevel {
    constructor(name, genre, ml) {
        super(ml.level, ml.const, ml.maxcombo, ml.is_const_unknown);
        this.name = name;
        this.genre = genre;
    }
}
exports.MusicLevelWithName = MusicLevelWithName;
