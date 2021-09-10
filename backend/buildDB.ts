var fs = require("fs"); // Módulo padrão do node para acessar o filesystem do sistema operacional
var path = require("path");
import glob from "glob"; // Auxiliar de diretórios, para poder usar * e / nos caminhos.
import Product from "../backend/models/productModel";
import mongoose from "mongoose";

// Conecta ao mongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/zaply");

        console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

connectDB();

// Configura o caminho para os dados a serem inseridos no mongo
let directory = path.resolve("../backend/data");
let files = glob.sync(`${directory}/*.json`, {});

// Adiciona os dados no banco
const addData = async () => {
    const index = JSON.parse(fs.readFileSync(`${files}`, "utf8"));
    const food = await Product.insertMany(index);
};

addData();
