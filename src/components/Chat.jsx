import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './Channels';
import ActiveChannel from './ActiveChannel';
import Notifications from './Notifications';
import Modals from './Modals';

export default () => (
  <Container className="h-100 d-flex flex-column overflow-hidden pb-3">
    <Row className="h-100">
      <Col xs={4} className="h-100 border-right">
        <Channels />
      </Col>
      <Col className="h-100">
        <ActiveChannel />
      </Col>
    </Row>
    <Notifications />
    <Modals />
  </Container>
);
