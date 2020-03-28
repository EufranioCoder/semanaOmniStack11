import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import heroesLogo from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';


export default function NewIncident(){
    const history = useHistory()
    const [title, setTitle] = useState(); 
    const [description, setDescription] = useState();
    const [value, setValue] = useState();

    async function createIncident(e) {
        e.preventDefault();
        const data = {title, description, value}

        try{
            await api.post('/create_incidents', data, {headers: { cod: localStorage.getItem('ongId') } })
            alert('Incidente Criado com Sucesso')
            history.push('/profile')
        } catch {
            alert('Não é possível Cadastrar caso Agora')
        }
    }

    return(
        <div id="divCentral">
            <div id="divEsquerda">
                <img src={heroesLogo} alt="logo of Be The Hero"/>

                <div id="divContent">
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>
                    
                    <Link to="/profile">
                        <FiArrowLeft/>
                        Voltar
                    </Link>
                </div>
            </div>
            <div id="divDireita">
                <form id="divForm" onSubmit={createIncident}>
                    <input className="caixaDeTexto" value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Título do Caso"></input>
                    <textarea className="caixaDeTexto" value={description} onChange={e => setDescription(e.target.value)} type="textArea" placeholder="Descrição"></textarea>
                    <input className="caixaDeTexto" value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Valor em AOA"></input>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}