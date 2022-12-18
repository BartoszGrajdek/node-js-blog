import TagController from "../controllers/tag.controller";

export const tagRoutes: (router: any) => void = (router) => {
    router.get("/tags", async (_req: any, res: any) => {
        const controller = new TagController();
        const response = await controller.getTags();
        return res.send(response);
    });

    router.get("/tags/:tagId", async (_req: any, res: any) => {
        const controller = new TagController();
        const response = await controller.getTag(_req.params.tagId);
        return res.send(response);
    });
    
    router.post("/tags", async (_req: any, res: any) => {
        const controller = new TagController();
        const response = await controller.addTag(_req.body);
        return res.status(response.status).send(response.message);
    });
    
    router.put("/tags/:tagId", async (_req: any, res: any) => {
        const controller = new TagController();
        const response = await controller.editTag(_req.params.tagId, _req.body);
        return res.status(response.status).send(response.message);
    });

    router.delete("/tags/:tagId", async (_req: any, res: any) => {
        const controller = new TagController();
        const response = await controller.deleteTag(_req.params.tagId);
        return res.send(response);
    });
}