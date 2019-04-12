import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Button,Radio,Layout,Input} from 'element-react'
import _ from 'lodash'
class Task extends Component{
	static propTypes={
		index:PropTypes.number,
		ddl:PropTypes.instanceOf(Date),
		content:PropTypes.string
	}
	constructor(){
		super()
		this.state={

		}
	}
	render(){
		return (
			<div className="task-item">
				<p>任务： {this.props.content}</p>
				<p>截止： {this.props.ddl}</p>
			</div>
		)
	}
}
export default Task