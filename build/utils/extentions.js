"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../api/constants");
Array.prototype.AllDataFilter = function AllDataFilter(p, field, type) {
    let filtered = [];
    for (let c of this) {
        if (field === constants_1.Field.bpm) {
            const parsedBPM = parseInt(p);
            if (type === constants_1.FilterType.equal)
                if (c.meta.bpm.toString() === p)
                    filtered.push(c);
            if (type === constants_1.FilterType.gt)
                if (c.meta.bpm > parsedBPM)
                    filtered.push(c);
            if (type === constants_1.FilterType.gte)
                if (c.meta.bpm >= parsedBPM)
                    filtered.push(c);
            if (type === constants_1.FilterType.lt)
                if (c.meta.bpm < parsedBPM)
                    filtered.push(c);
            if (type === constants_1.FilterType.lte)
                if (c.meta.bpm <= parsedBPM)
                    filtered.push(c);
            if (type === constants_1.FilterType.not)
                if (c.meta.bpm != parsedBPM)
                    filtered.push(c);
        }
        else {
            if (type === constants_1.FilterType.not) {
                if (!c.meta[field].includes(p))
                    filtered.push(c);
            }
            else {
                if (c.meta[field].includes(p))
                    filtered.push(c);
            }
        }
    }
    return filtered;
};
Array.prototype.toLevels = function toLevels() {
    let levels = [];
    for (let c of this) {
        if (c.data.BAS !== undefined)
            levels.push(c.data.BAS);
        if (c.data.ADV !== undefined)
            levels.push(c.data.ADV);
        if (c.data.EXP !== undefined)
            levels.push(c.data.EXP);
        if (c.data.MAS !== undefined)
            levels.push(c.data.MAS);
        if (c.data.ULT !== undefined)
            levels.push(c.data.ULT);
        if (c.data.WE !== undefined)
            levels.push(c.data.WE);
    }
    return levels;
};
Array.prototype.toLevelsWithName =
    function toLevelsWithName() {
        let levels = [];
        for (let c of this) {
            if (c.data.BAS !== undefined)
                levels.push(new constants_1.MusicLevelWithName(c.meta.title, c.meta.genre, c.data.BAS));
            if (c.data.ADV !== undefined)
                levels.push(new constants_1.MusicLevelWithName(c.meta.title, c.meta.genre, c.data.ADV));
            if (c.data.EXP !== undefined)
                levels.push(new constants_1.MusicLevelWithName(c.meta.title, c.meta.genre, c.data.EXP));
            if (c.data.MAS !== undefined)
                levels.push(new constants_1.MusicLevelWithName(c.meta.title, c.meta.genre, c.data.MAS));
            if (c.data.ULT !== undefined)
                levels.push(new constants_1.MusicLevelWithName(c.meta.title, c.meta.genre, c.data.ULT));
            if (c.data.WE !== undefined)
                levels.push(new constants_1.MusicLevelWithName(c.meta.title, c.meta.genre, c.data.WE));
        }
        return levels;
    };
Array.prototype.LevelFilter = function LevelFilter(p, field, type) {
    let levels = [];
    for (let c of this) {
        switch (type) {
            case constants_1.FilterType.equal:
                if (c[field] === p)
                    levels.push(c);
                break;
            case constants_1.FilterType.gt:
                if (c[field] > p)
                    levels.push(c);
                break;
            case constants_1.FilterType.gte:
                if (c[field] >= p)
                    levels.push(c);
                break;
            case constants_1.FilterType.lt:
                if (c[field] < p)
                    levels.push(c);
                break;
            case constants_1.FilterType.lte:
                if (c[field] <= p)
                    levels.push(c);
                break;
        }
    }
    return levels;
};
Array.prototype.LevelWithNameFilter = function LevelWithNameFilter(p, field, type) {
    let levels = [];
    for (let c of this) {
        switch (type) {
            case constants_1.FilterType.equal:
                if (c[field] === p)
                    levels.push(c);
                break;
            case constants_1.FilterType.gt:
                if (c[field] > p)
                    levels.push(c);
                break;
            case constants_1.FilterType.gte:
                if (c[field] >= p)
                    levels.push(c);
                break;
            case constants_1.FilterType.lt:
                if (c[field] < p)
                    levels.push(c);
                break;
            case constants_1.FilterType.lte:
                if (c[field] <= p)
                    levels.push(c);
                break;
        }
    }
    return levels;
};
