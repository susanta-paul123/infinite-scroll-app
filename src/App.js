import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Row, Col, Container } from 'reactstrap';
import GetData from './getdata'


function App() {

  const [data, setData] = useState([]);
  let [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false);


  const handelScroll=(event)=>{

    const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
    
    console.log("scrollTop", scrollTop)
    console.log("clientHeight", clientHeight)
    console.log("scrollHeight", scrollHeight)

    if(scrollHeight - scrollTop ===clientHeight){
        setPage(prev => prev+1)
    }

}



  useEffect(() =>{
  const loadUser = async() =>{
    setLoader(true)
    const newUser = await GetData(page)
    setData((prev)=>[...prev, ...newUser])
    setLoader(false)

  }
  loadUser()

  },[page])




  console.log(data)

  return (
    <div className="App" onScroll={handelScroll}>
        <Container className="py-5">
        <Row>
          <Col sm="12">
            <h2 className="mb-4 font-weight-bold text-secondary">Infinite Scroll</h2>
          </Col>
        </Row>
         <Row>
            {data.map((udata, i) => 
                    
                    (
                        <Col md={6} lg={4} key={i} style={{marginBottom:"30px"}}>  
                            <div className="box overflow-hidden">
                              <div className="figure overflow-hidden">
                                <img src={require('./assets/winters.jpg')} alt="" className="img-fluid"/>
                              </div>
                              <div className="p-3">
                              <h5 className="font-weight-bold">{udata.name.first} {udata.name.last}</h5>
                              <p className="text text-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0 price"><i class="fa fa-inr" aria-hidden="true"></i> 100</p>
                                <button className="btn btn-primary-outline p-0 wish"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                              </div>
                              </div>
                             
                            </div> 
                        </Col>
                    )
                )}
            
          </Row>
          {loader && <div className="loader py-5">
            <div className="spinner-border text-success " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div> }
        </Container>
        
    </div>
  );
}

export default App;
