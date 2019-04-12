import React, { Component } from 'react';
import './App.css';
import TaskList from './containers/TaskList'
import ProjectList from './containers/ProjectList'
import 'element-theme-default'
import './index.css';
import {Layout} from 'element-react'
import Logo from './components/Logo'
import _ from 'lodash'
class App extends Component {
  constructor(){
    super()
    this.state={
      projects:[
        {
          pid:'1',name:"欢迎",
          tasks:[
            {content:'请任意添加项目',ddl:new Date()},//why new Date()得到Date对象 Date()只得到相应的string
            {content:'1',ddl:new Date()},
          ]
        },
        {
          pid:'2',name:"测试",
          tasks:[
            {content:'请任意添加项目',ddl:new Date()},//why new Date()得到Date对象 Date()只得到相应的string
            {content:'2',ddl:new Date()},
          ]
        }
      ],
      activeIndex:null
    }
  }
  _updateTasks(projects,projectIndex,newTasks){
    projects[projectIndex].tasks=newTasks
    this.setState({projects:projects})
  }
  _updateProjects(projects,projectIndex,newProject){
    if(projectIndex!==null){
      //更新
      projects[projectIndex]=newProject
    }else{
      //删除
    }
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
  handleUpdateTask(task,taskIndex,projectIndex){
    const projects=this.state.projects
    console.log('APP更新任务',taskIndex,projectIndex,projects)
    const tasks=this.state.projects[projectIndex].tasks
    tasks[taskIndex]=task
    let newTasks=tasks
    
    this._updateTasks(projects,projectIndex,newTasks)
    console.log('APP更新任务 After',projects)
  }
  handleUpdateProject(project,projectIndex){
    const projects=this.state.projects
    console.log('APP更新项目',projects,project,projectIndex)
    let newProject=project
    
    this._updateProjects(projects,projectIndex,newProject)
    console.log('APP更新项目 After',projects)
  }
  handleDeleteProject(projectIndex){
    const projects=this.state.projects
    console.log('APP删除项目',projects,projectIndex)
    let deleteProject=projects.splice(projectIndex,1)
    
    this._updateProjects(projects)
    console.log('APP删除项目 After',projects)
  }
  render() {
    return (
        <div>
          <Layout.Row gutter="20">
            <Layout.Col span="24">
              <div id="top-bar">
                <div id="logo">
                <Logo/>
                </div>
              </div>
            </Layout.Col>
          </Layout.Row>
          <Layout.Row gutter="20" style={{paddingTop:'48px'}}>
            <Layout.Col span="8">
              <div id="left-menu" className="grid-content bg-purple">
                <ProjectList 
                projects={this.state.projects}
                onUpdateProject={this.handleUpdateProject.bind(this)}
                onDeleteProject={this.handleDeleteProject.bind(this)}
                />
              </div>
            </Layout.Col>
            <Layout.Col span="16">
              <div id="main" className="grid-content bg-purple-light">
                {this.state.projects.map((project,i)=>
                <TaskList key={i} index={i} pid={project.pid} name={project.name} 
                  tasks={project.tasks}
                  onAddTask={this.handleAddTask.bind(this)}
                  onDeleteTask={this.handleDeleteTask.bind(this)}
                  onFinishTask={this.handleFinishTask.bind(this)}
                  onUpdateTask={this.handleUpdateTask.bind(this)}
                />)
                }
              </div>
            </Layout.Col>
          </Layout.Row>
        </div>
      
    )
  }
}

export default App;
