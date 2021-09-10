import express, { Request, Response } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api/", productRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("API online!");
});

app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT, () => {
    return console.log(
        `server is listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    );
});
