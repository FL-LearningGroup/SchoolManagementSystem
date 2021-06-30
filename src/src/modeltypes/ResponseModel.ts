export enum ResponseBodyEnum {
    Ok = 'Ok',
    Error = 'Error',
}

export type TResponseBody<T> = {
    status: ResponseBodyEnum,
    message: string,
    data: T | null,
}