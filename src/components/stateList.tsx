
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

  const [ primaryData, setPrimaryData] = useState<any>([]);

  const primaryResponse: ApiResponse = useFetch(
    dataRequest.measure,
    dataRequest.year
  );

  const { cookData } = useFormatdata(
    primaryResponse.dataResponse
  );

  const growthResponse: ApiResponse = useFetch(
    'Property+Value',
    dataRequest.years
  );

  const { growthData } = useGrowth(
    growthResponse.dataResponse
  );

  useEffect( () => {

    if( cookData ){
      //console.log(cookData)
      //setPrimaryData(cookData);
    }

    if( growthResponse.dataResponse ){
      //console.log(primaryData)
      //console.log(growthResponse.dataResponse);
    }

    if( growthData ){
      //console.log(growthData);
    }

   }, [cookData, primaryData, growthResponse, growthData])

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        { cookData && cookData.map( ( el, index ) => {
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