import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Pagination,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Task from '../components/Task'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class ViewTaskList extends Component{
	//来自从各个项目中过滤出的任务组成的列表 修改会反映到原列表中 添加任务到收件箱
	static propTypes={
		pid:PropTypes.string,
		name:PropTypes.string,
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
			pageSize:3,
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
		this.props.onAddTask({content:this.state.addContent,ddl:date},0)
		this.setState({addContent:''})
	}
	handleFinishTask(projectIndex,taskIndex){
		this.props.onFinishTask(taskIndex,projectIndex)
	}
	handleDeleteTask(projectIndex,taskIndex){
		this.props.onDeleteTask(taskIndex,projectIndex)
	}
	handleUpdateTask(projectIndex,task,taskIndex){
		this.props.onUpdateTask(task,taskIndex,projectIndex)
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
		console.log('ViewTaskList',tasks)
		return (
			<div className="task-list">
				<p>任务列表/项目 {this.props.name}</p>
				{tasks.map((item,i)=>
					<Task key={i} index={item.taskIndex} ddl={item.ddl} content={item.content}
					onDeleteTask={this.handleDeleteTask.bind(this,item.projectIndex)}
					onFinishTask={this.handleFinishTask.bind(this,item.projectIndex)}
					onUpdateTask={this.handleUpdateTask.bind(this,item.projectIndex)}
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
