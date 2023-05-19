import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import styles from '../styles';
import { useGlobalContext } from '../context';


import { PageHOC, CustomButton, CustomInput, GameLoad } from '../components';
import { gameRules } from '../assets';

const CreateBattle = () => {
  const {contract, battleName, setBattleName, gameData} = useGlobalContext()
  const [waitBattle, setWaitBattle] = useState(false)
  const navigate = useNavigate();


  useEffect(() =>{
    if(gameData?.activeBattle?.battleStatus === 0);
    setWaitBattle(true);
  }, [gameData])

  const handleClick = async() =>{
    if(!battleName || !battleName.trim()) return null;

    try {
        await contract.createBattle(battleName);

        setWaitBattle(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <>

   {waitBattle && <GameLoad/> }

    <div className='flex flex-col md-5'>
      <CustomInput 
        label="Battle"
        placeholder="Enter battle name"
        value={battleName}
        handleValueChange={setBattleName}
      />

      <CustomButton 
        title="Create Battle"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>

    <p className={styles.infoText} onClick={() => navigate('/join-battle')}>Or, join an already existing battle</p>
   </>
  )
};

export default PageHOC(
  CreateBattle,
  <>Create  <br/> a new battle</>,
  <>Create your battle and wait for other players to join you</>
);