import { IUser } from "../interfaces/IUser";
import { Database } from "./Database";

export class User extends Database {

    async list() {        
        return this.command("SELECT * FROM users;");
    }

    async getById(userId: number) {

        const [rows] = await this.command(`SELECT * FROM users WHERE id = ?;`, [userId]);

        const data = rows as [];

        if (data.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        return data;

    }

    create(params: IUser) {

        const { name, email, password, branchId } = params;

        const data = [name, email, password, branchId];

        return this.command(`CALL sp_users_save(?, ?, ?, ?);`, data);

    }

    async delete(userId: number) {

        await this.getById(userId);

        return this.command("DELETE FROM users WHERE id = ?;", [userId]);

    }

}