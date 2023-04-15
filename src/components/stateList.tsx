
/* Hooks */
import { useFetch, ApiResponse } from '../hooks/useFetch';

const StateList = () => {

    const data: ApiResponse = useFetch(
        'https://datausa.io/api/data?drilldowns=State&measures=Property+Value&year=2018,2019'
      );
      // print the output
      if (!data.loading) console.log(data);

        
};

export default StateList;