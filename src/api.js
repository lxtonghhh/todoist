const LOCAL_HOST="http://127.0.0.1:80/"
const ALIYUN_HOST="http://112.74.160.190:8002/"
const HOST_IN_USE=ALIYUN_HOST
const initHeaders = new Headers()
initHeaders.append('Accept', 'application/json, text/plain, */*')
initHeaders.append('Content-Type', 'application/json;charset=UTF-8')


export const postAddTask = (uid,pid,content,ddl) => {
	let url=HOST_IN_USE+'api/v1/task/add'
	let data = {uid,pid,content,ddl}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const postAddProject = (uid,name) => {
	let url=HOST_IN_USE+'api/v1/project/add'
	let data = {uid,name}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const postUpdateTask = (uid,pid,tid,content,ddl,level) => {
	let url=HOST_IN_USE+'api/v1/task/update'
	let data = {uid,pid,tid,content,ddl,level,status:'doing'}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const postUpdateProject = (uid,pid,name) => {
	let url=HOST_IN_USE+'api/v1/project/update'
	let data = {uid,pid,name,status:'doing'}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const postDeleteTask = (uid,pid,tid) => {
	let url=HOST_IN_USE+'api/v1/task/update'
	let data = {uid,pid,tid,status:'abort'}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const postFinishTask = (uid,pid,tid) => {
	let url=HOST_IN_USE+'api/v1/task/update'
	let data = {uid,pid,tid,status:'finish'}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const postDeleteProject = (uid,pid) => {
	let url=HOST_IN_USE+'api/v1/project/update'
	let data = {uid,pid,status:'abort'}
	let body = JSON.stringify(data, null, 2)
	const init = {
	  method: 'POST',
	  headers: initHeaders,
	  mode: 'cors',
	  body
	}
	return fetch(url,init)
}
export const getAllTasks = () => {
	let url=HOST_IN_USE+'api/v1/task/my'
	const init = {
	  method: 'GET',
	  headers: initHeaders,
	  mode: 'cors'
	}
	return fetch(url,init)
}
export const parseProjects=(projects)=>{
	const parsedProjects=[]
	for(let project of projects){
		let parsedTasks=[]
		for(let task of project.tasks){
			parsedTasks.push({...task,ddl:new Date(task.ddl)})
		}
		parsedProjects.push({...project,tasks:parsedTasks})
	}
	return parsedProjects
}
