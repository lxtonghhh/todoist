import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Button,Radio,Layout,Input} from 'element-react'
import _ from 'lodash'
class Task extends Component{
	static propTypes={
		index:PropTypes.number,
		ddl:PropTypes.instanceOf(Date),
		content:PropTypes.string,
		onFinishTask:PropTypes.func,
		onDeleteTask:PropTypes.func
	}
	constructor(){
		super()
		this.state={

		}
		
	}
	handleFinishTask(){
		this.props.onFinishTask(this.props.index)
	}
	handleDeleteTask(){
		this.props.onDeleteTask(this.props.index)
	}
	render(){
		return (
			<div className="task-item">
				<Button className="button-finish" type="primary" icon="edit" size="mini" onClick={this.handleFinishTask.bind(this)}></Button>
				<p>任务： {this.props.content}</p>
				<p>截止： {this.props.ddl.toLocaleDateString()}</p>
				<Button className="button-delete" type="primary" icon="delete" size="mini" onClick={this.handleDeleteTask.bind(this)}></Button>
			</div>
		)
	}
}
export default Task