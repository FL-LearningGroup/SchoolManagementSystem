import { UserRoleEnum } from './UserModel';

export type TTokenData = {
    user?: string;
    accessToken?: string;
    role?: UserRoleEnum; 
}
export type TToken = {
    id?: string;
    tokenData?: TTokenData[];
}