import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

class ModalCreateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: this.props.show || false,
    };
  }

  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggle} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>Create Order</ModalHeader>
        <ModalBody>
          <Form >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="RestaurantName" className="mr-sm-2">ชื่อร้าน</Label>
              <Input type="text" name="RestaurantName" id="RestaurantName" placeholder="" onChange={this.props.handleChangeName} />
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="RestaurantUrl" className="mr-sm-2">Url ร้าน</Label>
              <Input type="url" name="RestaurantUrl" id="RestaurantUrl" placeholder="https://www.now.in.th/bangkok/ชาบูคุณป้า" onChange={this.props.handleChangeURL} />
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="Creator" className="mr-sm-2">ชื่อคนสั่ง</Label>
              <Input type="text" maxLength="10" name="Creator" id="Creator" placeholder="" onChange={this.props.handleChangeOwner} />
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="tel" className="mr-sm-2">เบอร์โทร(สำหรับโอนพร้อมเพย์)</Label><Badge color="danger">New</Badge>
              <Input type="text" name="tel" id="tel" onChange={this.props.handleChangeTel} />
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="CloseDate" className="mr-sm-2">เวลาปิด Order</Label>
              <TimePicker use12Hours format='h:mm a' defaultValue={moment().hour(0).minute(0)} showSecond={false}  onChange={this.props.handleChangeCloseDate}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="default" className="mr-auto" onClick={this.props.toggle}>Close</Button>
          <Button color="success" onClick={this.props.handleSubmit}>Create</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalCreateOrder;
