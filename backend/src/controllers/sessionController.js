const connection = require('../database/connection');

module.exports = {
    async ong_login(request, response){
        const { ongs_id } = request.body;

        console.log(ongs_id);

        const result = await connection('ongs').select('name').where('id', ongs_id).first();

        if(result == undefined){
            return response.status(400).json(result)
        } 
        return response.status(201).json(result);
    }
}