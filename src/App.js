import React, { Component } from 'react';
import './App.css';
import TaskList from './containers/TaskList'
import 'element-theme-default'
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

  handleAddTask(task,projectIndex){
    const projects=this.state.projects
    console.log('APP添加任务',task,projectIndex,projects)
    const tasks=this.state.projects[projectIndex].tasks
    let newTasks=_.concat(tasks,task)
    projects[projectIndex].tasks=newTasks
    this.setState({projects:projects})
    console.log('APP添加任务 After',projects)
  }
  render() {
    return (
      <div className="App">
        {this.state.projects.map((project,i)=>
          <TaskList key={i} index={i} pid={project.pid} desc={project.desc} 
            tasks={project.tasks}
            onAddTask={this.handleAddTask.bind(this)}
          />)
        }
      </div>
    )
  }
}

export default App;
