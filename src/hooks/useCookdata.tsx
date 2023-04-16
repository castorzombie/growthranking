/* Libraries */
import { useState, useEffect } from 'react';

/*Types */
import { CookState } from '../types/types';

export const useCookdata = (dataResponse: any)  => {

  const [ cookData, setCookData ] = useState<CookState[]>();

  useEffect(() => {
      if(dataResponse){

        const cook: CookState[] = [];

        dataResponse.data.map( (oldValues : any):void => {

          const currentValues = dataResponse.data.find( (el: any) => el.State === oldValues.State );

          const { 
            'Household Income': Household, 
            'Property Value': PropertyValueCurrent, 
            Population, 
            State } = currentValues;
          
          const { 'Property Value': PropertyValueOld } = oldValues;

          const growth100 = ( PropertyValueCurrent - PropertyValueOld ) / PropertyValueOld * 100;
          console.log( PropertyValueCurrent)
          console.log( PropertyValueOld)
          console.log( growth100)

          const cookItem = { 
            Household, 
            PropertyValue: PropertyValueCurrent, 
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
