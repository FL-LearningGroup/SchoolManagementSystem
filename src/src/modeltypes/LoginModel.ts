export type TLoginParams = {
    userName: string;
    password: string;
};

export type TLoginState = {
    userName?: string;
    token?: string;
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
};

