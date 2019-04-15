import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {DatePicker} from 'element-react'
import _ from 'lodash'
export default class MyDatePicker extends Component{
	static propTypes={
		onChange:PropTypes.func,
		ddl:PropTypes.instanceOf(Date),
		content:PropTypes.string
	}
	constructor(){
		super()
		this.state={
			value:null
		}
	}
	render(){
		return (
			<div className="date-picker">
				<DatePicker
					ref={e=>this.datepicker = e}
					value={this.state.value}
					align="right"
					placeholder="日程安排"
					onChange={date=>{
					console.debug('DatePicker changed: ', this,date)
					this.setState({value: date})
					this.props.onChange(date)
					this.datepicker.value=''
					}}
				/>
			</div>
		)
	}
}