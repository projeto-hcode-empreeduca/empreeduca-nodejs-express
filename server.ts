import express, { Express, Request, Response } from "express";
import mysql from "mysql2/promise";
import { Database } from "./classes/Database";

const app: Express = express();

const db = new Database();
    
app.get("/", (req: Request, res: Response) => {

    

});

app.get("/usuarios", async (req: Request, res: Response) => {

    const [rows] = await db.command("SELECT * FROM users;");
    
    res.json(rows);

});

app.get("/usuarios/:id", async (req: Request, res: Response) => {

    const { id } = req.params;

    if (id) {
    
        const [rows] = await db.command(`SELECT * FROM users WHERE id = ?;`, [id]);
    
        res.json(rows);

    }

});

app.listen(5001, () => {
    console.log("Servidor rodando!!!");
});


/* Módulos do Node
const express = require("express");
*/