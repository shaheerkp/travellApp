import { Request, Router } from "express";

import { deleteData, getDataFromApi } from "../controller/locationController";

const router: Router = Router();

router.get("/locations", async (req: Request, res) => {
  let params = req.query.location || "";
  try {
    const data = await getDataFromApi(params.toString());
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: "err" });
  }
});

router.delete("/locations", async (req: Request, res) => {
  let location = req.query.location?.toString() || "";
  let name = req.query.name?.toString() || "";
  let deleted = await deleteData(location, name);
  if (deleted) res.status(200).json(true);
  res.status(400);
});

export { router };
