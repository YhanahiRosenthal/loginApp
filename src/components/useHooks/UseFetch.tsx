import { useState, useEffect } from "react";
import axios from "axios";

const UseFetch = (url: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
    const abortController = new AbortController();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
          try {
            const resp = await axios.get(url, {
              signal: abortController.signal
            });
            const data = await resp?.data;

            setApiData(data);
            setIsLoading(false);
          } catch (error: any) {
            if (error.name === 'AbortError') {
              console.error(error.message);
            } else {
              setServerError(error);
              setIsLoading(false);
            }
          }
        };

        fetchData();

        return () => {
          abortController.abort();
        }

      }, [url]);

      return { isLoading, apiData, serverError };
}

export default UseFetch;