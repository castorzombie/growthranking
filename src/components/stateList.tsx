
/* Libraries */
import React, { useState, useEffect } from 'react';

/* Hooks */
import { useFetch } from '../hooks/useFetch';
import { useFormatdata } from '../hooks/useFormatData';
import { useGrowth } from '../hooks/useGrowth';

/* types */
import { stateListProps, ApiResponse } from '../types/types';

/* Components */
import { StateElement } from './stateElement';

/* Bootstrap */
import { Container, Row } from 'react-bootstrap'


const StateList = ({children, dataRequest}: stateListProps) => {

  const [ displayData, setDisplayData] = useState<any>([]);

  const primaryResponse: ApiResponse = useFetch(
    dataRequest.measure,
    dataRequest.year
  );

  const growthResponse: ApiResponse = useFetch(
    'Property+Value',
    dataRequest.years
  );

  const { cookData } = useFormatdata(
    primaryResponse.dataResponse
  );

  const { growyList } = useGrowth(
    growthResponse.dataResponse
  );

  useEffect( () => {
    if( cookData && cookData.length !== 0 ){
      const newDisplayData = cookData.map( ( item: any ) => {
        let found = growyList.find( el => el.State === item.State )
        item["growth100"] = found?.growth100;
        return item;
      })
      newDisplayData.sort((a, b) => Number(b.growth100) - Number(a.growth100));
      console.log(newDisplayData);
      setDisplayData(newDisplayData);
    }

   }, [
    cookData,
    primaryResponse, 
    growthResponse, 
    growyList])

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        { displayData && displayData.map( ( el: any, index: React.Key ) => {
          return (
              <React.Fragment key={index} >
                <StateElement stat={el} />
              </React.Fragment>
              )
        } ) }
      </Row>
    </Container>
  )      
};

export default StateList;