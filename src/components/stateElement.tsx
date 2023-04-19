import { useState, useEffect } from 'react';

/* Bootstrap */
import { Container, Row, Col } from 'react-bootstrap'

export const StateElement = ( { stat } : any ) => {

  const [ display, setDisplay] = useState({
    figure: 0
  });

  useEffect(() => { 
    if(stat){

      const { 
        Population, 
        Household, 
        PropertyValue } = stat;

      setDisplay({
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
              <h2>{stat.State}</h2>
            </div>
          </Col>
        </Row>
        <Row xs={2}>
          <Col>
            <p>{stat.growth100.toFixed(2)}% Growth</p>
          </Col>
          <Col className='stateFigure'>
            <h3>${display.figure.toLocaleString('en-US')}</h3>
          </Col>
        </Row>
      </Container>
    </Col>
  )
}
