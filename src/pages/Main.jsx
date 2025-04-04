import { useState } from 'react'
import { Button } from '@mui/material'

const Main = ()=>{
    return (
        <div id='main'>
          <div className='typewriter'>
            <h1 className='main-page-intro'>Expense Tracking Made Easy .</h1>
          </div>
          
          <div id="main-page-buttons">
            <Button  variant="outlined" color="primary" href="/about">Learn more</Button>
            <Button variant="contained" color="primary" href="/track">Start</Button>
          </div>
    
        </div>
    )
}

export default Main