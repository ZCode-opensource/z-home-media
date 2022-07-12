import axios from 'axios';

interface Result {
  success: boolean;
  items: never[];
  error: string;
}

/**
 * Api calls wrapper
 *
 * @param {string} method Http method
 * @param {string} endpoint Api endpoind
 */
export default async function api(
    method: string,
    endpoint: string,
): Promise<Result> {
  const result:Result = {
    success: false,
    items: [],
    error: '',
  };

  try {
    const response = await axios({
      method: method,
      url: `http://localhost:8000/api/${endpoint}`,
      withCredentials: true,
    });

    result.items = response.data.items;
  } catch (error) {
    console.log(error);
    window.location.href = '/login';
  }

  return result;
}
