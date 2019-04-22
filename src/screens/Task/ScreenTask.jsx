import React, { Component } from 'react';
import './ScreenTask.css';
import 'element-theme-default'
import '../../index.css';
import {Layout,Loading} from 'element-react'
import UILogo from '../../components/UI/Logo'
import ProjectList from '../../components/Project/List'
import TaskList from '../../components/Task/List'
import {getAllTasks,parseProjects} from '../../api'
import _ from 'lodash'
function Header(props){
  return (
    <div id="top-bar">
      <div id="logo">
        <UILogo/>
      </div>
    </div>
  )
}
class ScreenTask extends Component {
  constructor(){
    super()
    this.state={
      isLoading:false,
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
  handleChooseProject(projectIndex){
    console.log('APP切换项目',projectIndex)
    this.setState({activeIndex:projectIndex})
  }
  _load_project(activeIndex){
    console.log('_load_project',activeIndex)
    const projects=this.state.projects
    if(this.state.isLoading||projects.length===0){
      return null
    }else{
      let activeProject
      if(activeIndex>=0){
        //真实项目
        activeProject= projects[activeIndex]
        if (!activeProject){
          activeProject=projects[0]
        }
        if(activeProject){
          let taskList= <TaskList index={this.state.activeIndex} pid={activeProject.pid} name={activeProject.name} 
          tasks={activeProject.tasks} 
          />
          return taskList
        }else{
          return null
        }
      }else{
        //视图项目 -1今日任务视图 -2所有任务视图
        return null
      }
    }
  }
  render() {
    let taskList=this._load_project(this.state.activeIndex)
    return (
      <div>
        {this.state.isLoading&&<Loading fullscreen={true} />}
        <Layout.Row gutter="20">
          <Layout.Col span="24">
            <Header />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20" style={{paddingTop:'48px'}}>
          <Layout.Col span="8">
            <div id="left-menu" className="grid-content bg-purple">
              <ProjectList 
              projects={this.state.projects}
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
export default ScreenTask
