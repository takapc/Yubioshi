import { MusicData, MusicAllData } from "./constants";

export class ChunithmApiClient {
    private token: string;
    private endpoint: string;
    constructor(token: string) {
        this.token = token;
        this.endpoint = "https://api.chunirec.net/2.0";
    }
    async SearchMusic(p: string): Promise<MusicData[]> {
        const res: MusicData[] = await fetch(
            `${this.endpoint}/music/search.json?q=${p}&region=jp2&token=${this.token}`
        ).then((e) => e.json());
        return res;
    }

    async GetMusicByID(id: string): Promise<MusicAllData> {
        const res: MusicAllData = await fetch(
            `${this.endpoint}/music/show.json?id=${id}&region=jp2&token=${this.token}`
        ).then((e) => e.json());
        return res;
    }

    async GetAllMusic(): Promise<MusicAllData[]> {
        const res: MusicAllData[] = await fetch(
            `${this.endpoint}/music/showall.json?region=jp2&token=${this.token}`
        ).then((e) => e.json());
        return res;
    }
}
