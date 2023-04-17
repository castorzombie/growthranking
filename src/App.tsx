/* Libraries */
import React,{ useState } from 'react';

/* Types */
import { DataRequest, Selected } from './types/types';

/* Components */
import StateList from './components/stateList';

/* Bootstrap */
import { Col, Container, Form, Nav, Row } from 'react-bootstrap'

/* Styles */
import './App.scss'


const App:React.FC = () => {

    const [dataRequest, setDataRequest] = useState<DataRequest>({
        year: 2019,
        years:"2018,2019", 
        measure:"Household+Income",
        growth: 1
    });

    const updateData = (selected: Selected, value: string | number) => {
        setDataRequest( prevState => ({
            ...prevState,
            [selected]: value
        }));
    };
      
    const handleChange = ( event: React.ChangeEvent<HTMLSelectElement>, selected: Selected ) => {
        
        let { value } = event.target;
        let update : string | number = value;

        if(selected === Selected.year || selected === Selected.growth) {
            let val: number = + value;
            update = val;
            yearListCalc(selected, val);
        }

        updateData(selected, update);

    };

    const yearListCalc = (selected: Selected, update: number) => { 

        let min: number = 2018; 
        let max: number = 2019;
        let concatYears: string = "2018,2019";

        switch(selected){
            case Selected.year:
                min = update - dataRequest.growth;
                max = update;
                break;
            case Selected.growth:
                min = dataRequest.year - update;
                max = dataRequest.year;
                break;
        }

        concatYears = [min, max].join();
        updateData(Selected.years, concatYears);

    };
 
    return (
        <div className='app'>
            <div className='formPanel'>
                <Container className='p-3'>
                    <Nav>
                        <Nav.Item className='logo'>
                            <img src='/images/lative-logo.svg' alt='Lative Software' />
                        </Nav.Item>
                    </Nav>
                    <h1 className='header'>Growth Ranking of U.S. States</h1>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control as='select' 
                                        onChange={ event => handleChange(event as React.ChangeEvent<any>, Selected.year) }>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Measure</Form.Label>
                                    <Form.Control as='select' 
                                        onChange={ event => handleChange(event as React.ChangeEvent<any>, Selected.measure) }>
                                            <option value="Household+Income">Household Income</option>
                                            <option value="Population">Population</option>
                                            <option value="Property+Value">Property Value</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Growth Period</Form.Label>
                                    <Form.Control as='select' 
                                        onChange={ event => handleChange(event as React.ChangeEvent<any>, Selected.growth) }>
                                            <option value="1">1 Year</option>
                                            <option value="2">2 Years</option>
                                            <option value="3">3 Years</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <div className='results'>
                <Container>
                    <StateList dataRequest={dataRequest}> <p>hello</p></StateList>
                </Container>
            </div>
        </div>
    )
}

export default App
