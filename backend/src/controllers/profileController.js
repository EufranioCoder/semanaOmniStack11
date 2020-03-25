const connection = require('../database/connection');

module.exports = {
    async list_especific_incidents(request, response){
        const ongs_id = request.headers.cod;

        const casos = await connection('incidents').select('*').where('ongs_id', ongs_id);
        
        if(casos.length == 0){
            return response.status(401).json({error: "There is not incidents with this ONG"});
        }
        return response.json({casos});
    }
}