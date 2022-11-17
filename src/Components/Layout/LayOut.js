import React from 'react'
import TopNar from '../TopNav/TopNar'
import SideBar from '../SideBar/SideBar'
import Router from '../../Routes/Router'


const LayOut = () => {
  return (
    <div className="layout">
     <SideBar />
    <div className="main__layout">
      <TopNar />      
      <div className="content">
        <Router />
      </div>
    </div>
  </div>
  )
}

export default LayOut

