import React, { useState } from 'react';
import '../styles/Checkout.css'

function Checkout(){
     
    const [cardNum, setCardNum] = useState('');
    const [date, setDate] = useState('');
    const [cvc, setCVC] = useState('');
    const [expire, setExpire] = useState('')
    const [save, setSave] = useState([]);

    function confirm(){
    if(!cardNum || !date || !cvc || !expire){
        alert("please fill out all inputs")
    }else if(!/[0-9]/g.test(cvc) || /[a-z]/gi.test(cvc) || !/[0-9]/g.test(date) || !/[0-9]/g.test(expire)){
        alert('please fill out the inputs correctly thx')
    }else{
    setSave(prev => [...prev, {num: cardNum, date: date, expire: expire, cvc: cvc}])
    }    
}
 
    return(
        <>
        { save.length <= 0 &&
        <div className='card-wrapper'>
        <div className='card-cont'>
        <h1>Please Enter Your Credit Card Information To Proceed!</h1>
        <p id='warning'>DO NOT ENTER YOUR REAL CREDIT CARD INFO!!!</p>
        <input 
        placeholder='Card Number'
        value={cardNum}
        onChange={((e) => setCardNum(e.target.value))}
        />

       <input 
       placeholder='YY/MM (Date)'
       value={date}
       onChange={((e) => setDate(e.target.value))}
       />

       <input
       placeholder='YY/MM (Expire Date)'
       value={expire}
       onChange={((e) => setExpire(e.target.value))}
       />

       <input 
       placeholder='CVC'
       value={cvc}
       onChange={((e) => setCVC(e.target.value))}
       />
       
       <button onClick={confirm}>Confirm</button>
       </div>
       </div>
       }

       {save.length > 0 &&
        <div className='order-checkout'>
            <h1>Order incoming!</h1>
        </div>
       }
        </>
    )


}


export default Checkout;