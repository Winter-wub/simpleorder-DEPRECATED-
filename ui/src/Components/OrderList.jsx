import { Container, Table, Col, Button, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import * as FontAwesome from 'react-icons/lib/fa';
import * as io from 'react-icons/lib/io';
import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tippy/dist/tippy.css';

import { url } from '../config';
import CreateOrder from './CreateOrder';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderList: [],
      listOrder: [],
      modalListOrder: false,
    };
    this.LoadOrderList = this.LoadOrderList.bind(this);
    this.reloadOrderlist = this.reloadOrderlist.bind(this);
    this.toggleModalListOrder = this.toggleModalListOrder.bind(this);
  }
  componentDidMount() {
    this.LoadOrderList();
  }
  reloadOrderlist(data) {
    this.setState({
      OrderList: data,
    });
  }
  async LoadOrderList() {
    const response = await axios.get(url);
    const orderList = this.state.OrderList;

    if (
      response.data.length > 0 &&
      orderList.length !== response.data.length
    ) {
      this.setState({
        OrderList: response.data,
      });
    }
  }

  toggleModalListOrder(MenuList) {
    this.setState({
      modalListOrder: !this.state.modalListOrder,
      listOrder: MenuList,
    });
  }

  render() {
    const checkOrder = () => {
      if (!this.state.listOrder) {
        return undefined;
      }
      return (
        <ModalBody>
          {
            <Table>
              <tbody>
                {
                    !this.state.listOrder.length > 0 ? '' : this.state.listOrder.map(list => (
                      <tr>
                        <th>{list.DishName}</th>
                        <th>
                          <Table size="sm">
                            <thead>
                              <tr>
                                <th>ชื่อ</th>
                                <th>จำนวน</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                           !list.List.length > 0 ? '' : list.List.map(s => (
                             <tr>
                               <th>{s.Name}</th>
                               <th>{s.unit}</th>
                             </tr>
                           ))
                         }
                            </tbody>
                          </Table>
                        </th>
                      </tr>
                  ))
                }
              </tbody>
            </Table>

          }
        </ModalBody>
      );
    };

    const ListOrder = () => (
      <Modal isOpen={this.state.modalListOrder} toggle={this.toggleModalListOrder}>
        <ModalHeader toggle={this.toggleModalListOrder} />
        {checkOrder()}
        <ModalFooter />
      </Modal>
    );

    return (
      <Container>
        <Row style={{ paddingTop: '60px' }}>
          <CreateOrder reloadOrderList={this.LoadOrderList} />
        </Row>
        <Button
          style={{
            position: 'fixed',
            bottom: '2%',
            right: '10px',
          }}
          color="warning"
          onClick={() => this.LoadOrderList()}
        >
          <FontAwesome.FaRefresh style={{ marginRight: '5%' }} />
        </Button>

        <Row>
          {ListOrder()}
          <Col>
            <br />
            <Table striped responsive>
              <thead>
                <tr>
                  <th />
                  <th><FontAwesome.FaList /> Action</th>
                  <th><io.IoAndroidCart />Name</th>
                  <th><io.IoIosTimer />Close time</th>
                  <th><FontAwesome.FaExternalLink /> Link</th>
                  <th><FontAwesome.FaUser /> Owner</th>
                  <th><io.IoStatsBars /> Status</th>
                </tr>
              </thead>
              <tbody>
                {

            this.state.OrderList.map(List => (
              <tr key={List.OrderId}>
                <th>{List.OrderId}</th>
                <th>
                  { List.Status === 'Pending' ? <Tooltip position="right" title={`สร้างเมื่อ${moment(List.CreateDate).format('LTS')}`} trigger="mouseenter"><Link to={`/order/${List.OrderId}`}><Button color="success">สั่งอาหาร</Button></Link></Tooltip> : <Button onClick={() => this.toggleModalListOrder(List.MenuList)}>ดูยอดคนสั่ง</Button>}
                </th>
                <th>{List.RestaurantName}</th>
                <td>{List.CloseDate}</td>
                <th>
                  <a href={List.RestaurantUrl} target="_blank" rel="noopener noreferrer">
                    <FontAwesome.FaExternalLinkSquare /> ลิงค์
                  </a>
                </th>
                <td>{List.Creator}</td>
                {
                  List.Status === 'Pending'
                  ?
                  (<th style={{ color: 'green' }}>เปิดอยู่</th>)
                  :
                  (<th style={{ color: 'red' }}>ปิดแล้ว</th>)
                }
              </tr>
            ))
              }

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrderList;
