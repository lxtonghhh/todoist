import React, { Component } from 'react';
import './App.css';
import TaskList from './containers/TaskList'
import 'element-theme-default'
import './index.css';
import _ from 'lodash'
class App extends Component {
  constructor(){
    super()
    this.state={
      projects:[
        {
          pid:'1',desc:"测试项目 请任意添加任务",
          tasks:[
            {content:'1',ddl:new Date()},//why new Date()得到Date对象 Date()只得到相应的string
            {content:'2',ddl:new Date()},
          ]
        }
      ]
    }
  }
  _updateTasks(projects,projectIndex,newTasks){
    projects[projectIndex].tasks=newTasks
    this.setState({projects:projects})
  }
  handleAddTask(task,projectIndex){
    const projects=this.state.projects
    console.log('APP添加任务',task,projectIndex,projects)
    const tasks=this.state.projects[projectIndex].tasks
    let newTasks=_.concat(tasks,task)

    this._updateTasks(projects,projectIndex,newTasks)
    console.log('APP添加任务 After',projects)
  }
  handleFinishTask(taskIndex,projectIndex){
    const projects=this.state.projects
    console.log('APP完成任务',taskIndex,projectIndex,projects)
    const tasks=this.state.projects[projectIndex].tasks
    let finishTask=tasks.splice(taskIndex,1)
    let newTasks=tasks

    this._updateTasks(projects,projectIndex,newTasks)
    console.log('APP完成任务 After',projects)
  }
  handleDeleteTask(taskIndex,projectIndex){
    const projects=this.state.projects
    console.log('APP删除任务',taskIndex,projectIndex,projects)
    const tasks=this.state.projects[projectIndex].tasks
    let deleteTask=tasks.splice(taskIndex,1)
    let newTasks=tasks
    
    this._updateTasks(projects,projectIndex,newTasks)
    console.log('APP删除任务 After',projects)
  }
  render() {
    return (
      <div className="App">
        {this.state.projects.map((project,i)=>
          <TaskList key={i} index={i} pid={project.pid} desc={project.desc} 
            tasks={project.tasks}
            onAddTask={this.handleAddTask.bind(this)}
            onDeleteTask={this.handleDeleteTask.bind(this)}
            onFinishTask={this.handleFinishTask.bind(this)}
          />)
        }
      </div>
    )
  }
}

export default App;
