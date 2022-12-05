import { useAppSelector } from "hooks/reduxHooks";
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function User() {

  const user = useAppSelector( state => state.user.user );
  return (
    <>
      <Container fluid>
        <Row style={{ justifyContent: 'center'}}>
          <Col md="6">
            <Card>
              <Card.Body className="my-4 text-center">
                <h6 className="mb-3">{ user.name}</h6>
                <p>
                  { user.email } <br></br>
                  { user.username }
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
