import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './Channels';
import Messages from './Messages';

export default () => (
  <Container className="h-100 overflow-hidden pb-3">
    <Row className="h-100">
      <Col sm={3} className="h-100 pr-3 border-right ">
        <Channels />
      </Col>
      <Col className="h-100">
        <Messages />
      </Col>
    </Row>
  </Container>
);
