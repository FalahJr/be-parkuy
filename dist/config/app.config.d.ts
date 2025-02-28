export interface ServerConfig {
    port: string;
}
export interface DbConfigMysql {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
export interface DbConfigRedis {
    host: string;
    port: number;
    password: string;
    db: number;
}
declare const _default: () => Record<string, any>;
export default _default;
