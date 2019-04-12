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
		onAddProject:PropTypes.func,
		onDeleteProject:PropTypes.func,
		onUpdateProject:PropTypes.func
	}
	
	constructor(){
		super()
		this.state={
			isAdding:false,
			addContent:''
		}
	}
	handleAddProject(){
		let content=this.state.addContent
		if(!content){
			return
		}
		//todo 申请pid
		let newProject={pid:'',name:content,tasks:[]}
		console.log('添加项目',newProject)
		
		this.props.onAddProject(newProject)
		this.setState({addContent:'',isAdding:false})
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
						<div className="to-add-bar" style={this.state.isAdding?hidden:show}>
							<Button icon="plus" size="mini" onClick={(e)=>{this.setState({isAdding:true})}}>添加项目</Button>
						</div>
						<div className="adding-bar" style={{...{flexDirection:'row'},...this.state.isAdding?show:hidden}}>
							<table>
								<tbody>
									<tr>
										<td><Input size="small" placeholder="输入您的项目" value={this.state.addContent} onChange={this.onChange.bind(this, 'addContent')}/></td>
									</tr>
								</tbody>
							</table>
							<Button onClick={this.handleAddProject.bind(this)}>添加项目</Button>
							<Button onClick={()=>{this.setState({isAdding:false,addContent:''})}}>取消</Button>
						</div>
					</Menu.SubMenu>			
				</Menu>
			</div>
		)
	}
}
