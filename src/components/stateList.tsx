
/* Libraries */
import React from 'react';

/* Hooks */
import { useFetch } from '../hooks/useFetch';
import { useCookdata } from '../hooks/useCookdata';

/* types */
import { stateListProps, ApiResponse } from '../types/types';

/* Components */
import { StateElement } from './stateElement';

/* Bootstrap */
import { Container, Row } from 'react-bootstrap'


const StateList = ({children, dataRequest}: stateListProps) => {

  const res: ApiResponse = useFetch(
    dataRequest.measure,
    dataRequest.years
  );
  
  const { cookData } = useCookdata(res.dataResponse);

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