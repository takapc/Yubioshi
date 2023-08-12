export enum MusicGenre {
    ORIGINAL = "ORIGINAL",
    POPS_ANIME = "POPS&ANIME",
    NICONICO = "niconico",
    TOUHOU = "東方Project",
    VARIETY = "VARIETY",
    IRODORI = "イロドリミドリ",
    GEKIMAI = "ゲキマイ",
}

export enum Field {
    title = "title",
    artist = "artist",
    genre = "genre",
    id = "id",
    release = "release",
    bpm = "bpm",
}

export enum LevelField {
    level = "level",
    const = "const",
    maxcombo = "maxcombo",
}

export enum FilterType {
    equal = "equal",
    gt = "gt",
    gte = "gte",
    lt = "lt",
    lte = "lte",
    not = "not",
}

export interface MusicData {
    title: string;
    genre: MusicGenre;
    artist: string;
    release: string;
    id: string;
}

export class MusicLevel {
    level: number;
    const: number;
    maxcombo: number;
    is_const_unknown: boolean;
    constructor(
        lv: number,
        con: number,
        maxcom: number,
        is_const_unknown: boolean
    ) {
        this.level = lv;
        this.const = con;
        this.maxcombo = maxcom;
        this.is_const_unknown = is_const_unknown;
    }
}

export class MusicLevelWithName extends MusicLevel {
    name: string;
    genre: string;
    constructor(name: string, genre: string, ml: MusicLevel) {
        super(ml.level, ml.const, ml.maxcombo, ml.is_const_unknown);
        this.name = name;
        this.genre = genre;
    }
}

export interface MusicMetaData {
    id: string;
    title: string;
    genre: MusicGenre;
    artist: string;
    release: string;
    bpm: number;
}

export interface MusicAllData {
    data: {
        BAS: MusicLevel | undefined;
        ADV: MusicLevel | undefined;
        EXP: MusicLevel | undefined;
        MAS: MusicLevel | undefined;
        ULT: MusicLevel | undefined;
        WE: MusicLevel | undefined;
    };
    meta: MusicMetaData;
}
