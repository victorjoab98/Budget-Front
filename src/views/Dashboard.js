import React from "react";
import ChartistGraph from "react-chartist";
import NotificationAlert from "react-notification-alert";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useAppSelector } from "hooks/reduxHooks";
import { AccountList } from "components/Accounts/AccountList";
import { LastRecordList } from "components/Records/RecordList";
import { useAppDispatch } from "hooks/reduxHooks";
import { setShowWelcome } from "store/userAccount";

function Dashboard(  ) {

  const notificationAlertRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const accounts = useAppSelector( state => state.user.accounts );
  const user = useAppSelector( state => state.user.user );
  const showWelcome = useAppSelector( state => state.user.showWelcome );
  const recordsPercentages = useAppSelector( state => state.user.recordsPercentages );


  React.useEffect( () => {
    if( showWelcome ){
      const message = user.isNewUser ?
        'Welcome to Budget-Wallet. We have created your Cash account with your preferred currency. Add your accounts and records now!' 
        : 'Welcome back to Budget-Wallet.';
      notify(message);
      dispatch( setShowWelcome(false) );
    }
  }, [] );

  const notify = ( message ) => {
    const type = "primary";
    const options = {
      place: 'tc',
      message: (
        <div>
          <div>
            { message }
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 10,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Your Accounts</Card.Title>
                { user.isNewUser && 'Hola'}
                <p className="card-category">List of accounts</p>
              </Card.Header>
              <Card.Body>
                <AccountList accounts={accounts}/>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                </div>
                <hr></hr>
                <div className="stats">
                  You can add more accounts.
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Your Records Activity</Card.Title>
                <p className="card-category">Last 30 days</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  
                  <ChartistGraph
                    data={{
                      labels: Object.values(recordsPercentages).map( (v) => v === 'NaN' ? '0%' : `${v}%` ),
                      series: Object.values(recordsPercentages).map( (v) => v === 'NaN' ? 0 : v ),
                    }}
                    type="Pie"
                  />
                  
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  { Object.keys(recordsPercentages)[0] } <i className="fas fa-circle text-danger"></i>
                  { Object.keys(recordsPercentages)[1] } <i className="fas fa-circle text-warning"></i>
                  { Object.keys(recordsPercentages)[2] }
                </div>
                <hr></hr>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
          <LastRecordList/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
