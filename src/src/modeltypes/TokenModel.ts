import { UserRoleEnum } from './UserModel';
import  GlobalVariable from './GlobalModel'

export const sessionStorageType = 'session';
export const localStorageType = 'local';

function getStorageType(): Storage {
    if (GlobalVariable.tokenStoargeType === sessionStorageType)
    return window.sessionStorage;
    return window.localStorage;
}

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

/*
1. Check whether token exists in localStorage. 
*/
/**
 * 
 * @returns Return ture if token exists, otherwise return false.
 */
export function checkTokenData(): boolean {

    return  getStorageType().getItem(applicationTokenId) === null ? false : true;
}

/*
1. Check token collection whether exists in localStorage.
2. Existed.
    2.1 Get token collection.
    2.2 Replace existed tokendara using new tokendata.
    2.3 Storage updated token collection into localStorage.
    2.4 Function return.
3. No-exist.
    3.1 Create new token collection in localStorage and storage tokendate into token collection.
    3.2 Funtion return.
*/

/**
 * Create new token collection or update tokedata in the token collection.
 * @param tokenData New tokendata
 * @returns void
 */
export function storageTokenData(tokenData: TTokenData): void {
    //Get token data from the localstorage.
    let tokenJson:string | null = null;
    let token: TToken;

    // Try get token collection.
    tokenJson = getStorageType().getItem(applicationTokenId);

    // token collection not exists in localStorage.
    if (tokenJson === null) {
        // Create new token collection.
        token = {
            tokenData: [tokenData]
        };
        getStorageType().setItem(applicationTokenId, JSON.stringify(token));

        // Function return.
        return;
    }

    // Token  collection exists in the localStorage.
    token = JSON.parse(tokenJson);
    
    // Update existed tokendata using new tokendata.
    token.tokenData.forEach(item => {
        if (item.user === tokenData.user)
        {
            item = tokenData;
        }
    });

    // Storgae token collection into the localStorage.
    getStorageType().setItem(applicationTokenId, JSON.stringify(token))  

    // Function return.
    return;
}

/*
1. Get tokendata of the specified user.
2. Existed
    2.1 return the user token data.
3. No-exist
    3.1 return null.
*/
/**
 * 
 * @param user identity of the user. if user = null, get first user.
 * @returns Return the tokendata of the specified user if user exists, otherwise return null.
 */
export function getTokenData(user: string | null): TTokenData | null {
    // Get the token collection from the localStorage.
    let tokenJson: string | null = getStorageType().getItem(applicationTokenId);

    // Return null if the token collection no exists.
    if (tokenJson === null) return null;

    let token: TToken = JSON.parse(tokenJson);

    // Get the tokendata of the specified user.
    if (user != null) {
        token.tokenData.forEach(item => {
            if (item.user === user && (Date.parse(item.expiredAt) > Date.now())) {
                return item;
            }
            return null;
        });
    }
    if (user === null && (Date.parse(token.tokenData[0].expiredAt) > Date.now()))
        return token.tokenData[0];

    return null;
}

/**
 * Clear the token collection.
 */
export function clearTokenData(): void {
    getStorageType().removeItem(applicationTokenId);
}

/*
1. Get the token collection.
2. No-exist
    2.1 Function return.
3. Exist
    3.1 Get the specified user toke from the token collection.
    3.2 No-exist
        3.2.1 function return.
    3.3 Exist
        3.3.1 Remove the specified user tokendata from the token collection.
        3.3.2 storage the updated token collection into the localStorage.
*/
/**
 * 
 * @param user The specified user identity
 * @returns void
 */
export function removeTokenData(user: string): void {
    // Get JSON of the token collection.
    let tokenJson: string | null = getStorageType().getItem(applicationTokenId);
    
    if (tokenJson === null) return;

    // Parse JSON to Object
    let token: TToken = JSON.parse(tokenJson);
    
    // Remove the specified user tokendata if the tokendata exists, otherwise no influent.
    let tokenData: TTokenData[] = token.tokenData.filter(function(value, index, arr) {
        return value.user != user;
    })

    // storage the updated token collection into the localStorage.
    token.tokenData = tokenData;
    getStorageType().setItem(applicationTokenId, JSON.stringify(token));
    return;
}
        