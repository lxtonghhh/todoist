import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Menu,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Task from '../components/Task'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class ProjectList extends Component{
	static propTypes={
		projects:PropTypes.array,


		pid:PropTypes.string,
		desc:PropTypes.string,
		index:PropTypes.number,
		tasks:PropTypes.array,
		onAddTask:PropTypes.func,
		onFinishTask:PropTypes.func,
		onDeleteTask:PropTypes.func,
		onUpdateTask:PropTypes.func
	}
	
	constructor(){
		super()
		this.state={
			isAdding:false,
			addContent:'',
			addDate:''
		}
	}
	handleAddTask(){
		if(!this.state.addContent){
			return
		}
		let date=this.state.addDate
		if(!date){
			date=new Date()
		}
		console.log('添加任务',this.state.addContent,typeof date)
		this.props.onAddTask({content:this.state.addContent,ddl:date},this.props.index)
		this.setState({addContent:''})
	}
	handleFinishTask(taskIndex){
		this.props.onFinishTask(taskIndex,this.props.index)
	}
	handleDeleteTask(taskIndex){
		this.props.onDeleteTask(taskIndex,this.props.index)
	}
	handleUpdateTask(task,taskIndex){
		this.props.onUpdateTask(task,taskIndex,this.props.index)
	}
	onChange(key, value) {
		console.log('TaskList onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}
	handleOpen(index) {
		console.log('handleOpen',index)
	}

	handleClose(index) {
		console.log('handleClose',index)
	}
	handleSelect(index){
		console.log('handleSelect',index)
	}
	render(){
		return (
			<div className="project-list">
				<Menu defaultActive="1" onOpen={this.handleOpen.bind(this)} onClose={this.handleClose.bind(this)} onSelect={this.handleSelect.bind(this)}>
					<Menu.Item index="1"><i className="el-icon-message"></i>收件箱</Menu.Item>
					<Menu.Item index="2"><i className="el-icon-date"></i>今天</Menu.Item>
					<Menu.SubMenu index="3" title={<span><i className="el-icon-menu"></i>项目</span>}>
						<Menu.Item index="1-1">选项1</Menu.Item>
						<Menu.Item index="1-2">选项2</Menu.Item>
					</Menu.SubMenu>
					
				</Menu>
			</div>
		)
	}
}
