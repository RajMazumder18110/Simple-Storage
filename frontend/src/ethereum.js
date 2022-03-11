import { ethers } from 'ethers'
import SimpleStorage from './contracts/SimpleStorage.json';

export const initBlockchain = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            if(window.ethereum){
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    SimpleStorage.networks[window.ethereum.networkVersion].address,
                    SimpleStorage.abi,
                    signer
                )

                resolve({ account, provider, contract })
            }
            resolve({
                account: undefined,
                provider: undefined,
                contract: undefined
            })
        })
    })
}