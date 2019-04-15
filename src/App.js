import React, { Component } from 'react';
import './App.css';
import TaskList from './containers/TaskList'
import ViewTaskList from './containers/ViewTaskList'
import ProjectList from './containers/ProjectList'
import 'element-theme-default'
import './index.css';
import {Layout,Loading} from 'element-react'
import Logo from './components/Logo'
import {postAddTask,postAddProject,getAllTasks,postUpdateTask,postUpdateProject,postDeleteProject,
postDeleteTask,postFinishTask,parseProjects} from './api'
import _ from 'lodash'
class App extends Component {
  constructor(){
    super()
    this.state={
      //projectIndex 0表示收件箱 -1表示今天
      /*
      projects:[
        {
          pid:'0',name:"收件箱",
          tasks:[//tid:"0"
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
      */
      isLoading:true,
      projects:[],
      activeIndex:0
    }

  }
  componentWillMount(){
    getAllTasks()
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Fetch',data)
      let parsedProjects=parseProjects(data.data.content)
      console.log('parsedProjects',parsedProjects)
      this.setState({projects:parsedProjects,isLoading:false})
    })
    .catch(err=>{
      console.log('错误', err)
    })
  }
  _load_project(activeIndex){
    console.log('_load_project',activeIndex)
    const projects=this.state.projects
    if (projects.length===0){
      //尚未加载
      return
    }
    let activeProject
    if(activeIndex===-1){
      //今日任务
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
    }
    else if(activeIndex===-2){
      //所有任务
      let newTasks=[]
      for (let [projectIndex, project] of projects.entries()){
        let partTasks=[]
        for(let [taskIndex, task] of project.tasks.entries()){
          partTasks.push({...task,taskIndex,projectIndex})
        }
        newTasks=_.concat(newTasks,partTasks)
      }
      activeProject={pid:'-2',name:"所有任务",tasks:newTasks}
    }
    else{
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
    postAddTask('admin',this.state.projects[projectIndex].pid,task.content,task.ddl.toLocaleDateString())
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res AddTask',data)
      if(data.sc===200){
        const projects=this.state.projects
        console.log('APP添加任务',task,projectIndex,projects)
        task.tid=data.data.tid
        task.uid=data.data.uid
        task.pid=data.data.pid
        task.level=data.data.level
        task.status=data.data.status
        const tasks=this.state.projects[projectIndex].tasks
        let newTasks=_.concat(tasks,task)
        this._updateTasks(projects,projectIndex,newTasks)
        console.log('APP添加任务 After',projects)
      }else{
        return 
      }
    })
    .catch(err=>{console.log('错误', err)})
  }
  handleFinishTask(taskIndex,projectIndex){
    const task=this.state.projects[projectIndex].tasks[taskIndex]
    postFinishTask('admin',task.pid,task.tid)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res UpdateTask',data)
      if(data.sc===200){
        const projects=this.state.projects
        console.log('APP完成任务',taskIndex,projectIndex,projects)
        const tasks=this.state.projects[projectIndex].tasks
        let finishTask=tasks.splice(taskIndex,1)
        let newTasks=tasks

        this._updateTasks(projects,projectIndex,newTasks)
        console.log('APP完成任务 After',projects)
      }else{
        return 
      }
    })
    .catch(err=>{console.log('错误', err)})
  }
  handleDeleteTask(taskIndex,projectIndex){
    const task=this.state.projects[projectIndex].tasks[taskIndex]
    postDeleteTask('admin',task.pid,task.tid)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res UpdateTask',data)
      if(data.sc===200){
        const projects=this.state.projects
        console.log('APP删除任务',taskIndex,projectIndex,projects)
        const tasks=this.state.projects[projectIndex].tasks
        let deleteTask=tasks.splice(taskIndex,1)
        let newTasks=tasks

        this._updateTasks(projects,projectIndex,newTasks)
        console.log('APP删除任务 After',projects)
      }else{
        return 
      }
    })
    .catch(err=>{console.log('错误', err)})
  }
  handleUpdateTask(task,taskIndex,projectIndex){
    postUpdateTask(task.uid,this.state.projects[projectIndex].pid,task.tid,task.content,task.ddl.toLocaleDateString(),task.level)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res UpdateTask',data)
      if(data.sc===200){
        const projects=this.state.projects
        console.log('APP更新任务',taskIndex,projectIndex,projects)
        const tasks=this.state.projects[projectIndex].tasks
        tasks[taskIndex]=task
        let newTasks=tasks

        this._updateTasks(projects,projectIndex,newTasks)
        console.log('APP更新任务 After',projects)
      }else{
        return 
      }
    })
    .catch(err=>{console.log('错误', err)})
  }
  //Project
  handleAddProject(project){
    postAddProject('admin',project.name)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res AddProject',data)
      if(data.sc===200){
        const projects=this.state.projects
        console.log('APP添加项目',project,projects)
        project.pid=data.data.pid
        project.tasks=[]
        projects.push(project)
        this._updateProjects(projects)
        console.log('APP添加项目 After',projects)
      }else{
        return 
      }
      
    })
    .catch(err=>{console.log('错误', err)})
    
  }
  handleUpdateProject(project,projectIndex){
    const projects=this.state.projects
    console.log('APP更新项目',projects,project,projectIndex)
    let newProject=project
    
    this._updateProjects(projects,projectIndex,newProject)
    console.log('APP更新项目 After',projects)

    postUpdateProject('admin',project.pid,project.name)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res UpdateProject',data)
      if(data.sc===200){
        const projects=this.state.projects
        console.log('APP更新项目',projects,project,projectIndex)
        let newProject=project

        this._updateProjects(projects,projectIndex,newProject)
        console.log('APP更新项目 After',projects)
      }else{
        return 
      }
    })
    .catch(err=>{console.log('错误', err)})
  }
  handleDeleteProject(projectIndex){
    const project=this.state.projects[projectIndex]
    if(projectIndex===0||project.pid==='0'){
      //收件箱无法被删除
      return 
    }
    postDeleteProject('admin',project.pid)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log('Res UpdateTask',data)
      if(data.sc===200){
        const projects=this.state.projects
        if(projectIndex===this.state.activeIndex){
          this.setState({activeIndex:0})
        }
        console.log('APP删除项目',projects,projectIndex)
        let deleteProject=projects.splice(projectIndex,1)

        this._updateProjects(projects)
        console.log('APP删除项目 After',projects)
      }else{
        return 
      }
    })
    .catch(err=>{console.log('错误', err)})

  }
  handleChooseProject(projectIndex){
    console.log('APP切换项目',projectIndex)
    this.setState({activeIndex:projectIndex})
  }
  render() {
    let taskList
    if(this.state.isLoading){
      taskList=null
    }else{
      let activeProject=this._load_project(this.state.activeIndex)
      if(this.state.activeIndex<0){//-1今日任务视图 -2所有任务视图
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
    }
    
    return (
        <div>
          {this.state.isLoading&&<Loading fullscreen={true} />}
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
