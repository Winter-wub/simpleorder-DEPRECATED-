import { Jumbotron, FormGroup, Col, Label, Input, Row, Button, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, Table, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import Creatable from 'react-select/lib/Creatable';
import EditOrder from './EditOrder';

import './styles/OrderDetail.css';
import { url } from '../config';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      DishName: '',
      Name: '',
      unit: 1,
      modal: false,
      model2: false,
      listorder: 0,
      RestaurantName: '',
      RestaurantUrl: '',
      Creator: '',
    };

    this.GetOrderDetail = this.GetOrderDetail.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.addDish = this.addDish.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.GetOrderDetail();
  }
  async editOrder() {
    const { match } = this.props;
    await axios.patch(url, {
      RestaurantName: this.state.RestaurantName,
      RestaurantUrl: this.state.RestaurantUrl,
      OrderId: parseInt(match.params.id, 10),
    });
    // alert('แก้ไขเสร็จสมบูรณ์');
  }
  async finishOrder() {
    const { match, history } = this.props;
    const post = {
      OrderId: match.params.id,
    };
    await axios.post(`${url}finish/`, post);
    history.push('/');
  }
  async cancelOrder() {
    const { history, match } = this.props;
    const url1 = `http://localhost:3001/api/order/delete/${match.params.id}`;
    // console.log(typeof parseInt(this.props.match.params.id))
    await axios.delete(url1);
    history.push('/');
  }
  async addDish() {
    const { match } = this.props;
    const url2 = url + match.params.id;
    await axios.post(url2, {
      Name: this.state.Name,
      DishName: this.state.DishName,
      unit: this.state.unit,
    });
    // console.log(result);
    this.GetOrderDetail();
    // alert('เพิ่มรายการแล้ว');
  }
  async cancelUserDish(Name, index, DishName) {
    const { match } = this.props;
    const deleteData = {
      Name,
      DishName,
    };
    // console.log(this.state.listorder.List);
    const url2 = `${url}dishdel/${match.params.id}`;
    await axios.post(url2, deleteData);
    const renewListorder = this.state.listorder.List.slice(0, index)
      .concat(this.state.listorder.List.slice(index + 1));
    const currentListorder = this.state.listorder;
    currentListorder.List = renewListorder;
    this.setState({
      listorder: currentListorder,
    });
  }
  toggle2(list) {
    this.setState({
      model2: !this.state.model2,
      listorder: list,
    });
    // console.log(list)
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChange(newValue) {
    if (newValue != null) {
      // console.log(newValue.value);
      this.setState({
        DishName: newValue.value,
      });
    }
    // console.log(`state ${this.state.DishName}`);
  }

  handleEvent(event) {
    const input = {
      [event.target.name]: event.target.value,
    };
    this.setState(input);
    if (event.target.name === 'DishName' && event.target.value === '-') {
      this.setState({
        DishName: '',
      });
    }
  }
  async GetOrderDetail() {
    const { match } = this.props;
    const ResonseData = await axios(url + match.params.id);
    this.setState({
      order: ResonseData.data[0],
      Creator: ResonseData.data[0].Creator,
      RestaurantName: ResonseData.data[0].RestaurantName,
      RestaurantUrl: ResonseData.data[0].RestaurantUrl,
    });
  }
  render() {
    const { match } = this.props;

    const currentDishlist = () => {
      const menuList = this.state.order.MenuList;

      //  console.log(menuList)
      if (menuList) {
        const option = menuList.map(List => (
          { value: List.DishName, label: List.DishName }
        ));
        return (
          <Creatable
            Name="DishName"
            isClearable
            onChange={this.handleChange}
            options={option}
            placeholder="เลือกเมนู หรือเขียนสักอย่าง ??"
          />

        );
      }
      return (
        <Label />
      );
    };

    const DishList = () => {
      if (this.state.order.MenuList) {
        // console.log(this.state.order.MenuList[0].List)
        return (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>ชื่อ</th>
                  <th>คนสั่ง</th>
                </tr>
              </thead>
              <tbody>
                {
                this.state.order.MenuList.map(dish => (
                  <tr key={dish.DishName}>
                    <th>{dish.DishName}</th>
                    <th>
                      <Button onClick={() => this.toggle2(dish)}>
                        ดูคนสั่ง
                      </Button>
                    </th>
                  </tr>
                 ))
                }
              </tbody>
            </Table>
          </div>);
      }
      return (
        <Label />
      );
    };

    const modalList = () => {
      if (this.state.listorder.List !== undefined && this.state.listorder.List.length > 0) {
        return (
          <Modal isOpen={this.state.model2} toggle={this.toggle2} >
            <ModalHeader toggle={this.toggle2} > {this.state.listorder.DishName} </ModalHeader>
            <ModalBody>
              <Table>
                <tbody>
                  {this.state.listorder.List.map((data, index) => (
                    <tr key={data.Name}>
                      <th>{data.Name}</th>
                      <th>{data.unit}</th>
                      <th><Button color="danger" onClick={() => this.cancelUserDish(data.Name, index, this.state.listorder.DishName)}>ลบ</Button></th>
                    </tr>
                ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter />
          </Modal>
        );
      }
      return (
        <Modal isOpen={this.state.model2} toggle={this.toggle2} >
          <ModalHeader toggle={this.toggle2} />
          <ModalBody>ดูเหมือนทุกคนเปลี่ยนใจหมดมั้งน่ะ</ModalBody>
          <ModalFooter />
        </Modal>
      );
    };
    return (
      <div>
        <div>
          {modalList()}
          <Link to="/"><Button className="Back-Btn" color="danger"><FontAwesome.FaArrowCircleOLeft />Back</Button></Link>

          <Jumbotron >
            <Row>
              <Col xs="6">
                <FormGroup row>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">เมนู</InputGroupAddon>
                    <div style={{ width: '60%' }}>{currentDishlist()}</div>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">ชื่อคนสั่ง</InputGroupAddon>
                    <Input type="text" name="Name" value={this.state.Name} onChange={this.handleEvent} />
                    <div style={{ marginLeft: '200px' }} />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">จำนวน</InputGroupAddon>
                    <Input type="number" name="unit" min="1" max="50" value={this.state.unit} onChange={this.handleEvent} />
                    <div style={{ marginLeft: '200px' }} />
                  </InputGroup>
                </FormGroup>
                <Button color="success" onClick={() => this.addDish()}>เพิ่มรายการ</Button>
              </Col>
              <Col xs="6">
                <Label>รายละเอียด Order</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">ร้าน</InputGroupAddon>
                  <Input name="RestaurantName" type="text" value={this.state.RestaurantName} onChange={this.handleEvent} />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Link</InputGroupAddon>
                  <Input name="RestaurantUrl" type="text" value={this.state.RestaurantUrl} onChange={this.handleEvent} />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Order Creator</InputGroupAddon>
                  <Input name="Creator" type="text" value={this.state.Creator} disable="true" />
                </InputGroup>
                <InputGroup>
                  <Button color="danger" style={{ margin: '2%' }} onClick={() => this.cancelOrder()}>ยกเลิก Order</Button>
                  <EditOrder
                    Name={this.state.RestaurantName}
                    Url={this.state.RestaurantUrl}
                    Handle={this.handleEvent}
                    id={match.params.id}
                  />
                  <Button color="success" style={{ margin: '2%' }} onClick={() => this.finishOrder()}>ปิด Order</Button>
                </InputGroup>
              </Col>
            </Row>

          </Jumbotron>
          <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>{DishList()}</div>
        </div>
      </div>
    );
  }
}

OrderDetail.proptype = {
  match: PropTypes.required,
};

export default OrderDetail;
