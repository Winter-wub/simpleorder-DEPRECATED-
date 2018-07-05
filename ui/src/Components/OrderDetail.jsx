import {
  Container,
  Col,
  Label,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Badge,
  Input,
} from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import axios from 'axios';
import Creatable from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import alertify from 'alertify.js';

import AddDish from './AddDish';

//  import EditOrder from './EditOrder';

import './styles/OrderDetail.css';
import { url, urlDelete, urlSetcost } from '../config';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      DishName: '',
      Name: '',
      unit: 1,
      modal: false,
      modal2: false,
      modal3: false,
      listorder: 0,
      RestaurantName: '',
      RestaurantUrl: '',
      Creator: '',
      modalDish: false,
      cost: 0,
      showSetcost : false,
      Status : '',
    };

    this.GetOrderDetail = this.GetOrderDetail.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.addDish = this.addDish.bind(this);
    this.addDish2 = this.addDish2.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleModaladdDish = this.toggleModaladdDish.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleunit = this.handleunit.bind(this);
    this.handleCost = this.handleCost.bind(this);
  }
  
  componentDidMount() {
    this.GetOrderDetail();
  }
  toggleModaladdDish() {
    this.setState({
      modalDish: !this.state.modalDish,
    });
  }
  async editOrder() {
    const { match } = this.props;
    await axios.patch(url, {
      RestaurantName: this.state.RestaurantName,
      RestaurantUrl: this.state.RestaurantUrl,
      OrderId: parseInt(match.params.id, 10),
    });
  }
  finishOrder() {
    const { match, history } = this.props;

    const post = {
      OrderId: match.params.id,
    };

    alertify.confirm('ยืนยันการปิด Order นี้', async () => {
      await axios.post(`${url}finish/`, post);
      history.push('/');
    }, () => {
    });
  }
  async cancelOrder() {
    const { history, match } = this.props;
    const url1 = `${urlDelete}/${match.params.id}`;

    await axios.delete(url1);
    history.push('/');
  }

  async addDish2() {
    const { match } = this.props;
    const url2 = url + match.params.id;
    
    await this.GetOrderDetail();
    if(this.state.Status === 'Ordered'){
      const {history} = this.props;
      // alertify.alert('Order ปิดแล้ว');
      history.push('/');
    }
   
    await axios.post(url2, {
      Name: this.state.Name,
      DishName: this.state.DishName,
      unit: this.state.unit,
      cost: this.state.cost,
    });
    this.setState({
      Name: '',
      unit: 1,  
    });
    if (this.state.cost !== 0) {
      await axios.post(urlSetcost + match.params.id, { DishName: this.state.DishName, Cost: this.state.cost });
    }
    this.setState({
      cost: 0,
      showSetcost : false,
    });
    await this.toggle3();
    this.GetOrderDetail();
  }

  async addDish() {
    const { match } = this.props;
    const url2 = url + match.params.id;
    this.toggleModaladdDish();
    await this.GetOrderDetail();
    if(this.state.Status === 'Ordered'){
      const {history} = this.props;
      // alertify.alert('Order ปิดแล้ว')
      history.push('/');
    }
    await axios.post(url2, {
      Name: this.state.Name,
      DishName: this.state.DishName,
      unit: this.state.unit,
      cost: this.state.cost,
    });
    this.setState({
      Name: '',
      unit: 1,
    });
    if (this.state.cost !== 0) {
      await axios.post(urlSetcost + match.params.id, { DishName: this.state.DishName, Cost: this.state.cost });
    }
    this.setState({
      cost: 0,
      showSetcost : false,
    });
    await this.GetOrderDetail();
  }
  cancelUserDish(Name, index, DishName) {
    const { match } = this.props;
    const deleteData = {
      Name,
      DishName,
    };
    this.setState({ modal2: false });
    alertify.confirm('ยืนยันการลบ', async () => {
      const url2 = `${url}dishdel/${match.params.id}`;
      await axios.post(url2, deleteData);
      const renewListorder = this.state.listorder.List.slice(0, index)
        .concat(this.state.listorder.List.slice(index + 1));
      const currentListorder = this.state.listorder;
      currentListorder.List = renewListorder;
      this.setState({ listorder: currentListorder });
    });
  }
  toggle2(list) {
    this.setState({
      modal2: !this.state.modal2,
      listorder: list,
    });
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  toggle3(DishName) {
    
    this.setState({ 
      modal3: !this.state.modal3, 
      DishName: DishName  });
   
  }

  handleChange(newValue) {
    if (newValue != null) {
      this.setState({
        DishName: newValue.value,
      });
    }
  }
  handleCost(e) {
    this.setState({
      cost: e.target.value,
    });
  }

  handleName(e) {
    this.setState({
      Name: e.target.value,
    });
  }
  handleunit(e) {
    this.setState({
      unit: e.target.value,
    });
  }

  async GetOrderDetail() {
    const { match } = this.props;
    const ResponseData = await axios(url + match.params.id);
    this.setState({
      order: ResponseData.data[0],
      Creator: ResponseData.data[0].Creator,
      RestaurantName: ResponseData.data[0].RestaurantName,
      RestaurantUrl: ResponseData.data[0].RestaurantUrl,
      Status: ResponseData.data[0].Status,
    });

    if(this.state.Status === 'Ordered'){
      const {history} = this.props;
      // alertify.alert('Order ปิดแล้ว')
      history.push('/');
    }
  }
  render() {
    const currentDishlist = () => {
      const menuList = this.state.order.MenuList;
      if (menuList) {
        const option = menuList.map(List => ({ value: List.DishName, label: List.DishName }));
        return (<Creatable Name="DishName" isClearable="isClearable" onChange={this.handleChange} options={option} placeholder="เลือกเมนู หรือ สร้างใหม่" />);
      }
      return (<Label />);
    };

    const DishList = () => {
      if (this.state.order.MenuList) {
        return (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>ชื่อเมนู</th>
                  <th>จำนวนคนสั่ง</th>
                  <th>ราคาเมนู</th>
                  <th>คนสั่ง</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {
                this.state.order.MenuList.length === 0 ?
                  <tr colSpan={3}><td>ยังไม่มีออเดอร์</td></tr>
                  :
                  this.state.order.MenuList.map(dish => (
                    <tr key={dish.DishName}>
                      <td>{dish.DishName}</td>
                      <td>{dish.List.length}</td>
                      <td>{dish.Cost}</td>
                      <td>
                        {
                            dish.List.length < 10 ?
                              dish.List.map((list) => {
                                if (list.unit > 1) {
                                  return (
                                    <Badge
                                      color="info"
                                      key={list}
                                      style={
                                        {
                                          marginRight: '6px',
                                          height: '30px',
                                          align: 'center',
                                          fontSize: '15px',
                                        }
                                      }
                                    >{list.Name}({list.unit})
                                    </Badge>);
                                }
                                  return (
                                    <Badge
                                      color="info"
                                      key={list}
                                      style={
                                        {
                                          marginRight: '6px',
                                          height: '30px',
                                          align: 'center',
                                          fontSize: '15px',
                                        }
                                      }
                                    >{list.Name}
                                    </Badge>
                                  );
                              })
                              :
                              <Button onClick={() => this.toggle2(dish)}>
                                ดูคนที่สั่งทั้งหมด
                              </Button>
                        }
                      </td>
                      <td>
                        <Button color="success" style={{marginRight : '10px'}} onClick={() => this.toggle3(dish.DishName)}><FontAwesome.FaPlus /></Button>
                        <Button color="warning" onClick={() => this.toggle2(dish)}>Edit</Button>
                      </td>
                    </tr>))
              }
              </tbody>
            </Table>
          </div>);
      }

      return (<Label />);
    };
    const modalList = () => {
      if (this.state.listorder.List !== undefined && this.state.listorder.List.length > 0) {
        return (
          <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
            <ModalHeader toggle={this.toggle2}>
              {this.state.listorder.DishName}
            </ModalHeader>
            <ModalBody>
              <Table>
                <tbody>
                  {
                  this.state.listorder.List.map((data, index) => (
                    <tr key={data.Name}>
                      <th>{data.Name}</th>
                      <th>{data.unit}</th>
                      <th>
                        <Button color="danger" onClick={() => this.cancelUserDish(data.Name, index, this.state.listorder.DishName)}>ลบ</Button>
                      </th>
                    </tr>))
                }
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter />
          </Modal>);
      }
      return (
        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
          <ModalHeader toggle={this.toggle2} />
          <ModalBody>ดูเหมือนทุกคนเปลี่ยนใจหมดมั้งน่ะ</ModalBody>
          <ModalFooter />
        </Modal>);
    };

    const PlusButton = () => {
      return (
        <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
       
          <ModalBody>
            <Label>ชื่อ</Label>
            <Input type='text' name="Name" maxLength="10" values={this.state.Name} onChange={this.handleName} />
            <Label>จำนวน</Label>
            <Input type='number' name="unit" min="1" max="50" value={this.state.unit} onChange={this.handleunit} />
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={() => this.addDish2()}>เพิ่ม</Button>
            <Button color="default" onClick={this.toggle3}>ยกเลิก</Button>
          </ModalFooter>
        </Modal>
      )
    }
    return (
      <div style={{ paddingTop: '55px' }}>
        <Container>
          <Row>
            <Col>
              <div style={{ textAlign: 'left' }}>
                <p><b>ชื่อร้าน:</b> {this.state.RestaurantName}</p>
                <p><b>ลิงค์:</b><a target="_blank" rel="noopener noreferrer" href={this.state.RestaurantUrl} style={{ paddingLeft: '8px' }}>{this.state.RestaurantUrl}</a></p>
                <p><b>คนสั่ง:</b> {this.state.Creator}</p>
                <CopyToClipboard text={window.location.href}>
                  <Button color="info">คัดลอก url หน้านี้</Button>
                </CopyToClipboard>
              </div>
            </Col>
          </Row>
        </Container>
        <br />
        <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
          { DishList()}
        </div>
        <div>
          {modalList()}
          <AddDish
            modalDish={this.state.modalDish}
            toggleModaladdDish={this.toggleModaladdDish}
            currentDishlist={currentDishlist}
            Name={this.state.Name}
            unit={this.state.unit}
            addDish={this.addDish}
            handleName={this.handleName}
            handleunit={this.handleunit}
            handleCost={this.handleCost}
            cost={this.state.Cost}
            show={this.state.showSetcost}
          />
          <Button
            color="success"
            style={{
               position: 'fixed',
               bottom: '2%',
               right: '10px',
               borderRadius: '25px',
               height: '100px',
               fontSize: '25px',
              }}
            onClick={() => this.toggleModaladdDish()}
          >
            <FontAwesome.FaPlus />
                  สั่งอาหาร
          </Button>
          <Button color="danger" style={{ width: '50%', marginTop: '25%' }} onClick={() => this.finishOrder()}><FontAwesome.FaClose />ปิด Order</Button>
        </div>
        {PlusButton()}
      </div>);
  }
}

OrderDetail.proptype = {
  match: PropTypes.required,
};

export default OrderDetail;
