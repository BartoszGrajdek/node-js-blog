import { ObjectId } from "mongodb";
import { Get, Route, Post, Body, Controller, SuccessResponse, Path, Delete, Put, Tags } from "tsoa";
import { Tag as TagClass, TagInterface } from "../models/tag";

const getDb = require('../utils/database').getDb;

interface TagResponse {
  tags: Array<TagInterface>;
}

interface AddTagResponse {
    status: number,
    message: string,
    tagId: ObjectId
}

interface UpdateTagResponse {
    status: number,
    message: string,
    tagId: ObjectId
}

interface DeleteTagResponse {
    status: number,
    message: string,
    deletedCount: number
}

@Route("tags")
@Tags('Tags')
export default class TagController extends Controller {

    /** 
     * @summary Get all tags
     */
    @Get("/")
    public async getTags(): Promise<TagResponse> {
        const _db = getDb();

        const resultTags = await _db.collection('tags').find().toArray()
        .then((tags: Array<TagInterface>) => {
            const resTags: Array<TagInterface> = [];
            for (const tag of tags) {
                resTags.push(new TagClass(tag._id, tag.name, tag.font, tag.color));
            }
            return resTags;
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        return resultTags;
    }

    /**
     * Returns Tag object found by tagId
     * @summary Get single tag
     */
    @Get("/{tagId}")
    public async getTag(
        @Path() tagId: string
    ): Promise<TagInterface> {
        const _db = getDb();

        const resultTag = await _db.collection('tags').findOne({_id: new ObjectId(tagId)})
        .then((tag: TagInterface) => {
            return new TagClass(
                tag._id, 
                tag.name,
                tag.font,
                tag.color
            );
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        return resultTag;
    }

    /** 
     * Adds single tag with filled out data.
     * @summary Add tag
     */
    @SuccessResponse("201", "A new tag has been added")
    @Post()
    public async addTag(
        @Body() body: TagInterface
    ): Promise<AddTagResponse> {
        const _db = getDb();

        const sentTag = new TagClass(
            null, 
            body.name,
            body.font,
            body.color
        );

        const res = await _db.collection('tags').insertOne(sentTag)
        .then((res: any) => {
            return {status: 201, message: 'A new tag has been added', tagId: res.insertedId};
        })
        .catch((err: object) => {
            console.log(err);
            return {status: 404, message: 'An errror occured'};
        });

        return res;
    }

    /** 
     * Updates tag by selected tagId
     * @summary Update tag
     */
    @SuccessResponse("201", "Tag has been updated")
    @Put('/{tagId}')
    public async editTag(
        @Path() tagId: string,
        @Body() body: TagInterface
    ): Promise<UpdateTagResponse> {
        const _db = getDb();

        const currentTagData = await _db.collection('tags').findOne({_id: new ObjectId(tagId)})
        .then((tag: TagInterface) => {
            return new TagClass(
                tag._id, 
                tag.name,
                tag.font,
                tag.color
            );
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        const updatedTag = new TagClass(
            new ObjectId(tagId), 
            body.name ? body.name : (await currentTagData).name, 
            body.font ? body.font : (await currentTagData).font, 
            body.color ? body.color : (await currentTagData).color, 
        );

        const res = await _db.collection('tags').updateOne({_id: new ObjectId(tagId)}, {$set: updatedTag})
        .then((res: any) => {
            return {status: 201, message: 'Tag has been updated', tagId: res.upsertedId};
        })
        .catch((err: object) => {
            console.log(err);
            return {status: 404, message: 'An errror occured'};
        });

        return res;
    }

    /** 
     * Deletes single tag found by supplied tagId
     * @summary Delete single tag
     */
    @Delete("/{tagId}")
    public async deleteTag(
        @Path() tagId: string
    ): Promise<DeleteTagResponse> {
        const _db = getDb();

        const result = await _db.collection('tags').deleteOne({_id: new ObjectId(tagId)})
        .then((res: any) => {
            return {status: 200, message: "Tag has been deleted", deletedCount: res.deletedCount};
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        return result;
    }
}
