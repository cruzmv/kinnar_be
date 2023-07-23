import { Client } from 'pg'

export class Postgres {
    pgConfig = {
        user: 'kinnar',      // default process.env.PGUSER || process.env.USER
        password: '142536',  //default process.env.PGPASSWORD
        host: 'localhost',   // default process.env.PGHOST
        database: 'kinnar'   // default process.env.PGDATABASE || user
        // port?: number,    // default process.env.PGPORT
        // connectionString?: string, // e.g. postgres://user:password@host:5432/database
        // ssl?: any, // passed directly to node.TLSSocket, supports all tls.connect options
        // types?: any, // custom type parsers
        // statement_timeout?: number, // number of milliseconds before a statement in query will time out, default is no timeout
        // query_timeout?: number, // number of milliseconds before a query call will timeout, default is no timeout
        // application_name?: string, // The name of the application that created this Client instance
        // connectionTimeoutMillis?: number, // number of milliseconds to wait for connection, default is no timeout
        // idle_in_transaction_session_timeout?: number // number of milliseconds before terminating any session with an open idle transaction, default is no timeout
      }
    client: any;

    constructor() {
        this.client = new Client(this.pgConfig);
    }


    async UserByEmail(email: string) {
        let response = {
            status: 'error',
            message: 'Couldn not connect to database.',
            data: undefined
        };
        try {
            await this.client.connect();
            response.data = await this.client.query(`select to_json(a) from (select name,confirmed,userid,password from users where email = '${email}') a;`);
            await this.client.end();
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async addUser(data: any) {
        let response = {
            status: 'error',
            message: 'Couldn not connect to database.'
        };
        try {
            await this.client.connect();
            const sqlResponse = await this.client.query(`select kinnar_add_user from kinnar_add_user('[${JSON.stringify(data)}]'::jsonb)`);
            await this.client.end();
            if (sqlResponse.rowCount > 0 ){
                response = sqlResponse.rows[0]['kinnar_add_user'];
            }
        } catch (error) {
            console.log(error);
        }
        return response;
    }


    async confirmUser(id: string) {
        let response = {
            status: 'error',
            message: 'Couldn not connect to database.'
        };
        try {
            await this.client.connect();
            const sqlResponse = await this.client.query(`select kinnar_confirm_user from kinnar_confirm_user('${id}');`);
            await this.client.end();
            if (sqlResponse.rowCount > 0 ){
                response = sqlResponse.rows[0]['kinnar_confirm_user'];
            }
        } catch (error) {
            console.log(error);
        }
        return response;
    }


    



}