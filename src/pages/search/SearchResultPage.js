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

class SearchResultPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Row>
          <Col sm={12}>
            <Widget
              title={<h5>
                Result <span className="fw-semi-bold">List</span>
              </h5>} settings close
             >
              <Table borderless className={s.mainTable}>
                <thead>
                  <h1>Questions : {this.state.question}</h1>
                </thead>
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="danger" className="mr-xs" size="sm" onClick={() => {this.onClickGoBackHandler()}}>Go back</Button>
                </div>
                  <p>Answer questions for patients and get paid!</p>
              </div>
            </Widget>
          </Col>
        </Row> 
      );
    
  }
}
  
export default withStyles(s)(SearchResultPage);