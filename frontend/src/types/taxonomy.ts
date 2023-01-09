export interface TaxonomyInterface {
    _id: string,
    name: string,
    font: "light" | "dark",
    color: string
}

export enum Font {
    light = 'light',
    dark = 'dark'
}