import CategoryController from "../controllers/category.controller";

export const categoryRoutes: (router: any) => void = (router) => {
    router.get("/categories", async (_req: any, res: any) => {
        const controller = new CategoryController();
        const response = await controller.getCategories();
        return res.send(response);
    });

    router.get("/categories/:categoryId", async (_req: any, res: any) => {
        const controller = new CategoryController();
        const response = await controller.getCategory(_req.params.categoryId);
        return res.send(response);
    });
    
    router.post("/categories", async (_req: any, res: any) => {
        const controller = new CategoryController();
        const response = await controller.addCategory(_req.body);
        return res.status(response.status).send(response.message);
    });
    
    router.put("/categories/:categoryId", async (_req: any, res: any) => {
        const controller = new CategoryController();
        const response = await controller.editCategory(_req.params.categoryId, _req.body);
        return res.status(response.status).send(response.message);
    });

    router.delete("/categories/:categoryId", async (_req: any, res: any) => {
        const controller = new CategoryController();
        const response = await controller.deleteCategory(_req.params.categoryId);
        return res.send(response);
    });
}