import React, {useState} from 'react'
import heroesLogo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';
import './style.css'


export default function CreateONG(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUF] = useState('')

    const history = useHistory();

    async function handleRegisterONG(e){
        e.preventDefault();
        const data = {name, email, whatsapp, city, uf}

        try{
            const response = await api.post('create_ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/');
        } catch {
            alert(`Não é possível Cadastrar a ONG`)
        }
        
    }

    return (
        <div id="divCentral">
            <div id="divEsquerda">
                <img src={heroesLogo} alt="logo of Be The Hero"/>

                <div id="divContent">
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                    
                    <Link to="/">
                        <FiArrowLeft/>
                        Voltar para o Login
                    </Link>
                </div>
            </div>
            <div id="divDireita">
                <form id="divForm" onSubmit={handleRegisterONG}>
                    <input className="caixaDeTexto" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nome da ONG"></input>
                    <input className="caixaDeTexto" value={email} onChange={e => setEmail(e.target.value)} type="email" id="inputEmail" placeholder="Email"></input>
                    <input className="caixaDeTexto" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} type="text" placeholder="Whatsapp"></input>
                    <input className="caixaDeTexto" value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="Cidade"></input>
                    <input className="caixaDeTexto" value={uf} onChange={e => setUF(e.target.value)} type="text" placeholder="UF" maxLength="2"></input>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}