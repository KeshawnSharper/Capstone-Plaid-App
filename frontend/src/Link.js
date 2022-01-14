import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';

class Link extends Component {
  constructor() {
    super();

    this.state = {
      linkToken: "",
    };

  }


  componentDidMount = async () =>{
    var response = await axios.post("http://localhost:5000/link_token").then()
    console.log(response.data)
    this.setState({linkToken: response.data["link_token"]});
  }

  handleOnSuccess = async (public_token, metadata) => {
    // send token to client server
    var data = {
      public_token: public_token,
      // use this as the dummy user for now 
    user_id:1
    }
    var response = await axios.post("http://localhost:5000/sync_user_to_bank_account", data);

    console.log(response)
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    localStorage.setItem("accessToken", response.data["accessToken"]);
    // let transactions = await axios.post("http://localhost:5000/user_transactions", {
    //     access_token: localStorage.getItem("accessToken"),
    //     start_date: '2018-01-01',
    //     end_date: '2022-01-12'
    // })
    // transactions = transactions.data["transactions"]
    // console.log(transactions)
    // let inv_response = await axios.post("http://localhost:5000/user_investments", {
    //     access_token: localStorage.getItem("accessToken")
    // });
    // let investments = {
    //     securities:inv_response.data["securities"],
    //     accounts:inv_response.data["accounts"],
    //     holdings:inv_response.data["holdings"]}
    // console.log(investments)
  }

   
  render() {
    const {linkToken} = this.state

    return (
      
      <div>
       {linkToken.toString !== 'undefined' ? 
       <PlaidLink 
       token={linkToken.toString()} 
       env="sandbox" 
       onSuccess={this.handleOnSuccess}
       onExit={this.handleOnExit}>
         Connect Bank Account
         </PlaidLink> 
         : null
        }
      </div>
    );
  }
}

export default Link;