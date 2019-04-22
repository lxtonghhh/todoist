import React,{Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
function ProjectItem(props){
	return (
		<table className="project-item">
			<tbody>
				<tr>
					<td className="project-color"><div className="color-point"></div></td>
					<td><span className="project-content-text">{props.name}</span></td>
					<td><span className="project-task-count">{props.taskNum}</span></td>
				</tr>
			</tbody>
		</table>
	)
}
class Project extends Component{
	static propTypes={
		project:PropTypes.object,
		index:PropTypes.number
	}
	constructor(){
		super()
		this.state={
		}
	}
	render(){
		return (
			<div>
				<ProjectItem name={this.props.project.name} taskNum={this.props.project.tasks.length} />
			</div>
		)
	}
}
export default Project