import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Button,Radio,Layout,Input} from 'element-react'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
class Task extends Component{
	static propTypes={
		project:PropTypes.object,
		index:PropTypes.number,
		onDeleteProject:PropTypes.func,
		onUpdateProject:PropTypes.func,
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
	handleDeleteProject(){
		this.props.onDeleteProject(this.props.index)
	}
	handleUpdateProject(){
		let content=this.state.updateContent
		if(!content){
			//修改内容为空则恢复原状
			this.setState({isUpDating:false,updateContent:''})
			return
		}
		let newProject={...this.props.project,name:content}
		console.log('更新项目',newProject)
		this.props.onUpdateProject(newProject,this.props.index)
		this.setState({isUpDating:false,updateContent:''})
	}
	onChange(key, value) {
		console.log('Task onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}
	render(){
		return (
			<div>
				<div className="project-item" style={this.state.isUpDating?hidden:show}>
					<table>
						<tbody>
							<tr>
								<td className="project-color"></td>
								<td><span className="project-content-text">{this.props.project.name}</span></td>
								<td className="project-task-count">{this.props.project.tasks.length}</td>
								<td>
									<Button className="project-update" type="primary" icon="edit" size="mini" 
									onClick={()=>{this.setState({isUpDating:true,updateContent:this.props.project.name})}}></Button>
								</td>
								<td>
									<Button className="project-delete" type="primary" icon="delete" size="mini" 
									onClick={this.handleDeleteProject.bind(this)}></Button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="adding-bar" style={{...{flexDirection:'row'},...this.state.isUpDating?show:hidden}}>
						<table>
							<tbody>
								<tr>
									<td><Input size="small" placeholder="" value={this.state.updateContent} onChange={this.onChange.bind(this, 'updateContent')}/></td>
								</tr>
							</tbody>
						</table>
						<Button onClick={this.handleUpdateProject.bind(this)}>保存</Button>
						<Button onClick={()=>{this.setState({isUpDating:false,updateContent:''})}}>取消</Button>
						
				</div>
			</div>
		)
	}
}
export default Task