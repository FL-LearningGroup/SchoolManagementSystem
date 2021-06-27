export type TUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    unreadCount?: number;
    email?: string;
    notifyCount?: number;
    country?: string;
    role?: string;
  };