import React, { Component } from 'react';
import './App.css';
import TaskList from './containers/TaskList'

class App extends Component {
  constructor(){
    super()
    this.state={
      projects:[
        {
          pid:'1',desc:"测试项目 请任意添加任务",
          tasks:[
            {content:'1',ddl:Date()},
            {content:'2',ddl:Date()},
          ]
        }
      ]
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.projects.map((project,i)=>
          <TaskList key={i} index={i} pid={project.pid} desc={project.desc} 
            tasks={project.tasks} 
          />)
        }
      </div>
    )
  }
}

export default App;
