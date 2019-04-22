import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {Button,Input,Collapse,Carousel} from 'element-react'
import _ from 'lodash'
const statusToColorType={"doing":"info","finish":"success","3":"warning","4":"danger"}
const statusToText={"doing":"进行中","finish":"已完成","3":"warning","4":"danger"}
const show={display:'flex'}
const hidden={display:'none'}
function TaskItem(props){
	return (
			<div className="task-item">
				<table>
					<tbody>
						<tr>
							<td><span className="task-content-text">文件夹/任务： {props.content}</span></td>
							<td>
								<span style={{padding:"0px 20px"}}>
									<Button className="button-status" type={statusToColorType[props.status]} icon="star-off" size="mini">{statusToText[props.status]}</Button>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

	)
}
function TaskInfo(props){
	return (
			<div className="task-info">
				<Collapse value={1}>
			      <Collapse.Item title="基本信息" name="1">
			        <div>性别： {props.gender}</div>
			        <div>年龄 {props.age}岁</div>
			        <div>病史： {props.history}</div>
			      </Collapse.Item>
			    </Collapse>
			</div>
	)
}
const testImg=[
			//{url:'https://mmbiz.qpic.cn/mmbiz_jpg/gFxQW0ZLIfMsibjKx4ibk7ktpMxYaOoomia3SbsibkWKZicc3Efb6eiaQ2iaCg9OTD90bQZbTnWGum8lC7XlJc2LWnCgQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
			//width:540,height:720},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/1.jpg',width:720,height:540},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/2.jpg',width:720,height:540},
			{url:'http://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com/huaxi/3.jpg',width:720,height:540}
]
function TaskImage(props){
	return (
			<div className="task-img">
				<Collapse value={1}>
			      <Collapse.Item title="图片" name="1">
			        <Carousel trigger="click" height="250px" autoplay={false}>
			          {
			            testImg.map((item, index) => {
			              return (
			                <Carousel.Item key={index}>
		                  		<h3>{index}</h3>
								<img src={item.url} alt={index} width="150px" height="150px" />
								<img src={item.url} alt={index} width="150px" height="150px" />
								<img src={item.url} alt={index} width="150px" height="150px" />
			                </Carousel.Item>
			              )
			            })
			          }
			        </Carousel>
			      </Collapse.Item>
			    </Collapse>
			</div>

	)
}
class Task extends Component{
	static propTypes={
		index:PropTypes.number,
		content:PropTypes.string,
		uid:PropTypes.string,
		pid:PropTypes.string,
		tid:PropTypes.string,
		status:PropTypes.string
	}
	constructor(){
		super()
		this.state={
			isShowInfo:false,
			isShowImg:false
		}
	}
	onChange(key, value) {
		console.log('Task onChange',key, value)
		this.state[key] = value
		this.forceUpdate()
	}
	render(){
		return (
			<div className="task">
				<TaskItem content={this.props.content} status={this.props.status} />
				<TaskInfo gender={"男"} age={45} history={"长期吸烟"} />
				<TaskImage/>
			</div>
		)
	}
}
export default Task
//<div class="ist_menu" style="z-index: 505; top: 189px; left: 729px;">
