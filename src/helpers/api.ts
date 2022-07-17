import axios from 'axios';

interface Result {
  success: boolean;
  response: any;
  error: string;
}

/**
 * Api calls wrapper
 *
 * @param {string} method Http method
 * @param {string} endpoint Api endpoind
 * @param {object} [params] Data to send with get method
 * @param {object} [data] Data to send with post method
 */
export default async function api(
    method: string,
    endpoint: string,
    params?: object,
    data?: object,
): Promise<Result> {
  const result:Result = {
    success: false,
    response: null,
    error: '',
  };

  try {
    const response = await axios({
      method: method,
      url: `http://localhost:8000/api/${endpoint}`,
      withCredentials: true,
      params: params,
      data: data,
    });

    result.response = response.data;
  } catch (error) {
    console.log(error);
    window.location.href = '/login';
  }

  return result;
}
