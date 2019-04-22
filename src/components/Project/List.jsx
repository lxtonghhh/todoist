import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Menu,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Project from './Project'
import _ from 'lodash'
const show={display:'flex'}
const hidden={display:'none'}
export default class ProjectList extends Component{
	static propTypes={
		projects:PropTypes.array,
		onChooseProject:PropTypes.func
	}
	
	constructor(){
		super()
		this.state={
			activeIndex:'0'
		}
	}
	handleOpen(index) {
		console.log('handleOpen',index)
	}
	handleClose(index) {
		console.log('handleClose',index)
	}
	handleSelect(indexStr){
		if(indexStr.startsWith('1')){
			console.log('Choose Project',parseInt(indexStr.substr(2), 10))
			this.props.onChooseProject(parseInt(indexStr.substr(2), 10))
			this.setState({activeIndex:indexStr})
		}else if(indexStr.startsWith('0')){
			console.log('Choose Project 0')
			this.props.onChooseProject(parseInt(indexStr, 10))
			this.setState({activeIndex:indexStr})
		}else{
			//this.props.onChooseProject(parseInt(indexStr, 10))
		}
	}
	render(){
		return (
			<div className="project-list">
				<Menu defaultActive={this.state.activeIndex} onOpen={this.handleOpen.bind(this)} onClose={this.handleClose.bind(this)} 
				onSelect={this.handleSelect.bind(this)}>
					<Menu.Item index="0"><i className="el-icon-document"></i>快速开始</Menu.Item>
					<Menu.SubMenu index="1" title={<span><i className="el-icon-menu"></i>项目</span>}>
						{this.props.projects.map((item,i)=>
							<Menu.Item index={"1-"+i} key={i}> 
								<Project index={i} project={item}/>
							</Menu.Item>
						)}
					</Menu.SubMenu>			
				</Menu>
			</div>
		)
	}
}
