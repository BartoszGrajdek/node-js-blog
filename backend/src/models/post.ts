import { ObjectId } from "mongodb";
import { postStatus } from "../types/postStatus";

export interface PostInterface {
    _id: ObjectId | null,
    title: string,
    status: postStatus
    description: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
    tags: Array<number>,
    categories: Array<number>,
}

export class Post {
    _id: ObjectId | null;
    title: string;
    status: postStatus;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    tags: Array<number>;
    categories: Array<number>;

    constructor(_id: ObjectId | null, title: string, status: postStatus, description: string, createdAt: Date, updatedAt: Date, author: string, tags: Array<number>, categories: Array<number>) {
        this._id = _id;
        this.title = title;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.author = author;
        this.tags = tags;
        this.categories = categories;
    }
}