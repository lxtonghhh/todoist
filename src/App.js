import React, { Component } from 'react';
import './App.css';
import TaskList from './containers/TaskList'
import ViewTaskList from './containers/ViewTaskList'
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
      //projectIndex 0表示收件箱 -1表示今天
      projects:[
        {
          pid:'0',name:"收件箱",
          tasks:[
            {content:'快速开始项目',ddl:new Date()},//why new Date()得到Date对象 Date()只得到相应的string
            {content:'收件箱1',ddl:new Date()},
          ]
        },
        {
          pid:'1',name:"欢迎",
          tasks:[
            {content:'请任意添加欢迎项目',ddl:new Date()},//why new Date()得到Date对象 Date()只得到相应的string
            {content:'欢迎1',ddl:new Date()},
          ]
        },
        {
          pid:'2',name:"测试",
          tasks:[
            {content:'请任意添加测试项目',ddl:new Date()},//why new Date()得到Date对象 Date()只得到相应的string
            {content:'测试1',ddl:new Date()},
          ]
        }
      ],
      activeIndex:0
    }
  }
  _load_project(activeIndex){
    console.log('_load_project',activeIndex)
    const projects=this.state.projects
    let activeProject
    if(activeIndex===-1){
      let today=new Date()
      let newTasks=[]
      for (let [projectIndex, project] of projects.entries()){
        let partTasks=[]
        for(let [taskIndex, task] of project.tasks.entries()){
          if(today.toLocaleDateString()===task.ddl.toLocaleDateString()){
            partTasks.push({...task,taskIndex,projectIndex})
          } 
        }
        newTasks=_.concat(newTasks,partTasks)
      }
      activeProject={pid:'-1',name:"今日任务",tasks:newTasks}
    }else{
      activeProject= projects[activeIndex]
      if (!activeProject){
        activeProject=projects[0]
      }
    }
    console.log('_load_project After',activeProject)
    return activeProject
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
  //Task
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
  //Project
  handleAddProject(project){
    const projects=this.state.projects
    console.log('APP添加项目',project,projects)
    projects.push(project)

    this._updateProjects(projects)
    console.log('APP添加项目 After',projects)
  }
  handleUpdateProject(project,projectIndex){
    const projects=this.state.projects
    console.log('APP更新项目',projects,project,projectIndex)
    let newProject=project
    
    this._updateProjects(projects,projectIndex,newProject)
    console.log('APP更新项目 After',projects)
  }
  handleDeleteProject(projectIndex){
    if(projectIndex===0){
      //收件箱无法被删除
      return 
    }
    if(projectIndex===this.state.activeIndex){
      this.setState({activeIndex:0})
    }
    const projects=this.state.projects
    console.log('APP删除项目',projects,projectIndex)
    let deleteProject=projects.splice(projectIndex,1)
    
    this._updateProjects(projects)
    console.log('APP删除项目 After',projects)
  }
  handleChooseProject(projectIndex){
    console.log('APP切换项目',projectIndex)
    this.setState({activeIndex:projectIndex})
  }
  render() {
    let activeProject=this._load_project(this.state.activeIndex)
    let taskList
    if(this.state.activeIndex===-1){
      taskList= <ViewTaskList pid={activeProject.pid} name={activeProject.name} 
        tasks={activeProject.tasks}
        onAddTask={this.handleAddTask.bind(this)}
        onDeleteTask={this.handleDeleteTask.bind(this)}
        onFinishTask={this.handleFinishTask.bind(this)}
        onUpdateTask={this.handleUpdateTask.bind(this)}
      />
    }else{
      taskList= <TaskList index={this.state.activeIndex} pid={activeProject.pid} name={activeProject.name} 
        tasks={activeProject.tasks}
        onAddTask={this.handleAddTask.bind(this)}
        onDeleteTask={this.handleDeleteTask.bind(this)}
        onFinishTask={this.handleFinishTask.bind(this)}
        onUpdateTask={this.handleUpdateTask.bind(this)}
      />
    }
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
                onAddProject={this.handleAddProject.bind(this)}
                onUpdateProject={this.handleUpdateProject.bind(this)}
                onDeleteProject={this.handleDeleteProject.bind(this)}
                onChooseProject={this.handleChooseProject.bind(this)}
                />
              </div>
            </Layout.Col>
            <Layout.Col span="16">
              <div id="main" className="grid-content bg-purple-light">
                {taskList}
              </div>
            </Layout.Col>
          </Layout.Row>
        </div>
      
    )
  }
}

export default App;
