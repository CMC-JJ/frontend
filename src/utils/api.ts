import {useAuthStore} from '@/store';
import {Alert} from 'react-native';

const BASE_URL = 'https://dev.jj-gotogether.shop/';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
  headers?: any;
  method?: HTTPMethod;
  body?: any;
};

export const request = async (
  url: string,
  data = {},
  method: HTTPMethod = 'GET',
  token?: string,
) => {
  const options: Options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  };
  const store = useAuthStore.getState();
  if (store) {
    options.headers['x-access-token'] = `${store.auth.jwtToken}`;
  }
  if (method === 'GET') {
    url += '?' + new URLSearchParams(data).toString();
  } else {
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers['x-access-token'] = token;
  }

  try {
    const res = await fetch(`${BASE_URL}` + url, options);

    if (!res.ok) {
      Alert.alert('서버와의 통신이 실패하였습니다.');
    }

    return await res.json();
  } catch (error: unknown) {
    /**
     * @link https://immigration9.github.io/typescript/2022/01/09/error-typescript.html
     */
    // if (error instanceof Error) message = error.message;
    Alert.alert('서버와의 통신이 실패하였습니다.');
  }
};
