import { ObjectId } from "mongodb";
import { Post as PostClass, PostInterface } from "../models";
import { Get, Route, Post, Body, Controller, SuccessResponse, Path, Delete, Put, Tags } from "tsoa";
import { postStatus } from "../types/postStatus";

const getDb = require('../utils/database').getDb;

interface PostsResponse {
  posts: Array<PostInterface>;
}

interface AddPostResponse {
  status: number,
  message: string,
  postId: ObjectId
}

interface DeletePostResponse {
  status: number,
  message: string,
  deletedCount: number
}

interface UpdatePostResponse {
  status: number,
  message: string,
  postId: ObjectId
}

interface DeletePostsBody {
  posts: Array<ObjectId>
}

@Route("posts")
@Tags('Post')
export default class PostController extends Controller {

  /** 
   * @summary Get all posts
  */
  @Get("/")
  public async getPosts(): Promise<PostsResponse> {
    const _db = getDb();

    const resultPosts = await _db.collection('posts').find().toArray()
    .then((posts: Array<PostInterface>) => {
        const resPosts: Array<PostInterface> = [];
        for (const post of posts) {
            resPosts.push(new PostClass(post._id, post.title, post.status, post.description, post.createdAt, post.updatedAt, post.author, post.tags, post.categories));
        }
        return resPosts;
    })
    .catch((err: object) => {
        console.log(err);
        return err;
    });

    return resultPosts;
  }

  /**
   * Returns Post object found by postId
   * @summary Get single post
   */
  @Get("/{postId}")
  public async getPost(
    @Path() postId: string
  ): Promise<PostInterface> {
    const _db = getDb();

    const resultPost = await _db.collection('posts').findOne({_id: new ObjectId(postId)})
    .then((post: PostInterface) => {
        return new PostClass(
          post._id, 
          post.title, 
          post.status, 
          post.description, 
          post.createdAt, 
          post.updatedAt, 
          post.author, 
          post.tags, 
          post.categories
        );
    })
    .catch((err: object) => {
        console.log(err);
        return err;
    });

    return resultPost;
  }

  /** 
   * Adds single post with filled out data. Default status is Draft, createdAt, and updatedAt properties are generated automatically.
   * @summary Add post
  */
  @SuccessResponse("201", "A new post has been added")
  @Post()
  public async addPost(
    @Body() body: PostInterface
    ): Promise<AddPostResponse> {
    const _db = getDb();

    const sentPost = new PostClass(
      null, 
      body.title, 
      body.status ? body.status : postStatus.Draft, 
      body.description, 
      new Date(), 
      new Date(), 
      body.author, 
      body.tags, 
      body.categories
    );

    const res = await _db.collection('posts').insertOne(sentPost)
    .then((res: any) => {
        return {status: 201, message: 'A new post has been added', postId: res.insertedId};
    })
    .catch((err: object) => {
        console.log(err);
        return {status: 404, message: 'An errror occured'};
    });

    return res;
  }

  /** 
   * Updates post by selected postId
   * @summary Update post
  */
  @SuccessResponse("201", "Post has been updated")
  @Put('/{postId}')
  public async editPost(
    @Path() postId: string,
    @Body() body: PostInterface
    ): Promise<UpdatePostResponse> {
    const _db = getDb();

    const currentPostData = await _db.collection('posts').findOne({_id: new ObjectId(postId)})
    .then((post: PostInterface) => {
        return new PostClass(
          post._id, 
          post.title, 
          post.status, 
          post.description, 
          post.createdAt, 
          post.updatedAt, 
          post.author, 
          post.tags, 
          post.categories
        );
    })
    .catch((err: object) => {
        console.log(err);
        return err;
    });

    const updatedPost = new PostClass(
      new ObjectId(postId), 
      body.title ? body.title : (await currentPostData).title, 
      body.status ? body.status : (await currentPostData).status, 
      body.description ? body.description : (await currentPostData).description, 
      (await currentPostData).createdAt, 
      new Date(), 
      body.author ? body.author : (await currentPostData).author, 
      body.tags ? body.tags : (await currentPostData).tags, 
      body.categories ? body.categories : (await currentPostData).categories);

    const res = await _db.collection('posts').updateOne({_id: new ObjectId(postId)}, {$set: updatedPost})
    .then((res: any) => {
        return {status: 201, message: 'Post has been updated', postId: res.upsertedId};
    })
    .catch((err: object) => {
        console.log(err);
        return {status: 404, message: 'An errror occured'};
    });

    return res;
  }
  
  /** 
   * Deletes single post found by supplied postId
   * @summary Delete single post
  */
  @Delete("/{postId}")
  public async deletePost(
    @Path() postId: string
  ): Promise<DeletePostResponse> {
    const _db = getDb();

    const result = await _db.collection('posts').deleteOne({_id: new ObjectId(postId)})
    .then((res: any) => {
      return {status: 200, message: "Post has been deleted", deletedCount: res.deletedCount};
    })
    .catch((err: object) => {
        console.log(err);
        return err;
    });

    return result;
  }

  /** 
   * @summary Delete multiple posts
  */
  @SuccessResponse("200", "Posts have been deleted")
  @Post('/delete')
  public async deletePosts(
    @Body() body: DeletePostsBody
    ): Promise<DeletePostResponse> {
    const _db = getDb();

    const res = await _db.collection('posts').deleteMany({_id: { $in: body.posts.map(e => new ObjectId(e))}})
    .then((res: any) => {
        return {status: 201, message: 'Posts have been deleted', deletedCount: res.deletedCount};
    })
    .catch((err: object) => {
        console.log(err);
        return {status: 404, message: 'An errror occured'};
    });
    
    return res;
  }
}
