import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Button,Radio,Layout,Input} from 'element-react'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
class Task extends Component{
	static propTypes={
		index:PropTypes.number,
		ddl:PropTypes.instanceOf(Date),
		content:PropTypes.string,
		onFinishTask:PropTypes.func,
		onDeleteTask:PropTypes.func,
		onUpdateTask:PropTypes.func,
	}
	constructor(){
		super()
		this.state={
			isUpDating:false,
			updateContent:'',
			updateDate:''
		}
		
	}

	handleFinishTask(){
		this.props.onFinishTask(this.props.index)
	}
	handleDeleteTask(){
		this.props.onDeleteTask(this.props.index)
	}
	handleUpdateTask(){
		let content=this.state.updateContent
		let date=this.state.updateDate
		if(!content){
			//修改内容为空则恢复原状
			this.setState({isUpDating:false,updateContent:'',updateDate:''})
			return
		}
		if(!date){
			date=this.state.ddl
		}
		console.log('更新任务',content,date)
		this.props.onUpdateTask({content:content,ddl:date},this.props.index)
		this.setState({isUpDating:false,updateContent:'',updateDate:''})
	}
	onChange(key, value) {
		console.log('Task onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}
	render(){
		return (
			<div>
				<div className="task-item" style={this.state.isUpDating?hidden:show}>
					<table>
						<tbody>
							<tr>
								<td><Button className="button-finish" type="primary" icon="circle-check" size="mini" onClick={this.handleFinishTask.bind(this)}></Button></td>
								<td><span className="task-content-text" 
								onClick={()=>{this.setState({isUpDating:true,updateContent:this.props.content,updateDate:this.props.ddl})}}>
								任务： {this.props.content}</span></td>
								<td>截止： {this.props.ddl.toLocaleDateString()}</td>
								<td><Button className="button-delete" type="primary" icon="circle-close" size="mini" onClick={this.handleDeleteTask.bind(this)}></Button></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="adding-bar" style={{...{flexDirection:'row'},...this.state.isUpDating?show:hidden}}>
						<table>
							<tbody>
								<tr>
									<td><Input size="small" placeholder="输入您的计划" value={this.state.updateContent} onChange={this.onChange.bind(this, 'updateContent')}/></td>
									<td><DatePicker onChange={this.onChange.bind(this, 'updateDate')}/></td>
								</tr>
							</tbody>
						</table>
						<Button onClick={this.handleUpdateTask.bind(this)}>保存</Button>
						<Button onClick={()=>{this.setState({isUpDating:false,updateContent:'',updateDate:''})}}>取消</Button>
						
				</div>
			</div>
		)
	}
}
export default Task