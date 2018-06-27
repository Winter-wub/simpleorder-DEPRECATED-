import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Input, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';


const AddDishModal = props => (
  <Modal isOpen={props.modalDish} toggle={props.toggleModaladdDish}>
    <ModalBody>
      <FormGroup row="row">
        <InputGroup>
          <InputGroupAddon addonType="prepend">ชื่อเมนู&nbsp;</InputGroupAddon>
          <div style={{
                  minWidth: '76%',
                }}
          >{props.currentDishlist()}
          </div>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">คนสั่ง&nbsp;&nbsp;</InputGroupAddon>
          <Input type="text" name="Name" value={props.Name} onChange={props.handleName} require />*
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">จำนวน</InputGroupAddon>
          <Input type="number" name="unit" min="1" max="50" value={props.unit} onChange={props.handleunit} />*
        </InputGroup>
       <InputGroup>
          <InputGroupAddon addonType="prepend">ราคา(หากต้องการเเก้ไขหรือสั่งเมนูนี้ครั้งแรก)</InputGroupAddon>
          <Input type="number" name="unit" value={props.cost} onChange={props.handleCost} /> 
        </InputGroup> 
      </FormGroup>  
    </ModalBody>
    <ModalFooter>
      <Button color="success"onClick={props.addDish}>Add</Button>
      <Button color="default"onClick={props.toggleModaladdDish}>Close</Button>
    </ModalFooter>

  </Modal>
);

export default AddDishModal;
