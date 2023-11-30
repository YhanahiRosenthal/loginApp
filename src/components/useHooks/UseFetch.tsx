import { useState, useEffect } from "react";
import axios from "axios";

const UseFetch = (url: any) => {

    const [data, setData] = useState(null);
    const [messageError, setMessageError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                const data = await res?.data;

                setData(data);
            } catch (error: any) {
                setMessageError(error);
            }
        }

        fetchData();

    },[url])


    return {data, messageError}
}

export default UseFetch;