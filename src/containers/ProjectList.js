import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Menu,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Project from '../components/Project'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class ProjectList extends Component{
	static propTypes={
		projects:PropTypes.array,
		onAddTask:PropTypes.func,
		onDeleteProject:PropTypes.func,
		onUpdateProject:PropTypes.func
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
	handleUpdateProject(project,projectIndex){
		this.props.onUpdateProject(project,projectIndex)
	}
	handleDeleteProject(projectIndex){
		this.props.onDeleteProject(projectIndex)
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
						{this.props.projects.map((item,i)=>
							<Menu.Item index={"3-"+i} key={i}> 
								<Project index={i} project={item}
								onDeleteProject={this.handleDeleteProject.bind(this)}
								onUpdateProject={this.handleUpdateProject.bind(this)}
								/>
							</Menu.Item>
						)}
					</Menu.SubMenu>			
				</Menu>
			</div>
		)
	}
}
