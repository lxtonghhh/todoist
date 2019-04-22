import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Card,Layout} from 'element-react'
import _ from 'lodash'
export default class UIShowCard extends Component{
	static propTypes={
		onChange:PropTypes.func,
		ddl:PropTypes.instanceOf(Date),
		content:PropTypes.string
	}
	constructor(){
		super()
		this.state={
			value:null
		}
	}
	render() {
	  return (
	    <Layout.Row>
	      <Layout.Col span={ 8 } offset={ 0 }>
	        <Card bodyStyle={{ padding: 0 }}>
	          <img src={this.props.imgSrc} className="image" />
	          <div style={{ padding: 14 }}>
	            <span>好吃的汉堡</span>
	            <div className="bottom clearfix">
	              <time className="time">2016-10-21 16:19</time>
	              <Button type="text" className="button">操作按钮</Button>
	            </div>
	          </div>
	        </Card>
	      </Layout.Col>
	      <Layout.Col span={ 8 } offset={ 2 }>
	        <Card bodyStyle={{ padding: 0 }}>
	          <img src={this.props.imgSrc} className="image" />
	          <div style={{ padding: 14 }}>
	            <span>好吃的汉堡</span>
	            <div className="bottom clearfix">
	              <time className="time">2016-10-21 16:19</time>
	              <Button type="text" className="button">操作按钮</Button>
	            </div>
	          </div>
	        </Card>
	      </Layout.Col>
	    </Layout.Row>
	  )
	}

}