import React, { useEffect, useState } from 'react';
import heroesLogo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './style.css';
import api from '../../services/api'


export default function Profile(){
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('/list_especific_incidents_of_ong', {
            headers: {
                cod: localStorage.getItem('ongId')
            },
        }).then(response => {
            setIncidents(response.data)
        })
    }, [localStorage.getItem('ongId')])

    async function deleteIncident(id) {
        try{
            await api.delete(`/delete_incident/${id}`, {headers: {cod: localStorage.getItem('ongId')}});
        } catch {
            alert('Não possível deletar o Incidente sinto muito')
        }
        setIncidents(incidents.filter(incident => incident.id != id));
    }

    function logout(){
        localStorage.removeItem('ongId')
        localStorage.removeItem('ongName')
        history.push('/');
    }

    return(
        <div className="profile-conteiner">
            <header>
                <img src={heroesLogo} alt="Be the Hero"/>
                <span>Bem vinda, {localStorage.getItem('ongName')}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button type="button" onClick={logout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos da ONG</h1>
            <ul>
                {
                incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>

                            <strong>Valor</strong>
                            <p>{incident.value.toLocaleString('pt-aoa', {style: 'currency', currency: 'AOA'})}</p>

                            <button type="button">
                                <FiTrash2 size={20} color="a8a8b3" onClick={() => deleteIncident(incident.id)}/>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}