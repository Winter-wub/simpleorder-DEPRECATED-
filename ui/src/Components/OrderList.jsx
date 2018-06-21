import { Link } from 'react-router-dom';
import { Table, Col, Button, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Tooltip } from 'react-tippy';
import axios from 'axios';
import React, { Component } from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import * as io from 'react-icons/lib/io';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tippy/dist/tippy.css';

import CreateOrder from './CreateOrder';
import { url } from '../config';

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
    // console.log(data);
    this.setState({
      OrderList: data,
    });
  }
  async LoadOrderList() {
    const response = await axios.get(url);
    this.setState({
      OrderList: response.data,
    });
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
      <Row>
        {ListOrder()}
        <Col>
          <CreateOrder reloadOrderList={this.LoadOrderList()} />
          <br />
          <Table striped responsive>
            <thead>
              <tr>
                <th />
                <th><io.IoAndroidCart /> Restaurant Name</th>
                <th><FontAwesome.FaExternalLink /> Restaurant Link</th>
                <th><FontAwesome.FaUser /> Owner</th>
                <th><FontAwesome.FaList /> Action</th>
                <th><io.IoStatsBars /> Status</th>
              </tr>
            </thead>
            <tbody>
              {
            this.state.OrderList.map(List => (
              <tr key={List.OrderId}>
                <th>{List.OrderId}</th>
                <th>{List.RestaurantName}</th>
                <th><a href={List.RestaurantUrl} target="_blank"><FontAwesome.FaExternalLinkSquare /> ลิงค์</a></th>
                <th>{List.Creator}</th>
                <th>
                  { List.Status === 'Pending' ? <Tooltip position="right" title={`สร้างเมื่อ${List.CreateDate}`} trigger="mouseenter"><Link to={`/order/${List.OrderId}`}><Button color="info">สั่ง</Button></Link></Tooltip> : <Button onClick={() => this.toggleModalListOrder(List.MenuList)}>ดูยอดคนสั่ง</Button>}
                </th>
                <th>{ List.Status === 'Pending' ? 'สั่งได้' : 'ปิดแล้ว' }</th>
              </tr>
              ))
              }

            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default OrderList;
