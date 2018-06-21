import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class ModalCreateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: this.props.show || false,
      name: '',
      url: '',
      owner: '',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value })
  };

  handleChangeURL(e) {
    this.setState({ url: e.target.value })
  };

  handleChangeOwner(e) {
    this.setState({ owner: e.target.value })
  };

  render() {
    return (
        <Modal isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Create Order</ModalHeader>
        <ModalBody>
          <Form >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="RestaurantName" className="mr-sm-2">ชื่อร้าน</Label>
              <Input type="text" name="RestaurantName" id="RestaurantName" placeholder="" onChange={this.handleChangeName} />
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="RestaurantUrl" className="mr-sm-2">Url ร้าน</Label>
              <Input type="url" name="RestaurantUrl" id="RestaurantUrl" placeholder="https://www.now.in.th/bangkok/ชาบูคุณป้า" onChange={this.handleChangeURL} />
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="Creator" className="mr-sm-2">ชื่อคนสั่ง</Label>
              <Input type="url" name="Creator" id="Creator" placeholder="" onChange={this.handleChangeOwner} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={this.props.toggle}>Close</Button>
          <Button color="success" onClick={this.props.handleSubmit}>Create</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalCreateOrder;
