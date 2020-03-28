import React, { useState } from 'react';
import './style.css';
import heroesLogo from '../../assets/logo.svg'
import heroesTogether from '../../assets/heroes.png'
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

export default function Logon(){
    const [ongs_id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('ong_login', {ongs_id});
            localStorage.setItem('ongId', ongs_id);
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile');
        } catch (err) {
            alert('Falha no Login');
        }
    }

    return(
        <div id="centralDiv">
            <img id="logoBeTheHero" src={heroesLogo} alt="Be the Hero Logo"></img>
            
            <form id="divLogon" onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>
                <input type="text" maxLength="8" value={ongs_id} onChange={e => setID(e.target.value)}placeholder="Seu ID"></input>
                <button type="submit">Entrar</button>
                <Link to="/register">
                    <FiLogIn size={15}/> Não tenho cadastro
                </Link>
            </form>
            <img id="imgHeroesTogether" src={heroesTogether} alt="Heroes Together"></img>
        </div>
    )
}