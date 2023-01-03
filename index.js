require('dotenv').config()

const Web3 = require('web3')
const web3 = new Web3(process.env.INFURA_URL)

async function getBalance(wallet) {

    const balance = await web3.eth.getBalance(wallet)
    console.log("Seu saldo é de '" + parseFloat(web3.utils.fromWei(balance)).toFixed(2) + "' ETH")
}

getBalance(process.env.WALLET_ADDRESS)



async function transfer(to, value) {

    const nonce = await web3.eth.getTransactionCount(process.env.WALLET_ADDRESS, 'latest')

    const transaction = {
        to,
        value,
        gas: 21000,
        nonce
    }

    const signedTx = await web3.eth.accounts.signTransaction(transaction, process.env.PRIVATE_KEY)

    const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    console.log(tx.transactionHash)

}

transfer(process.env.WALLET_RECEIVE, web3.utils.toWei('0.0001', 'ether'))