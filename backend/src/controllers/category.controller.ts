import { ObjectId } from "mongodb";
import { Get, Route, Post, Body, Controller, SuccessResponse, Path, Delete, Put, Tags } from "tsoa";
import { Category as CategoryClass, CategoryInterface } from "../models/category";

const getDb = require('../utils/database').getDb;

interface CategoryResponse {
  categories: Array<CategoryInterface>;
}

interface AddCategoryResponse {
    status: number,
    message: string,
    categoryId: ObjectId
}

interface UpdateCategoryResponse {
    status: number,
    message: string,
    categoryId: ObjectId
}

interface DeleteCategoryResponse {
    status: number,
    message: string,
    deletedCount: number
}

@Route("categories")
@Tags('Categories')
export default class CategoryController extends Controller {

    /** 
     * @summary Get all categories
     */
    @Get("/")
    public async getCategories(): Promise<CategoryResponse> {
        const _db = getDb();

        const resultCategories = await _db.collection('categories').find().toArray()
        .then((categories: Array<CategoryInterface>) => {
            const resCategories: Array<CategoryInterface> = [];
            for (const category of categories) {
                resCategories.push(new CategoryClass(category._id, category.name, category.font, category.color));
            }
            return resCategories;
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        return resultCategories;
    }

    /**
     * Returns Category object found by categoryId
     * @summary Get single category
     */
    @Get("/{categoryId}")
    public async getCategory(
        @Path() categoryId: string
    ): Promise<CategoryInterface> {
        const _db = getDb();

        const resultCategory = await _db.collection('categories').findOne({_id: new ObjectId(categoryId)})
        .then((category: CategoryInterface) => {
            return new CategoryClass(
                category._id, 
                category.name,
                category.font,
                category.color
            );
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        return resultCategory;
    }

    /** 
     * Adds single category with filled out data.
     * @summary Add category
     */
    @SuccessResponse("201", "A new category has been added")
    @Post()
    public async addCategory(
        @Body() body: CategoryInterface
    ): Promise<AddCategoryResponse> {
        const _db = getDb();

        const sentCategory = new CategoryClass(
            null, 
            body.name,
            body.font,
            body.color
        );

        const res = await _db.collection('categories').insertOne(sentCategory)
        .then((res: any) => {
            return {status: 201, message: 'A new category has been added', categoryId: res.insertedId};
        })
        .catch((err: object) => {
            console.log(err);
            return {status: 404, message: 'An errror occured'};
        });

        return res;
    }

    /** 
     * Updates category by selected categoryId
     * @summary Update category
     */
    @SuccessResponse("201", "Category has been updated")
    @Put('/{categoryId}')
    public async editCategory(
        @Path() categoryId: string,
        @Body() body: CategoryInterface
    ): Promise<UpdateCategoryResponse> {
        const _db = getDb();

        const currentCategoryData = await _db.collection('categories').findOne({_id: new ObjectId(categoryId)})
        .then((category: CategoryInterface) => {
            return new CategoryClass(
                category._id, 
                category.name,
                category.font,
                category.color
            );
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        const updatedCategory = new CategoryClass(
            new ObjectId(categoryId), 
            body.name ? body.name : (await currentCategoryData).name, 
            body.font ? body.font : (await currentCategoryData).font, 
            body.color ? body.color : (await currentCategoryData).color, 
        );

        const res = await _db.collection('categories').updateOne({_id: new ObjectId(categoryId)}, {$set: updatedCategory})
        .then((res: any) => {
            return {status: 201, message: 'Category has been updated', categoryId: res.upsertedId};
        })
        .catch((err: object) => {
            console.log(err);
            return {status: 404, message: 'An errror occured'};
        });

        return res;
    }

    /** 
     * Deletes single category found by supplied categoryId
     * @summary Delete single category
     */
    @Delete("/{categoryId}")
    public async deleteCategory(
        @Path() categoryId: string
    ): Promise<DeleteCategoryResponse> {
        const _db = getDb();

        const result = await _db.collection('categories').deleteOne({_id: new ObjectId(categoryId)})
        .then((res: any) => {
            return {status: 200, message: "Category has been deleted", deletedCount: res.deletedCount};
        })
        .catch((err: object) => {
            console.log(err);
            return err;
        });

        return result;
    }
}
