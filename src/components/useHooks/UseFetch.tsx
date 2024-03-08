import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAPIToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiToken, setApiToken] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchToken = async () => {

    const config = {
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/getToken/1`,
      withCredentials: true 
    };


    setIsLoading(true);
    try {
      const {data: response} = await axios(config);
      setApiToken(response);
      setIsLoading(false);
    } catch (error: any) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    console.log({
      apiData: apiToken,
      isLoading: isLoading,
      serverError:serverError
    })
  }, [apiToken, isLoading, serverError]);

  return { isLoading, apiToken, serverError };
}

const useAxiosFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
    const { apiToken } = useFetchAPIToken();

    const fetchData = async (url: any, headers?:any,) => {

      const config = {
        method: 'GET',
        url: url,
        headers: {"X-APIKEY": apiToken!},
        withCredentials: true 
      };


      setIsLoading(true);
      try {
        const {data: response} = await axios(config);
        setApiData(response);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      console.log({
        apiData: apiData,
        isLoading: isLoading,
        serverError:serverError
      })
    }, [apiData, isLoading, serverError]);

      return { fetchData, isLoading, apiData, serverError };
}

const useAxiosPost = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);
  const { apiToken } = useFetchAPIToken();

  const postData = async (url: any, body?: any) => {
    setIsLoading(true);
    try {
      const config = {
        method: 'POST',
        url: url,
        headers: {"X-APIKEY": apiToken!},
        data: body,
        withCredentials: true 
      };
      // console.log('APIToken', apiToken)
      const { data: response } = await axios(config);
      console.log('ResponseX', response);
      setIsLoading(false);
      if (response.success){
        window.location = response.appUrl;
        return;
      }
      // setApiData(response);
      
    } catch (error: any) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log({
      apiData: apiData,
      isLoading: isLoading,
      serverError:serverError
    })
  }, [apiData, isLoading, serverError]);

  return { postData, isLoading, apiData, serverError };
}

export {useAxiosFetch, useAxiosPost};