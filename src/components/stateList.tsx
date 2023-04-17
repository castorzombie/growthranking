
/* Libraries */
import React, { useEffect } from 'react';

/* Hooks */
import { useFetch } from '../hooks/useFetch';
import { useFormatdata } from '../hooks/useFormatData';
import { useGrowth } from '../hooks/useGrowth';
import { useDisplayData } from '../hooks/useDisplayData';

/* types */
import { stateListProps, ApiResponse } from '../types/types';

/* Components */
import { StateElement } from './stateElement';

/* Bootstrap */
import { Container, Row } from 'react-bootstrap'


const StateList = ({children, dataRequest}: stateListProps) => {

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

  const { displayData } = useDisplayData(
    cookData,
    growyList
  );

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