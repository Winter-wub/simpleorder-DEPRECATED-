import { Button, Table, Input, Label } from 'reactstrap';
import axios from 'axios';
import React, { Component } from 'react';
import alertify from 'alertify.js';
import { url, urlSetcost } from '../config';

class SetCost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MenuList: [],
      cost: 0,
      count: 0,
    };
    this.GetOrderDetail = this.GetOrderDetail.bind(this);
    this.handleCost = this.handleCost.bind(this);
  }
  async componentDidMount() {
    await this.GetOrderDetail();
    await this.Ccount();
    
  }
  async GetOrderDetail() {
    const { match } = this.props;
    const ResponseData = await axios.get(url + match.params.id);
    this.setState({
      MenuList: ResponseData.data[0].MenuList,
      cost: ResponseData.data[0].Cost,
    });
  }
  handleCost(e) {
    if (e.target.value < 0) {
      alertify.log('ค่าส่งน้อยกว่า 0 ไม่ได้');
      this.setState({
        cost: 0,
      });
    }

    this.setState({
      cost: e.target.value,
    });
  }
  async updateCost() {
    const { match } = this.props;
    if (this.state.cost < 0) {
      this.setState({
        cost: 0,
      });
    }
    axios.post(`${urlSetcost}dev/${match.params.id}`, { Cost: this.state.cost });
  }

  Ccount(){
    let count = 0;
    this.state.MenuList.map(list => (
      list.List.map(peo => (
        count+=1
      ))));
    this.setState({count : count})
  }

  render() {
    return (
      <div style={{ paddingTop: '60px' }}>
        <h3>Order : {this.props.match.params.id}</h3>
        <h5>คนที่สั่งทั้งหมด : {this.state.count} </h5>
        <Table>
          <thead>
            <tr>
              <th>ชื่ออาหาร</th>
              <th>ราคาหน่วยล่ะ</th>
              <th>คนสั่ง</th>
            </tr>
          </thead>
          <tbody>
            {
            this.state.MenuList.map(list => (
              <tr key={list}>
                <td>{list.DishName}</td>
                <td>{list.Cost}</td>
                <td>
                  {
                    <Table size="sm">
                      <thead>
                        <tr>
                          <th>ชื่อ</th>
                          <th>จำนวน</th>
                          <th>จำนวนเงินที่ต้องชำระ</th>
                        </tr>
                      </thead>
                      <tbody>{
                  list.List.map(people => {
                    //this.Ccount();
                    return (<tr key={people}>
                      <td>{people.Name}</td>
                      <td>{people.unit}</td>
                      <td>{(people.unit * list.Cost) + parseInt(this.state.cost, 10)}</td>
                    </tr> )
                  })
                }
                      </tbody>
                    </Table>
                }
                </td>
              </tr>
           ))
          }
          </tbody>
        </Table>
        <div
          style={{
            position: 'fixed',
            bottom: '5%',
            right: '10px',
          }}
        >
          <div style={{ backgroundColor: 'black' }}><Label style={{ color: 'white' }}>ค่าส่ง(ที่หารแล้ว)</Label> </div>
          <Input type="number" min="0" value={this.state.cost} onChange={this.handleCost} />
          <Button onClick={() => this.updateCost()}>กำหนด</Button>

        </div>
      </div>

    );
  }
}

export default SetCost;
