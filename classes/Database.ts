import mysql from "mysql2/promise";

// Model - Quem conecta com o Banco e traz os dados
export class Database {

    // Conecta o servidor com o Banco de Dados
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

        // Conectando no Banco de Dados usando o método connection, que já foi criado nesta classe. Por isso, utilizo o this para acessá-lo
        const connection = await this.connection();

        return connection.query(script, params);

    }

}