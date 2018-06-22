import { Button } from 'reactstrap';
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
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleTyping(event) {
    const input = {
      [event.target.name]: event.target.value,
    };
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
