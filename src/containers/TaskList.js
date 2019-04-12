import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Task from '../components/Task'
import _ from 'lodash'
export default class TaskList extends Component{
	static propTypes={
		pid:PropTypes.string,
		desc:PropTypes.string,
		index:PropTypes.number,
		tasks:PropTypes.array
	}
	constructor(){
		super()
		this.state={

		}
	}
	render(){
		return (
			<div className="task-list">
				<p>任务列表/项目{this.props.pid}： {this.props.desc}</p>
				{this.props.tasks.map((item,i)=>
					<Task key={i} index={i} ddl={item.ddl} content={item.content}
					/>
				)}
			</div>
		)
	}
}
