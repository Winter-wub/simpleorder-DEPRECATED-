import React from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const apiUrl = 'http://localhost:1956/api/Orders/';
class EditOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  async submitEdit() {
    const { Name, Url, id } = this.props;
    await axios.patch(apiUrl, {
      RestaurantName: Name,
      RestaurantUrl: Url,
      OrderId: parseInt(id, 10),
    });
    this.toggle();
  }
  render() {
    const { Name, Url, Handle } = this.props;
    return (
      <div><Button style={{ margin: '10%' }} onClick={this.toggle}>แก้ไข Order</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">ร้าน</InputGroupAddon>
              <Input name="RestaurantName" type="text" value={Name} onChange={Handle} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Link</InputGroupAddon>
              <Input name="RestaurantUrl" type="text" value={Url} onChange={Handle} />
            </InputGroup>
          </ModalBody>
          <ModalFooter><Button color="warning" onClick={() => this.submitEdit()}>แก้ไข</Button></ModalFooter>
        </Modal>
      </div>
    );
  }
}

EditOrder.proptype = {
  Name: PropTypes.string.required,
  Url: PropTypes.string.required,
  id: PropTypes.string.required,
};

export default EditOrder;
