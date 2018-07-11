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
      CloseDate: '',
      tel: '',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeTel = this.handleChangeTel.bind(this);
    this.handleChangeCloseDate = this.handleChangeCloseDate.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChangeName(e) {
    this.setState({ RestaurantName: e.target.value });
  }

  handleChangeURL(e) {
    this.setState({ RestaurantUrl: e.target.value });
  }

  handleChangeOwner(e) {
    this.setState({ Creator: e.target.value });
  }
  handleChangeCloseDate(e) {
    this.setState({ CloseDate: e.format('LT') });
  }
  handleChangeTel(e) {
    this.setState({ tel: e.target.value });
  }
  async handleSubmit() {
    this.toggle();
    const post = {
      RestaurantName: this.state.RestaurantName,
      RestaurantUrl: this.state.RestaurantUrl,
      Creator: this.state.Creator,
      CloseDate: this.state.CloseDate,
      url: window.location.href,
      tel: this.state.tel,
    };
    await axios.post(url, post);
    await this.props.reloadOrderList();
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
          handleChangeName={this.handleChangeName}
          handleChangeURL={this.handleChangeURL}
          handleChangeOwner={this.handleChangeOwner}
          handleChangeCloseDate={this.handleChangeCloseDate}
          handleChangeTel={this.handleChangeTel}
        />
      </div>
    );
  }
}

CreateOrder.propTypes = {
  reloadOrderList: PropTypes.func.isRequired,
};

export default CreateOrder;
