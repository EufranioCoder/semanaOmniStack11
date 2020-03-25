const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //Paginação e entrega total de registros!
        const { page = 1 } = request.query;

        var numberOfCases = await connection('incidents').select('*').count();
        numberOfCases = numberOfCases[0]['count(*)']

        response.header('X-Total-Count', numberOfCases)

        const data = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ongs_id')
        .limit(5).offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.city', 'ongs.uf', 'ongs.email', 'ongs.whatsapp']);

        return response.json(data);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ongs_id = request.headers.cod;
        console.log(ongs_id + "\n");

        const [ id ] = await connection('incidents').insert({
            title,
            description,
            value,
            ongs_id,
        })
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const id_ong = request.headers.cod;

        const incident_ong = await connection('incidents').where('id', id).select('ongs_id').first();
        
        if(incident_ong.ongs_id == id_ong){
            await connection('incidents').where('id', id).delete();
            return response.status(204).send();
        } else {
            return response.status(401).json({error: "Operation not permitted"});
        }
    }
}