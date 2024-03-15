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

  const source = axios.CancelToken.source();

  const fetchData = async (url: string, method: HttpMethods, headers?: any, data?: any, callback?: any) => {
    const config: any = {
      method: method,
      url: url,
      headers: headers,
      data: data,
      timeout: 15000,
      withCredentials:true
    };
    setIsLoading(true);
    try {
      const {data: responseData} = await axios(config);
      callback({success: true, responseData})
    } catch (error: any) {
      callback({success:false, errorMessage:error})
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
}

const cancel = () => {
  if(source) {
    source.cancel('Request canceled')
  }
}

  useEffect(() => {
      return () => {
        cancel();
      };
  }, []);
  return { fetchData , cancel, isLoading};
  }

  export { useFetch, HttpMethods };