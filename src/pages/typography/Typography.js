import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Table,
  Button,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import Widget from '../../components/Widget';
import s from './Static.scss';

class Typography extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 1,
          name: "Dmitry",
          timestamp: "July 16th, 2018",
          bookingStatus: true,
        },
        {
          id: 2,
          name: "Sang",
          timestamp: "August 12, 2018",
          bookingStatus: true,
        },
        {
          id: 3,
          name: "Oscar",
          timestamp: "September 20, 2018",
          bookingStatus: true,
        },
        {
          id: 4,
          name: "Farn-Yu",
          timestamp: "Undecided",
          bookingStatus: false,
        },
        {
          id: 5,
          name: "Ramie",
          timestamp: "August 1, 2018",
          bookingStatus: true,
        },
        {
          id: 6,
          name: "Ashwin",
          timestamp: "October 30, 2018",
          bookingStatus: true,
        },
        {
          id: 7,
          name: "John",
          timestamp: "Undecided",
          bookingStatus: false,
        },
        {
          id: 8,
          name: "Bieber",
          timestamp: "Undecided",
          bookingStatus: false,
        },
        {
          id: 9,
          name: "Griezman",
          timestamp: "Undecided",
          bookingStatus: false,
        },
        {
          id: 10,
          name: "Gary",
          timestamp: "Undecided",
          bookingStatus: false,
        },
      ],
    };
  }

  componentDidMount() {
    // Call demanding questions api here
  }

  render() {
      return (
        <div>
          <Breadcrumb>
            <BreadcrumbItem>patients</BreadcrumbItem>
            <BreadcrumbItem active>appointments</BreadcrumbItem>
          </Breadcrumb>
          <h1 className="page-title mb-lg">Patient appointments<span className="fw-semi-bold" /></h1>
          <Row>
            <Col sm={12}>
              <Widget
                title={<h5>
                  appointments <span className="fw-semi-bold" />
                </h5>} settings close
              >
                <Table borderless className={s.mainTable}>
                  <thead>
                    <tr>
                      <th className="hidden-sm-down">#</th>
                      <th className="hidden-sm-down">Status</th>
                      <th>Name</th>
                      <th>Appointment time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.tableStyles.map(row =>
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>
                            {row.bookingStatus ? 
                              <Badge color="success">booked</Badge> 
                              : <Badge color="warning">Undecided</Badge>
                            }
                          </td>
                          <td>
                            {row.name}
                          </td>
                          <td className="text-semi-muted">
                            {row.timestamp}
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
                <div className="clearfix">
                  <div className="float-right">
                    <Button size="sm">Next</Button>
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
        </div>
      );
  } 
}
  
export default withStyles(s)(Typography);

