import React, {useEffect, useState} from 'react';
import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const {contract, walletAddress, setShowAlert} = useGlobalContext();
  const [playerName, setPlayerName] = useState('');

  const navigate = useNavigate();

  const handleClick = async () =>{
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if(!playerExists){
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being submitted!`
        })

      }
    } catch (error) {

      setShowAlert({
        status: true,
        type: 'failure',
        message: error.message
      })
    }
  }

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      console.log({playerExists, playerTokenExists});

      if (playerExists && playerTokenExists) navigate('/create-battle');
    };

    if (contract) createPlayerToken();
  }, [contract]);



  return (
    <div className='flex flex-col'>
        <CustomInput 
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
        />
        <CustomButton 
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Mintavax <br/> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br/> the ultimate Web3 Battle Game</>
);