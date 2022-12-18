import express from "express";
import PostController from "../controllers/post.controller";

const router = express.Router();

router.get("/posts", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.getPosts();
  return res.send(response);
});

router.get("/posts/:postId", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.getPost(_req.params.postId);
  return res.send(response);
});

router.post("/posts", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.addPost(_req.body);
  return res.status(response.status).send(response.message);
});

router.put("/posts/:postId", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.editPost(_req.params.postId, _req.body);
  return res.status(response.status).send(response.message);
});

router.delete("/posts/:postId", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.deletePost(_req.params.postId);
  return res.status(response.status).send(response.message);
});

router.post("/posts/delete", async (_req, res) => {
  const controller = new PostController();
  const response = await controller.deletePosts(_req.body);
  return res.status(response.status).send(response.message);
});

export default router;
