import express from "express";
import {
    getProducts,
    getProduct,
    getApi,
    getProductByNameSearch,
    putProduct,
} from "../controllers/productController";
const router = express.Router();

router.route("/").get(getApi);

router.route("/produtos").get(getProducts);

router.route("/id/:id").get(getProduct);

router.route("/id/").put(putProduct); // consertar, o :id está irrelevante no momento

router.route("/produtos/search").get(getProductByNameSearch);

export default router;
