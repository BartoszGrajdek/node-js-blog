import { ObjectId } from "mongodb";
import { Font } from "src/types/taxonomy";

export interface CategoryInterface {
    _id: ObjectId | null,
    name: string,
    font: Font,
    color: string
}

export class Category {
    _id: ObjectId | null;
    name: string;
    font: Font;
    color: string;

    constructor(_id: ObjectId | null, name: string, font: Font, color: string) {
        this._id = _id;
        this.name = name;
        this.font = font;
        this.color = color;
    }
}