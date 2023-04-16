/* Libraries */
import { useState, useEffect } from 'react';

/*Types */
import { GrowthItem } from '../types/types';


export const useGrowth = (dataResponse: any)  => {

  const [ growthData, setGrowthData ] = useState<GrowthItem[]>([]);

  useEffect(() => {
      if(dataResponse){

        dataResponse.data.map( (oldValues : any):void => {

            const currentValues = dataResponse.data.find( (el: any) => el.State === oldValues.State );

            const { 
                'Property Value': PropertyValueCurrent, 
                State 
            } = currentValues;
          
            const { 
                'Property Value': PropertyValueOld 
            } = oldValues;

            let a = PropertyValueCurrent - PropertyValueOld;
            let b = PropertyValueOld;
            let c = a / b;
            const growth100 = c * 100;

            const growthItem : GrowthItem = { 
                State, 
                growth100 };
            
            setGrowthData( prev => [ ...prev, growthItem ]);            
            
        });

      }
  }, [dataResponse]);

  return { growthData };

}
