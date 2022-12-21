export enum postStatus {
    Draft = 'draft',
    Public = 'public',
    Archived = 'archive'
}

export interface PostInterface {
    _id: string,
    title: string,
    status: postStatus
    description: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
    tags: Array<number>,
    categories: Array<number>,
}