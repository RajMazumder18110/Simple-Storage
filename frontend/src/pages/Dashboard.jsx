import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { initBlockchain } from '../ethereum';
import '../scss/pages/Dashboard.scss';


const Dashboard = () => {
    const [minning , setMinning] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [balance, setBalance] = useState('');
    const [contractProvider, setContractProvider] = useState(null);
    const [storageContract, setStorageContract] = useState(null);
    const [storeValue, setStoreValue] = useState(null);

    useEffect(() => {
        const init = async () => {
            const { account, provider, contract } = await initBlockchain();
            if(account !== undefined){
                setWalletAddress(account[0]);
                getBalance(provider, account[0]);
                getValue(contract);
                setContractProvider(provider);
                setStorageContract(contract);
                setWalletConnected(true);
            }
        }
        init();
    })

    window.ethereum.on('accountsChanged', async (account) => {
        setWalletAddress(account[0]);
        getBalance(contractProvider, account[0]);
    })

    const getBalance = async (provider, address) => {
        let bal = await provider.getBalance(address);
        bal = ethers.utils.formatEther(bal);
        setBalance(bal);
    }

    const getValue = async (contract) => {
        let val = await contract.getStoreValue();
        setStoreValue(val.toNumber());
    }

    const connectWallet = async (e) => {
        e.preventDefault();
        if(walletAddress){
            setWalletConnected(true);
        }else{
            alert('Please install metamask :(');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = e.target.number.value;
        e.target.number.value = '';
        setMinning(true);
        try{
            const tx = await storageContract.setStoreValue(data);
            await tx.wait();
            getBalance(contractProvider, walletAddress);
            getValue(storageContract);
            setMinning(false);
        }catch(e){
            setMinning(false);
        }
    }

    if(walletConnected){
        return(
            <div className='dashboard'>
                <div className="container">
                    <div className="heading">
                        <h1>Simple Storage</h1>
                    </div>
                    <div className="accountDetails">
                        <p className="wallet">{ walletAddress ? walletAddress.replace(walletAddress.substring(5, 37), '-xxx-') : '' }</p>
                        <p className="balance">{ balance } ETH</p>
                    </div>
                    <div className="storeValue">
                        <h1 className='value'>{ storeValue }</h1>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="number" name="number" id="numberValue" placeholder='Enter any number' />
                        { minning ? 
                          <button type="submit" disabled>Minning...</button> :
                          <button type="submit">Update</button>
                        }
                    </form>
                </div>
            </div>    
        )
    }else {
        return(
            <div className='dashboard'>
                <div className="container div">
                    <div className="heading">
                        <h1>Simple Storage</h1>
                    </div>
                    <form  onSubmit={(e) => connectWallet(e)}>
                        <button type="submit">Connect to metamask</button>
                    </form>
                </div>
            </div>    
        )
    }
}

export default Dashboard;