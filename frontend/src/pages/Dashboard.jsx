import React, { useState } from 'react';
import '../scss/pages/Dashboard.scss';

const Dashboard = () => {
    return(
    <div className='dashboard'>
        <div className="container">
            <div className="heading">
                <h1>Simple Storage</h1>
            </div>
            <div className="accountDetails">
                <p className="wallet">X0HC-XXX-GUIF</p>
                <p className="balance">10.35 ETH</p>
            </div>
            <div className="storeValue">
                <h1 className='value'>10000</h1>
            </div>
            <form>
                <input type="number" name="number" id="numberValue" placeholder='Enter any number' />
                <button type="submit">Update</button>
            </form>
        </div>
    </div>    
)}

export default Dashboard;