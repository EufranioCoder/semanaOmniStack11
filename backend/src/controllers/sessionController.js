const connection = require('../database/connection');

module.exports = {
    async ong_login(request, response){
        const { ongs_id } = request.body;

        console.log(ongs_id);

        const result = await connection('ongs').select('id').where('id', ongs_id).first();

        if(result == undefined){
            return response.status(400).json({error: "invalid ONG ID, no one FOUNDED"})
        } 
        return response.status(201).json({result: "Welcome"});
    }
}