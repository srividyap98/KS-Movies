import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './payment.styles.scss';

class PaymentSection extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            FullName: '',
            Username: '',
            City: '',
            State: '',
            Zip: '',
            NameOnCard: '',
            CardNumber: '',
            ExpirationMonth: '',
            ExpirationYear: '',
            CVV: '',
            bookingDetails: props.match.params.imdbID + '/' + props.match.params.date + '/' + props.match.params.show + '/' + props.match.params.seat
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.FullName==='' || this.state.Username==='' || this.state.City==='' || this.state.State==='' || 
        this.state.Zip==='' || this.state.NameOnCard==='' || this.state.CardNumber==='' || this.state.ExpirationMonth==='' || 
        this.state.ExpirationYear==='' || this.state.CVV===''){
            alert('Please complete all fields.');
        }

        else{
            fetch('http://localhost:3001/api/pay',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(this.state)
            })
            .then(res => {
                if(res.status === 400){
                    alert("ERROR: Fill all the required fields");
                }
                else{
                    alert("Your seat has been booked successfully. You will be redirected to your homepage once payment is completed.");
                    this.props.history.push('/');
                }
            })
            .catch(err => console.log(err));
        }
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return(
            <div className='pay-container'>
                <h2>Booking the {this.props.match.params.Title.replace(/\+/g, " ")} seat {this.props.match.params.seat} at {this.props.match.params.show}hrs on {this.props.match.params.date}.</h2>
                <div className='pay-form-container'></div>
                <div className='pay-form-container'>
                    <form>
                        <input className='input' name='FullName' type='text' label="Full Name" placeholder='Please enter your full name.' value={this.state.FullName} onChange={this.handleChange} required />
                        <input className='input' name='Username' type='email' label='Email' placeholder='Please enter your E-mail.' value={this.state.Username} onChange={this.handleChange} required />
                        <input className='input' name='City' type='text' label='City' placeholder='City' value={this.state.City} onChange={this.handleChange} required />
                        <input className='input' name='State' type='text' label='State' placeholder='State' value={this.state.State} onChange={this.handleChange} required />
                        <input className='input' name='Zip' type='text' label='Zip' placeholder='Zip' value={this.state.Zip} onChange={this.handleChange} required />
                        <input className='input' name='NameOnCard' type='text' label='Name on the Card' placeholder='Name on the Card' value={this.state.NameOnCard} onChange={this.handleChange} required />
                        <input className='input' name='CardNumber' type='text' label='Card Number' placeholder='Card Number' value={this.state.CardNumber} onChange={this.handleChange} required />
                        <input className='input' name='ExpirationMonth' type='text' label='Expiration Month' placeholder='Expiration Month' value={this.state.ExpirationMonth} onChange={this.handleChange} required />
                        <input className='input' name='ExpirationYear' type='text' label='Expiration Year' placeholder='Expiration Year' value={this.state.ExpirationYear} onChange={this.handleChange} required />
                        <input className='input' name='CVV' type='text' label='CVV' placeholder='CVV' value={this.state.CVV} onChange={this.handleChange} required />
                        <div>
                            <button className='button' type='submit' onClick={this.handleSubmit}>Please complete the payment</button>
                            <span>Amount to be paid: $7</span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PaymentSection;