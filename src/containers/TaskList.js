import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Pagination,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Task from '../components/Task'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class TaskList extends Component{
	static propTypes={
		pid:PropTypes.string,
		name:PropTypes.string,
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
			addDate:'',
			pageSize:4,
			curPageIndex:0
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
	handlePageChange(currentPage){
		this.setState({curPageIndex:currentPage-1})
	}
	onChange(key, value) {
		console.log('TaskList onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}

	render(){
		let total=this.props.tasks.length
		let startIndex=this.state.curPageIndex*this.state.pageSize
		let tasks=_.slice(this.props.tasks,startIndex,startIndex+this.state.pageSize)
		console.log('TaskList',tasks)
		return (
			<div className="task-list">
				<p>任务列表/项目 {this.props.name}</p>
				{tasks.map((item,i)=>
					<Task key={i} index={i} ddl={item.ddl} content={item.content}
					uid={item.uid} pid={item.pid} tid={item.tid} level={item.level} status={item.status}
					onDeleteTask={this.handleDeleteTask.bind(this)}
					onFinishTask={this.handleFinishTask.bind(this)}
					onUpdateTask={this.handleUpdateTask.bind(this)}
					/>
				)}
				<div className="to-add-bar" style={this.state.isAdding?hidden:show}>
					<Button icon="plus" size="mini" onClick={(e)=>{this.setState({isAdding:true})}}>添加任务</Button>
				</div>
				<div className="adding-bar" style={{...{flexDirection:'row'},...this.state.isAdding?show:hidden}}>
					<table>
						<tbody>
							<tr>
								<td><Input size="small" placeholder="输入您的计划" value={this.state.addContent} onChange={this.onChange.bind(this, 'addContent')}/></td>
								<td><DatePicker onChange={this.onChange.bind(this, 'addDate')}/></td>
							</tr>
						</tbody>
					</table>
					<Button onClick={this.handleAddTask.bind(this)}>添加任务</Button>
					<Button onClick={()=>{this.setState({isAdding:false,addContent:'',addDate:''})}}>取消</Button>
					
				</div>
				<Pagination layout="prev, pager, next" pageSize={this.state.pageSize} total={total} onCurrentChange={this.handlePageChange.bind(this)}/>
			</div>
		)
	}
}
