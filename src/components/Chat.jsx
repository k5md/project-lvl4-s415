import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './Channels';

export default () => (
  <Container className="h-100 overflow-hidden pb-3">
    <Row className="h-100">
      <Col sm={3} className="h-100">
        <div className="border-right h-100 pr-3">
          <Channels />
        </div>
      </Col>
    </Row>
  </Container>
);
