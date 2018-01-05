import "react-dates/initialize";
import {SingleDatePicker} from "react-dates";
import React from "react";
const moment = require("moment");
import "react-dates/lib/css/_datepicker.css";

const now = moment().format("MMM Do, YYYY");
class ExpenseForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description: "",
            note: props.expense ? props.expense.note : "",
            amount:props.expense ? (props.expense.amount / 100).toString() : "",
            createAt:props.expense ? moment(props.expense.createAt) : moment(),
            calendarFocused:false, 
            error:""
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description})); 
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({amount}))
        }
    }

    onNoteChange = (e) => {
        // e.persist();
        const note = e.target.value
        this.setState(() => ({note}));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(() => ({error:"Please provide description and amount"}))
        }else{
            this.setState(() => ({error:" "})) 
            this.props.onSubmit({
                description:this.state.description,
                amount:parseFloat(this.state.amount,10) * 100,
                createAt : this.state.createAt.valueOf(),
                note:this.state.note
            });
            console.log("submited")
        }
    };

    render(){
        return (
            <div>
                <form onSubmit = {this.onSubmit}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input type = "text" placeholder = "Description" autoFocus value = {this.state.description} onChange={this.onDescriptionChange}/>
                    <input type = "text" placeholder = "Amount" value = {this.state.amount} onChange = {this.onAmountChange} />
                    <SingleDatePicker
                        date={this.state.createAt} // momentPropTypes.momentObj or null
                        onDateChange={ date => this.setState({ date })} // PropTypes.func.isRequired
                        focused={this.state.calendarFocused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({calendarFocused:focused })} // PropTypes.func.isRequired
                        numberOfMonths = {1}
                        isOutsideRange = {() => (false)}
                    />
                    <textarea placeholder = "Add a note for your expense(optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

module.exports = {
    ExpenseForm
}