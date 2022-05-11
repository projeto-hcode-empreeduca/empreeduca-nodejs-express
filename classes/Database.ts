import mysql from "mysql2/promise";

export class Database {

    connection() {

        return mysql.createConnection({
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "root",
            database: "empreeduca",
        });

    }

    async command(script: string, params?: any[]) {

        const connection = await this.connection();

        return connection.query(script, params);

    }

}