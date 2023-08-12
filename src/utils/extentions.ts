import {
    Field,
    FilterType,
    LevelField,
    MusicAllData,
    MusicLevel,
    MusicLevelWithName,
} from "../api/constants";

declare global {
    interface Array<T> {
        AllDataFilter(
            this: MusicAllData[],
            p: string,
            field: Field,
            type: FilterType
        ): MusicAllData[];
        toLevels(this: MusicAllData[]): MusicLevel[];
        toLevelsWithName(this: MusicAllData[]): MusicLevelWithName[];
        LevelFilter(
            this: MusicLevel[],
            p: number,
            field: LevelField,
            type: FilterType
        ): MusicLevel[];
        LevelWithNameFilter(
            this: MusicLevelWithName[],
            p: number,
            field: LevelField,
            type: FilterType
        ): MusicLevelWithName[];
    }
}

Array.prototype.AllDataFilter = function AllDataFilter(
    p: string,
    field: Field,
    type: FilterType
): MusicAllData[] {
    let filtered = [];
    for (let c of this) {
        if (field === Field.bpm) {
            const parsedBPM = parseInt(p);
            if (type === FilterType.equal)
                if (c.meta.bpm.toString() === p) filtered.push(c);
            if (type === FilterType.gt)
                if (c.meta.bpm > parsedBPM) filtered.push(c);
            if (type === FilterType.gte)
                if (c.meta.bpm >= parsedBPM) filtered.push(c);
            if (type === FilterType.lt)
                if (c.meta.bpm < parsedBPM) filtered.push(c);
            if (type === FilterType.lte)
                if (c.meta.bpm <= parsedBPM) filtered.push(c);
            if (type === FilterType.not)
                if (c.meta.bpm != parsedBPM) filtered.push(c);
        } else {
            if (type === FilterType.not) {
                if (!c.meta[field].includes(p)) filtered.push(c);
            } else {
                if (c.meta[field].includes(p)) filtered.push(c);
            }
        }
    }
    return filtered;
};

Array.prototype.toLevels = function toLevels(): MusicLevel[] {
    let levels: MusicLevel[] = [];
    for (let c of this) {
        if (c.data.BAS !== undefined) levels.push(c.data.BAS);
        if (c.data.ADV !== undefined) levels.push(c.data.ADV);
        if (c.data.EXP !== undefined) levels.push(c.data.EXP);
        if (c.data.MAS !== undefined) levels.push(c.data.MAS);
        if (c.data.ULT !== undefined) levels.push(c.data.ULT);
        if (c.data.WE !== undefined) levels.push(c.data.WE);
    }
    return levels;
};

Array.prototype.toLevelsWithName =
    function toLevelsWithName(): MusicLevelWithName[] {
        let levels: MusicLevelWithName[] = [];
        for (let c of this) {
            if (c.data.BAS !== undefined)
                levels.push(
                    new MusicLevelWithName(
                        c.meta.title,
                        c.meta.genre,
                        c.data.BAS
                    )
                );
            if (c.data.ADV !== undefined)
                levels.push(
                    new MusicLevelWithName(
                        c.meta.title,
                        c.meta.genre,
                        c.data.ADV
                    )
                );
            if (c.data.EXP !== undefined)
                levels.push(
                    new MusicLevelWithName(
                        c.meta.title,
                        c.meta.genre,
                        c.data.EXP
                    )
                );
            if (c.data.MAS !== undefined)
                levels.push(
                    new MusicLevelWithName(
                        c.meta.title,
                        c.meta.genre,
                        c.data.MAS
                    )
                );
            if (c.data.ULT !== undefined)
                levels.push(
                    new MusicLevelWithName(
                        c.meta.title,
                        c.meta.genre,
                        c.data.ULT
                    )
                );
            if (c.data.WE !== undefined)
                levels.push(
                    new MusicLevelWithName(
                        c.meta.title,
                        c.meta.genre,
                        c.data.WE
                    )
                );
        }
        return levels;
    };

Array.prototype.LevelFilter = function LevelFilter(
    p: number,
    field: LevelField,
    type: FilterType
): MusicLevel[] {
    let levels: MusicLevel[] = [];
    for (let c of this) {
        switch (type) {
            case FilterType.equal:
                if (c[field] === p) levels.push(c);
                break;
            case FilterType.gt:
                if (c[field] > p) levels.push(c);
                break;
            case FilterType.gte:
                if (c[field] >= p) levels.push(c);
                break;
            case FilterType.lt:
                if (c[field] < p) levels.push(c);
                break;
            case FilterType.lte:
                if (c[field] <= p) levels.push(c);
                break;
        }
    }
    return levels;
};

Array.prototype.LevelWithNameFilter = function LevelWithNameFilter(
    p: number,
    field: LevelField,
    type: FilterType
): MusicLevelWithName[] {
    let levels: MusicLevelWithName[] = [];
    for (let c of this) {
        switch (type) {
            case FilterType.equal:
                if (c[field] === p) levels.push(c);
                break;
            case FilterType.gt:
                if (c[field] > p) levels.push(c);
                break;
            case FilterType.gte:
                if (c[field] >= p) levels.push(c);
                break;
            case FilterType.lt:
                if (c[field] < p) levels.push(c);
                break;
            case FilterType.lte:
                if (c[field] <= p) levels.push(c);
                break;
        }
    }
    return levels;
};
