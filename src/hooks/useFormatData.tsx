/* Libraries */
import { useState, useEffect } from 'react';

/*Types */
import { CookState } from '../types/types';

export const useFormatdata = (dataResponse: any)  => {

  const [ cookData, setCookData ] = useState<CookState[]>([]);

  useEffect(() => {
      if(dataResponse){

        const cook: CookState[] = [];

        dataResponse.data.map( ( values : any):void => {

          const { 
            'Household Income': Household, 
            'Property Value': PropertyValue, 
            Population, 
            State } = values;
        
          const growth100 = 0;

          const cookItem = { 
            Household, 
            PropertyValue, 
            Population, 
            State, 
            growth100 };
            
          cook.push(cookItem);

        });

        setCookData(cook);

      }
  }, [dataResponse]);

  return { cookData } ;

}
