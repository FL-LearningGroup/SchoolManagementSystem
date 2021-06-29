// Generate user data for test.
import { TUser, UserRoleEnum } from '../src/modeltypes/UserModel';

type TUserModel = TUser & {
    userName: string;
    passsword: string;
}

export const userList:TUserModel[] =  [
    {
        name: 'Lucas Yao',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'LucasYao93@outlook.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
        {
            key: '0',
            label: '很有想法的',
        },
        {
            key: '1',
            label: '专注设计',
        },
        {
            key: '2',
            label: '辣~',
        },
        {
            key: '3',
            label: '大长腿',
        },
        {
            key: '4',
            label: '川妹子',
        },
        {
            key: '5',
            label: '海纳百川',
        },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        userName: 'LucasYao',
        passsword: '123456',
        role: UserRoleEnum.Admin
    }
];