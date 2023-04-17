/* Libraries */
import { useState, useEffect, useCallback } from 'react';


export const useDisplayData = (cookData: any, growyList: any)  => {

  const [ displayData, setDisplayData] = useState<any>([]);

    const prepareDisplayData = useCallback( () => {
        if( cookData && cookData.length !== 0 ){

          const newDisplayData = cookData.map( ( item: any ) => {
            let found = growyList.find( (el: any) => el.State === item.State )
            item["growth100"] = found?.growth100;
            return item;
          });

          newDisplayData.sort((a: any, b: any) => Number(b.growth100) - Number(a.growth100));
          
          setDisplayData(newDisplayData);

        }
      },[cookData, growyList])
    
      useEffect( () => {
        if( cookData && cookData.length !== 0  && growyList && growyList.length !== 0 ){
          prepareDisplayData();
        }
       }, [
        prepareDisplayData,
        cookData,
        growyList])

    return { displayData };

}
