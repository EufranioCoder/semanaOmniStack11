const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {
    //Função de Listagem das ONGs
    async index (request, response){
        const data = await connection('ongs').select('*');
    
        console.log(data)
    
        return response.json(data)
    },

    //Função da Criação de uma ONG
    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    }
}