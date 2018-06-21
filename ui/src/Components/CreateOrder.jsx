import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import 'bootstrap/dist/css/bootstrap.css';

import ModalCreateOrder from './ModalCreateOrder';
import { url } from '../config';

class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      RestaurantName: '',
      RestaurantUrl: '-',
      Creator: '',
    };

    this.toggle = this.toggle.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    console.log('toggle');

    this.setState({
      modal: !this.state.modal,
    });
  }

  handleTyping(event) {
    const input = {
      [event.target.name]: event.target.value,
    };

    console.log('handleTyping');
    console.log('input', input);
    this.setState(input);
  }

  async handleSubmit() {
    this.toggle();
    const post = {
      RestaurantName: this.state.RestaurantName,
      RestaurantUrl: this.state.RestaurantUrl,
      Creator: this.state.Creator,
    };
    await axios.post(url, post);
    await this.props.reloadOrderList;
  }

  render() {
    console.log('render');
    console.log('modal status:', this.state.modal);

    const Model = () => (
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Create Order</ModalHeader>
        <ModalBody>
          <Form >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="RestaurantName" className="mr-sm-2">ชื่อร้าน</Label>
              <Input type="text" name="RestaurantName" id="RestaurantName" placeholder="ร้านอาหารตามสั่งป้า บลาๆ!!!" onChange={this.handleTyping} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="RestaurantUrl" className="mr-sm-2">Url ร้าน (แล้วแต่ถ้ามีก็ใส่ไป)</Label>
              <Input type="url" name="RestaurantUrl" id="RestaurantUrl" placeholder="-" onChange={this.handleTyping} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="Creator" className="mr-sm-2">ชื่อคุณเอง</Label>
              <Input type="url" name="Creator" id="Creator" placeholder="เวฟ" onChange={this.handleTyping} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmit}>Create</Button>
          <Button color="danger" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          <FontAwesome.FaPlus style={{ marginRight: '5%' }} />
          Create Order&nbsp;
        </Button>
        <ModalCreateOrder
          show={this.state.modal}
          toggle={this.toggle}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

CreateOrder.propTypes = {
  reloadOrderList: PropTypes.func.isRequired,
};

export default CreateOrder;
