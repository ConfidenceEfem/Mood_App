import React from 'react'
import styled from "styled-components"
import { ethers } from 'ethers'
import MoodContract from "./Mood"


const MoodScreen = () => {


  const contractAddress = "0x077D1033cB5e9B313453b4c1cAbf54f9B11a8884"

  const [mood, setMood] = React.useState("")
  const [mainMood, setMainMood] = React.useState("")

const openWallet = async () => {
try {
  if(window.ethereum){
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    const account = accounts[0]
    
  }else{
    alert("You don't have a metamask account")
  }
} catch (error) {
  alert("Error Caught")
}
}



  const setMyMood = async () => {
    if(window.ethereum){
      
      const providers = new ethers.providers.Web3Provider(window.ethereum, "ropsten")
      
      const signerD = providers.getSigner()
      console.log(signerD)
      const moodContract = new ethers.Contract(
        contractAddress,MoodContract,signerD
      )
      
      const moodPromise = await moodContract.writeMood(mood)
     
      console.log(moodPromise)
      
    }else{
      alert("You don't have a metamask account")
    }
  }

  const getMyMood = async () => {
    if(window.ethereum){
      const providers = new ethers.providers.Web3Provider(window.ethereum, "ropsten")
      const signerD =  providers.getSigner()
      const moodContract = new ethers.Contract(contractAddress,MoodContract,signerD)
      let mymood = await moodContract.getMood()
      console.log(mymood)
      setMainMood(mymood)
      // const theMood = await getCurrentMood

      // console.log(theMood)
    }else{
      alert("You don't have a metamask account")
    }
  }


React.useEffect(()=>{
  openWallet()
  getMyMood()
},[mood])

  return (
    <Container>
        <Title>My Mood App</Title>

        <Mood>
       {mainMood}
        </Mood>
        <InputMood>
        <Input placeholder="I just want to own the earth"
        value={mood}
        onChange={(e)=>{
          setMood(e.target.value)
        }}/>
        <Button onClick={()=>{
          setMyMood()
        }}>Update Mood</Button>
        <Button onClick={()=>{
          getMyMood()
        }}>Get Mood</Button>
        </InputMood>
    </Container>
  )
}

export default MoodScreen


const Button = styled.div`
margin-top: 20px;
padding: 10px 18px;
background-color: white;
color: #222336;
font-family: work sans;
font-weight: 500;
border-radius: 4px;
transition:all 660ms;
:hover{
  transform: scale(1.02);
  cursor: pointer;
}
`
const Input = styled.textarea`
width: 400px;
font-family:work sans;
padding: 10px;
color: black;
height: 100px;
::placeholder{
  font-family:work sans;
}
`
const InputMood = styled.div`
margin-top: 100px;
display:flex;
flex-direction:column;
align-items: center;
`
const Mood = styled.div`
width: 50%;
display:flex;
flex-wrap: wrap;
text-align: left;
font-size: 15px;
font-weight: 500;
font-family: work sans;
margin-top: 60px;
line-height: 25px;
`

const Title = styled.div`
font-size: 30px;
color: white;
font-weight: 700;
font-family: work sans;
margin-top: 40px;
text-transform: uppercase;
`
const Container = styled.div`
width: 100%;
height: 100vh;
display:flex;
align-items: center;
background-color: #222336;
font-family: poppins;
color: white;
flex-direction: column;
`