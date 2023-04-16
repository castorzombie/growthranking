import { useState, useEffect } from 'react';

/* Bootstrap */
import { Container, Row, Col } from 'react-bootstrap'

export const StateElement = ( { stat } : any ) => {

  const [ display, setDisplay] = useState({
    name: "",
    growth: 0,
    figure: 0
  });

  useEffect(() => { 
    if(stat){

      const { 
        State, 
        Population, 
        Household, 
        PropertyValue, 
        growth100 } = stat;

      setDisplay({
        name: State,
        growth: growth100,
        figure: Population ? Population : Household ? Household : PropertyValue ? PropertyValue : 0
      })

    } 
  }, [stat])

  return (
    <Col>
      <Container className='stateElement'>
        <Row>
          <Col >
            <div className='stateName'>
              <h2>{display.name}</h2>
            </div>
          </Col>
        </Row>
        <Row xs={2}>
          <Col>
            <p>{display.growth}% Growth</p>
          </Col>
          <Col className='stateFigure'>
            <h3>${display.figure}</h3>
          </Col>
        </Row>
      </Container>
    </Col>
  )
}
