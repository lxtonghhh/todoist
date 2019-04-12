import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Task from '../components/Task'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class TaskList extends Component{
	static propTypes={
		pid:PropTypes.string,
		desc:PropTypes.string,
		index:PropTypes.number,
		tasks:PropTypes.array,
		onAddTask:PropTypes.func
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
			date=Date()
		}
		console.log('添加任务',this.state.addContent,typeof date)
		this.props.onAddTask({content:this.state.addContent,ddl:date},this.props.index)
		this.setState({addContent:''})
		
	}
	onChange(key, value) {
		console.log('TaskList onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}
	render(){
		return (
			<div className="task-list">
				<p>任务列表/项目{this.props.pid}： {this.props.desc}</p>
				{this.props.tasks.map((item,i)=>
					<Task key={i} index={i} ddl={item.ddl} content={item.content}
					/>
				)}
				<div className="to-add-bar" style={this.state.isAdding?hidden:show} onClick={
					(e)=>{this.setState({isAdding:true})}
				}>添加任务</div>
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
			</div>
		)
	}
}
