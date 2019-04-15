import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {Form,Select,Button,Radio,Layout,Input} from 'element-react'
import DatePicker from '../components/DatePicker'
import _ from 'lodash'
const levelToColorType={"1":"info","2":"success","3":"warning","4":"danger"}
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
	_map_date_to_ddl(date){
		let today=new Date()
		if(date.toLocaleDateString()===today.toLocaleDateString()){
			return "今天"
		}
		else if(date<today)
		{
			return "已过期"
		}
		else{
			let tomorrow=new Date(today.getTime() + 24*60*60*1000)
			if(date.toLocaleDateString()===tomorrow.toLocaleDateString()){
				return "明天"
			}else{
				return date.toLocaleDateString()
			}
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
	handleChangeLevel(newLevel){
		if(newLevel===this.props.level){
			return
		}else{
			this.props.onUpdateTask({uid:this.props.uid,pid:this.props.pid,tid:this.props.tid,level:newLevel,status:this.props.status,content:this.props.content,ddl:this.props.ddl},
			this.props.index)
			this.setState({isShowMenu:false,menuStyle:null})
		}
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
			menuStyle={zIndex: 505,top: rect.top+20,left: rect.left-20}
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
								<td><span style={{padding:"0px 20px"}}>截止： {this._map_date_to_ddl(this.props.ddl)}</span></td>
								<td><Button className="button-delete" type="primary" icon="circle-close" size="mini" onClick={this.handleDeleteTask.bind(this)}></Button></td>
								<td><Button ref="menuButton" className="button-delete" type={levelToColorType[this.props.level]} icon="star-off" size="mini" onClick={this.handleMenuClick.bind(this)}></Button></td>
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
								<td><Button plain={this.props.level==='1'?false:true} 
								onClick={this.handleChangeLevel.bind(this,"1")} type="info">优先级1</Button></td>
							</tr>
							<tr>
								<td><Button plain={this.props.level==='2'?false:true} 
								onClick={this.handleChangeLevel.bind(this,"2")} type="success">优先级2</Button></td>
							</tr>
							<tr>
								<td><Button plain={this.props.level==='3'?false:true}
								onClick={this.handleChangeLevel.bind(this,"3")} type="warning">优先级3</Button></td>
							</tr>
							<tr>
								<td><Button plain={this.props.level==='4'?false:true}
								onClick={this.handleChangeLevel.bind(this,"4")} type="danger">优先级4</Button></td>
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
