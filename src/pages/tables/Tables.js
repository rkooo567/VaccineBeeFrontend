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
import {Icon} from 'semantic-ui-react';

import Widget from '../../components/Widget';
import s from './Static.scss';

const demandingQuestionsDeserializer = require('./deserializer').demandingQuestionsDeserializer;
const getArticlesAnsweringQuestionDeserializer = require('./deserializer').getArticlesAnsweringQuestionDeserializer;

class Tables extends Component {

  // Properties
  apiBaseUrl = `https://oshaw-vacspider-backend.herokuapp.com`;

  demandingQuestionsConfig = {
    getTrendingQuestions: {
      path: `api/getTrendingQuestions`,
      method: "GET"
    }
  };

  searchResultConfig = {
    search: {
      path: `api/searchArticlesThroughText`,
      method: "GET"
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      demandingQuestionsTable: [],
      searchResultTable: [],
      tableStyles: [],
      selected: 0,
      question: "",
    };
  }

  componentDidMount() {
    // Call demanding questions api here
    const demandQuestionsOption = {
      method: this.demandingQuestionsConfig.getTrendingQuestions.method,
    }
    const demandingQuestionsUrl = `${this.apiBaseUrl}/${this.demandingQuestionsConfig.getTrendingQuestions.path}`;

    fetch(demandingQuestionsUrl, demandQuestionsOption)
      .then(data => {
        console.log(data);
        return data.json()
      })
      .then(data => {
        this.setState({tableStyles: demandingQuestionsDeserializer(data)});
      })
      .catch(error => {
        console.error(error);
      });
  }

  onClickHandler(row) {
    // Call test result api here
    const searchResultOption = {
      method: this.searchResultConfig.search.method,
    };
    const searchResultUrl = `${this.apiBaseUrl}/${this.searchResultConfig.search.path}?query=${row.description}`;

    fetch(searchResultUrl, searchResultOption)
    .then(data => data.json())
    .then(data => {
      console.log(data[0]);
      this.setState({
        searchResultTable: getArticlesAnsweringQuestionDeserializer(data),
      });
    })
    .catch(error => {
      console.error(error);
    })

    this.setState({
      selected: row.id,
      question: row.description
    });
  }

  onClickGoBackHandler() {
    this.setState({
      selected: 0,
      searchResultTable: [],
    });
  }

  onClickUpvoteHander(rowId) {
    this.state.searchResultTable[rowId].upvotes += 1;
    this.setState({
      searchResultTable: this.state.searchResultTable
    })
  }

  render() {
    if (this.state.selected == 0) {
      return (
        <div>
          <Breadcrumb>
            <BreadcrumbItem>Answer questions</BreadcrumbItem>
            <BreadcrumbItem active>Questions</BreadcrumbItem>
          </Breadcrumb>
          <h1 className="page-title mb-lg">Demanding questions<span className="fw-semi-bold" /></h1>
          <Row>
            <Col sm={12}>
              <Widget
                title={<h5>
                  Questions <span className="fw-semi-bold" />
                </h5>} settings close
              >
                <Table borderless className={s.mainTable}>
                  <thead>
                    <tr>
                      <th className="hidden-sm-down">Rank</th>
                      <th>Question</th>
                      <th className="hidden-sm-down">Number of people</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.tableStyles.map(row =>
                        <tr key={row.id} onClick={() => this.onClickHandler(row)}>
                          <td>{row.id}</td>
                          <td>
                            {row.description}
                            {row.label &&
                            <div>
                              <Badge color={row.label.colorClass}>{row.label.text}</Badge>
                            </div>
                            }
                          </td>
                          <td className="text-semi-muted">
                            {row.demand}
                          </td>
                          <td>
                            {row.urgentMark ? <Button color="danger">URGENT!</Button> :<div />}
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
                <div className="clearfix">
                  <div className="float-right" />
                  <p>Answer questions for patients and get paid!</p>
                </div>
              </Widget>
            </Col>
          </Row>
        </div>
      );
    } 
      return (
        <Row>
          <Col sm={12}>
            <Widget
              title={<h5>
                Result <span className="fw-semi-bold">List</span>
              </h5>} settings close
             >
             {this.state.question}
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">upvotes</th>
                    <th>snippets</th>    
                    <th>link</th>
                  </tr>        
                </thead>
                  <tbody>
                      {
                        this.state.searchResultTable.map(row =>
                          <tr key={row.id}>
                            <td>
                            <Button color="warning" onClick={() => this.onClickUpvoteHander(row.id - 1)}>{row.upvotes}</Button>
                            </td>
                            <td className="text-semi-muted">
                              {row.snippet}
                            </td>
                            <td>
                              <a href={row.link}>Learn more</a>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>                
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="danger" className="mr-xs" size="sm" onClick={() => {this.onClickGoBackHandler()}}>Go back</Button>
                </div>
              </div>
            </Widget>
          </Col>
        </Row> 
      );
    
  }
}
  
export default withStyles(s)(Tables);
