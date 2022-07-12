import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import airplane from './image/airplane.png'
import {Form,Button} from 'react-bootstrap'



  import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";

import { AuthContext } from "../App";


function Test() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri,client_secret } = state;

  useEffect(() => {
    
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    
    if (hasCode) {
      const Url = url.split("?code=");
      window.history.pushState({}, null, Url[0]);
      setData({ ...data, isLoading: true });
console.log(Url)
console.log('hye')

      const requestData = {
        code: Url[1],
        client_id:client_id,
        client_secret:client_secret,
        redirect_uri:redirect_uri

      };

      const proxy_url = state.proxy_url;

      
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true }
          });
        })
        .catch(error => {
          setData({
            isLoading: false,
            errorMessage: "Login failed due to bad authorization"
          });
        });
    }
  }, [state, dispatch, data]);
  console.log(client_id)
  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <>
  
      
      {/* </Row> */}
    <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{border:'2px solid'}}>
       
      <Row className="mt-5"
      // style=
      // {{marginTop:'20em'}}
       >
      
        <Col sm={3}>
            </Col>
        
        <Col sm={2}style={{ borderLeft: '2px solid whitesmoke',
    borderBottom:'2px solid whitesmoke',
    borderTop: '3px solid red' ,borderRight: '2px solid whitesmoke'}}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first" href="#" style={{backgroundColor:'#fff',color:'black',borderBottom:'2px solid lightgrey'}}>
              <Form.Check aria-label="radio 1" checked/>
                Email
                {/* </button> */}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" href="#"style={{backgroundColor:'#fff',color:'black',borderBottom:'2px solid lightgrey'}}>
              <Form.Check aria-label="radio 1"/>
                Mobile
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={3} style={{borderBottom:'2px solid whitesmoke',
    borderTop: '2px solid whitesmoke',borderRight:'2px solid whitesmoke'}}>
          <h4>Login</h4>
          {/* <Login/> */}
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter email" />
       
      </Form.Group>
      <Button style={{width: '100%',
    backgroundColor:'red'}} type="submit">
        LOGIN
      </Button>
      <br/>
      <br/>
      <a
                  className="login-link"
                  href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                  onClick={() => {
                    setData({ ...data, errorMessage: "" });
                  }}
                >
                  
                  <Button style={{width:'100%',backgroundColor:'#fff',color:'black'}}>Login with GitHub</Button>
                </a>
      </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              {/* <Sonnet /> */}
            </Tab.Pane>
          </Tab.Content>
        </Col>
        <Col sm={3}>
            <img src={airplane}className="img-fluid" 
            // style={{height: '275px',width: '250px'}}
/>
            </Col>
      </Row>
      
      {/* </div> */}
    </Tab.Container>
    
    </>
  );
}
export default Test