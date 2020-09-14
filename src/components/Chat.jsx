import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './Channels';
import Messages from './Messages';
import Notifications from './Notifications';

export default () => (
  <Container className="h-100 d-flex flex-column overflow-hidden pb-3">
    <Row className="flex-grow-1">
      <Col xs={3} className="pr-3 border-right">
        <Channels />
      </Col>
      <Col className="h-100">
        <Messages />
      </Col>
    </Row>
    <Notifications />
  </Container>
);
