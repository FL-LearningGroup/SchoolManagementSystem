import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryUser(user: string): Promise<any> {
  return request('/api/user/id', {
    method: 'get',
    params: {id: user}
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
