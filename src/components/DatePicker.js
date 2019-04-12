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
					console.debug('DatePicker changed: ', date)
					this.setState({value: date})
					this.props.onChange(date)
					this.datepicker.value=''
					}}
					shortcuts={[{
						text: '今天',
						onClick: (picker)=> {
						this.setState({value: new Date()})
						this.datepicker.togglePickerVisible()
						}
						}, {
						text: '明天',
						onClick: (picker)=> {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24);
						this.setState({value: date})
						this.datepicker.togglePickerVisible()
						}
						}, {
						text: '一周后',
						onClick: (picker)=> {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
						this.setState({value: date})
						this.datepicker.togglePickerVisible()
						}
					}]}
				/>
			</div>
		)
	}
}