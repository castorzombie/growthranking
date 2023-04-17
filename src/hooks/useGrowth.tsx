/* Libraries */
import { useState, useEffect, useCallback } from 'react';

/* Types */
import { Growy } from '../types/types';

/* Utils */
import { calculateYOY } from '../utils/range';


export const useGrowth = (dataResponse: any)  => {

    const [growyList, setGrowyList] = useState<Growy[]>([]);

    const prepareGrowyList = useCallback( (data: any) => {

        let growyData:Growy[] = []

        data.map( (currentValues: any):void => {

            const itemYear = currentValues.Year;

            const oldValues = dataResponse.data.find( (el: any) => (
                el.State === currentValues.State && 
                el.Year !== itemYear ) 
            );  

            const { 'Property Value': PVCurrent } = currentValues;
            const { 'Property Value': PVOld } = oldValues;

            const growy = {
                State: currentValues.State,
                growth100: calculateYOY( PVOld, PVCurrent )
            };

            const found = growyData.some( (el: any) => el.State === growy.State );
            
            if(!found){
                growyData.push(growy);
            }

        });

        setGrowyList(growyData);

    }, [dataResponse] );

    useEffect(() => {
        if(dataResponse){

            prepareGrowyList(dataResponse.data);
            
        }
    }, [dataResponse, prepareGrowyList]);

    return { growyList };

}
