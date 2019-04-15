import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
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
		uid:PropTypes.string,
		pid:PropTypes.string,
		tid:PropTypes.string,
		level:PropTypes.string,
		status:PropTypes.string,
		onFinishTask:PropTypes.func,
		onDeleteTask:PropTypes.func,
		onUpdateTask:PropTypes.func,
	}
	constructor(){
		super()
		this.state={
			isUpDating:false,
			updateContent:'',
			updateDate:'',
			isShowMenu:false,
			menuStyle:null
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
		this.props.onUpdateTask({uid:this.props.uid,pid:this.props.pid,tid:this.props.tid,level:this.props.level,status:this.props.status,content:content,ddl:date},
			this.props.index)
		this.setState({isUpDating:false,updateContent:'',updateDate:''})
	}
	handleMenuClick(){
		let isShowMenu
		let menuStyle
		let button=this.refs.menuButton
		if(this.state.isShowMenu){
			isShowMenu=false
			menuStyle=null
			console.log('handleMenuClose',button)
		}else{
			isShowMenu=true
			console.log('handleMenuOpen',button)
			const dom = ReactDOM.findDOMNode(button);
			const rect=dom.getBoundingClientRect()
			console.log(rect)
			menuStyle={zIndex: 505,top: rect.top+20,left: rect.left-220}
			console.log(menuStyle)
		}
		this.setState({menuStyle,isShowMenu})
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
								<td><Button ref="menuButton" className="button-delete" type="primary" icon="more" size="mini" onClick={this.handleMenuClick.bind(this)}></Button></td>
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
				<div className="task-menu" ref="menu" style={{...this.state.menuStyle,...this.state.isShowMenu?show:hidden}}>
					<table>
						<tbody>
							<tr>
								<td><Button>1</Button></td>
							</tr>
							<tr>
								<td><Button>2</Button></td>
							</tr>
							<tr>
								<td><Button>3</Button></td>
							</tr>
							<tr>
								<td><Button>4</Button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
export default Task
//<div class="ist_menu" style="z-index: 505; top: 189px; left: 729px;">
