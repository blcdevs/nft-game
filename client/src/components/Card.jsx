import React from 'react';
import Till from 'react-parallax-tilt';
import styles from '../styles';
import { AllHTMLAttributes } from 'react';
import { allCards } from '../assets';
 

const generateRandomCardImage = () => allCards[Math.floor(Math.random() * (allCards.length -1))];

const img1 = generateRandomCardImage();
const img2 = generateRandomCardImage();


const Card = (card, title, restStyles, cardRef, playerTwo) => {
  return (
    <div className={`${styles.cardContainer} ${restStyles}`} >
        <img src={playerTwo ? img2 : img1 } alt="Card" className={styles.cardImg}/>
    </div>
  )
}

export default Card