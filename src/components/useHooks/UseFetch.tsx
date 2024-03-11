import { useState, useEffect } from "react";
import axios from "axios";

enum HttpMethods{
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/*This uses the fetchHook passing the details for this request
(the URL, method, data, and any header) and receives the response with success:true / false,
 message: <the expected data>*/

/* url: `${process.env.REACT_APP_API_URL}/getToken/1`*/

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiData, setData] = useState(null);
  const [error, setError] = useState(null);

  const source = axios.CancelToken.source();

  const fetchData = async (url: string, method: HttpMethods, headers?: any, body?: any) => {
    const config: any = {
      method: method,
      url: url,
      headers: headers,
      data: body,
      timeout: 15000,
      withCredentials:true
    };
    console.log(config);
    setIsLoading(true);
    try {
      const {data: response} = await axios(config);
      setSuccess(true);
      setData(response);
    } catch (error: any) {
      setSuccess(false);
      setError(error);

    } finally {
      setIsLoading(false);
    }

      console.log({
        apiData: apiData,
        isLoading: isLoading,
        success: success,
        errorData:error,
    });
}

  useEffect(() => {
      return () => {
        if (source) {
          source.cancel('Request canceled.');
        }
      };
  }, []);
  return { fetchData , isLoading, apiData, success, error };
  }

  export { useFetch, HttpMethods };