import express, { Express, Request, Response } from "express";
import { User } from "./classes/User";
import { IUser } from "./interfaces/IUser";

// Controller - Ele lida com as informações que o usuário envia e pode realizar algum tipo de tratamento nessas informações

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

const user = new User();
    
app.get("/", (req: Request, res: Response) => {

    res.send("<h1>Seja bem-vindo à API do projeto.</h1>")

});

app.get("/users", async (req: Request, res: Response) => {

    const [rows] = await user.list();
    
    res.json(rows);

});

app.get("/users/:id", async (req: Request, res: Response) => {

    const { id } = req.params;

    if (id) {

        if (isNaN(Number(id))) {
            res.status(400).send("ID inválido.");
        }
    
        user.getById(Number(id)).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(404).send(String(error.message));
        });

    }

});

app.post("/users", async (req: Request, res: Response) => {

    // 1 - Pegar os dados enviados
    const data = req.body as IUser;

    // 2 - Validar os dados
    if (!data.name) {
        res.status(400).send("O nome é obrigatório.");
    }

    if (!data.email) {
        res.status(400).send("O email é obrigatório.");
    }

    if (!data.password) {
        res.status(400).send("A senha é obrigatória.");
    }

    if (!data.branchId) {
        res.status(400).send("A filial é obrigatória.");
    }

    // 3 - Enviar os dados para o Banco
    const [rows] = await user.create(data);

    // 4 - Retornar para o usuário uma mensagem de sucesso ou falha
    res.json(rows);

});

app.delete("/users/:id", async (req: Request, res: Response) => {

    const { id } = req.params;

    if (id) {

        const userId = Number(id);

        if (isNaN(userId)) {
            res.status(400).send("ID inválido.");
            return false;
        }

        user.delete(userId).then(() => {
            res.status(200).send({ result: "Usuário excluído com sucesso!" });
        }).catch((error) => {
            res.status(404).send(String(error.message));
        });

    }

});

app.listen(5001, () => {
    console.log("Servidor rodando!!!");
});


/* Módulos do Node
const express = require("express");
*/