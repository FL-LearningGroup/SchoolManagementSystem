import { UserRoleEnum } from './UserModel';

export const applicationTokenId: string = "school-management-system";

export type TTokenData = {
    user: string;
    password: string;
    accessToken: string;
    role: UserRoleEnum; 
    createAt: string;
    expiredAt: string;

}
export type TToken = {
    tokenData: TTokenData[];
}

export function checkTokenData(): boolean {
    return window.localStorage.getItem(applicationTokenId) === null ? false : true;
}

export function storageTokenData(tokenData: TTokenData): void {
    //Get token data from the localstorage.
    let tokenJson:string | null = null;
    let token: TToken;

    tokenJson = window.localStorage.getItem(applicationTokenId);
    if (tokenJson === null) {
        token = {
            tokenData: [tokenData]
        };
        window.localStorage.setItem(applicationTokenId, JSON.stringify(token));
        return;
    }

    token = JSON.parse(tokenJson);
    
    token.tokenData.forEach(item => {
        if (item.user === tokenData.user)
        {
            item = tokenData;
        }
    });

    window.localStorage.setItem(applicationTokenId, JSON.stringify(token))  
}

export function getTokenData(user: string): TTokenData | null {
    let tokenJson: string | null = window.localStorage.getItem(applicationTokenId);

    if (tokenJson === null) return null;

    let token: TToken = JSON.parse(tokenJson);

    token.tokenData.forEach(item => {
        if (item.user === user) {
            return item;
        }
        return null;
    });

    return null;
}

export function clearTokenData(): void {
    window.localStorage.removeItem(applicationTokenId);
}

export function removeTokenData(user: string): void {
    let tokenJson: string | null = window.localStorage.getItem(applicationTokenId);
    if (tokenJson === null) return;

    let token: TToken = JSON.parse(tokenJson);
    
    let tokenData: TTokenData[] = token.tokenData.filter(function(value, index, arr) {
        return value.user != user;
    })

    token.tokenData = tokenData;
    window.localStorage.setItem(applicationTokenId, JSON.stringify(token));
}
        