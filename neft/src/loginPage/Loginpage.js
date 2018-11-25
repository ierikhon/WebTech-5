import React, { Component } from 'react';

export class Loginpage extends Component{
    constructor(props){
        super(props);
        this.state = {user: ''};
        this.handler = this.handler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);

    }

    handler(event){
        this.setState({user: event.target.value})
    }

    render(){
        return(
            <div>
                <p>Welcome to stock market</p>
                <input type='text' placeholder='enter name' onChange={this.handler}/>
                <button className='w3-btn w3-green w3-margin' onClick={this.loginHandler}>Proceed</button>
            </div>
        )
    }

    loginHandler() {
        this.props.login(this.state.user);
    }
}