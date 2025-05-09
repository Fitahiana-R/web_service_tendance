import * as dotenv  from 'dotenv';
dotenv.config();

export function getRequiredEnv(name: string): string {
    const value = process.env[name];
    if(!value){
        throw new Error ("erreu");

    }
    return value;
}