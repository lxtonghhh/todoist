import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Pagination,Table,Form,Select,Button,Radio,Layout,Input} from 'element-react'
import Task from './Task'
import _ from 'lodash'
export default class TaskList extends Component{
	static propTypes={
		pid:PropTypes.string,
		name:PropTypes.string,
		index:PropTypes.number,
		tasks:PropTypes.array
	}
	
	constructor(){
		super()
		this.state={
			pageSize:10,
			curPageIndex:0
		}

	}
	handlePageChange(currentPage){
		this.setState({curPageIndex:currentPage-1})
	}
	render(){
		let total=this.props.tasks.length
		let startIndex=this.state.curPageIndex*this.state.pageSize
		let tasks=_.slice(this.props.tasks,startIndex,startIndex+this.state.pageSize)
		console.log('TaskList',tasks)
		return (
			<div className="task-list">
				<p>文件夹列表/任务列表/项目 {this.props.name}</p>
				{tasks.map((item,i)=>
					<Task key={i} index={i} 
					content={item.content} uid={item.uid} pid={item.pid} tid={item.tid} status={item.status}
					/>
				)}
				<Pagination layout="prev, pager, next" pageSize={this.state.pageSize} total={total} 
				onCurrentChange={this.handlePageChange.bind(this)}
				/>
			</div>
		)
	}
}
