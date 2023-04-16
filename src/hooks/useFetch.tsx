/* Libraries */
import { useState, useEffect, useCallback } from 'react';

/*Types */
import { ApiResponse } from '../types/types';

export const useFetch = (measure: string, range: string | number): ApiResponse => {

  const [ dataResponse, setDataresponse] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const  getDataFromAPI = useCallback( async () => {

    setLoading(true);

    try {
      const apiResponse = await fetch(
        `https://datausa.io/api/data?drilldowns=State&measures=${measure}&year=${range}`
      );
      const json = await apiResponse.json();
      setDataresponse(json);
    } catch(error) {
      setError(error);
    }

    setLoading(false);

    },
    [measure, range],
  )
  
  useEffect(() => {

    if( measure || range ){
      getDataFromAPI();
    }

  }, [measure, range, getDataFromAPI]);

  return { dataResponse, error, loading };
};