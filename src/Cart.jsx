import React, { useRef, useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CONTRACT_ADDRESS, abi } from './constants'

import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

const Cart = ({ cart, buyItems }) => {
  const [walletConnected, setWalletConnected] = useState(false)

  const web3ModalRef = useRef()

  const getProviderOrSigner = async (needSigner = false) => {
    // connect to metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect()

    const web3Provider = new ethers.providers.Web3Provider(provider)
    // If user is not connected to the Sepolia network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork()
    if (chainId !== 11155111) {
      window.alert('Change the network to Sepolia')
      throw new Error('Change network to Sepolia')
    }

    if (needSigner) {
      const signer = web3Provider.getSigner()
      return signer
    }
    return web3Provider
  }

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner()
      setWalletConnected(true)

      console.log('Wallet Connected Successfuly!')
      // checkIfAddressInWhitelist()
      // getNumberOfWhitelisted()
    } catch (err) {
      console.error(err)
    }
  }

  const payEth = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true)
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const flowersContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

      const amountToSend = ethers.utils.parseEther('0.01') // Convert 0.01 ETH to Wei

      const tx = await flowersContract.sendEth({ value: amountToSend })
      const receipt = await tx.wait()

      if (receipt.status === 1) {
        console.log('Successfull!!')
        return true
      } else {
        console.log('error')
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: 'sepolia',
        providerOptions: {},
        disableInjectedProvider: false,
      })
      connectWallet()
    }
  }, [walletConnected])

  const navigate = useNavigate()
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          <h2>Your Cart</h2>
          <div className="my_cart_img">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.flowerUrl} alt="Flower" />
                <span>Price: ${item.price}</span>
              </div>
            ))}
          </div>
          <p>Total Price in ETH: 0.01</p>
          <button
            onClick={async () => {
              try {
                console.log('waiting for the transaction.......')
                const isTransactionSuccessful = await payEth()
                if (isTransactionSuccessful) {
                  buyItems()
                  alert('Payment Successful!')
                  navigate('/')
                } else {
                  alert('Payment Failed. Check Console for more details.')
                }
              } catch (err) {
                console.log(err)
                alert('Payment Failed. Check console for more details.')
              }
            }}
          >
            Buy
          </button>
        </>
      )}
    </div>
  )
}

export default Cart
