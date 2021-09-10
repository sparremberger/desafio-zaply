import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

const getApi = asyncHandler(async (req: Request, res: Response) => {
    res.json("Api online!");
});

// @desc Recebe os dados de todos os produtos no banco
// @route GET /api/produtos/
// @access Publico
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const pagina: number = Number(req.query.pagina) || 1;

    // Collation indica que a query atenderá a características específicas de uma linguagem. Nesse caso, a língua portuguesa.
    // Strenght : 2 significa que irá considerar acentos na hora de ordenar o resultado
    const product = await Product.find({})
        .collation({ locale: "pt", strength: 2 })
        .limit(100) // limita o número de objetos retornados na query
        .sort({ nome: 1 }) // ordena por ordem alfabética
        .skip((pagina - 1) * 100); // mágica pros resultados virem paginados e 100 por página
    const result = product.map((obj: any) => {
        let rObj = {};
        rObj = {
            id: obj.id,
            image: obj.image,
            name: obj.name,
            categories: obj.categories,
            price: obj.price,
            brand: obj.brand,
        };
        return rObj;
    });
    res.json(result);
});

// @desc Retorna os dados completos de um produto específico
// @router GET /api/produto/:id
// @access Publico
const getProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findOne(
        { id: req.params.id },
        { addresses: { $slice: [0, 1] }, _id: false } // ou então tira, pois é irrelevante
    );
    if (!product) {
        res.status(404);
        throw new Error("Produto não encontrado");
    }
    res.json(product);
});

// @desc Retorna o resultado de uma busca por nome
// @router GET /api/produtos/search
// @access Publico
const getProductByNameSearch = asyncHandler(
    async (req: Request, res: Response) => {
        const query: any = req.query.q;
        const pagina: number = Number(req.query.pagina) || 1;

        // constroi a string de query, depois manda a string toda pra dentro do `` no text search do mongodb
        let mongoQuery: string = "";
        if (Array.isArray(query)) {
            for (let i = 0; i < query.length; i++) {
                mongoQuery += `"${query[i]}"`;
                if (i < query.length - 1) {
                    mongoQuery += `,`;
                }
            }
        } else {
            mongoQuery = `"${query}"`;
        }

        // Busca os alimentos no banco de dados
        const product = await Product.find({
            $text: {
                $search: `${mongoQuery}`,
            },
        })
            .limit(100)
            .skip((pagina - 1) * 100);

        // Query adicional só para buscar o total de alimentos, para fins de paginação
        const count = await Product.find({
            $text: {
                $search: `${mongoQuery}`,
            },
        }).count();

        // debug, remover
        if (Product.length === 0) {
            res.json({ message: "kek" });
        }

        // Mapeia o resultado para um objeto json bonitão
        const result = product.map((obj: any) => {
            let rObj = {};
            rObj = {
                id: obj.id,
                image: obj.image,
                name: obj.name,
                categories: obj.categories,
                price: obj.price,
                brand: obj.brand,
            };
            return rObj;
        });

        // Adiciona a contagem total de resultados no final do array de objetos
        result.push({ totalCount: count });
        res.status(200).json(result);
    }
);

const putProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findOneAndUpdate(
        { id: req.body.id },
        req.body,
        { upsert: true, new: true }
    );
    if (!product) {
        res.status(404);
        throw new Error("Produto não encontrado");
    }
    res.json(product);
});

/*var query = {'username': req.user.username};
req.newData.username = req.user.username;

MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
});*/

export { getApi, getProducts, getProductByNameSearch, getProduct, putProduct };
