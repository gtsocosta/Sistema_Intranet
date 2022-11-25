module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const estoques = { ...req.body }
        if (req.params.lote) estoques.lote = req.params.lote

        if (!req.originalUrl.startsWith('/estoques')) estoques.inicia = false

            .where({ lote: estoques.lote }).first()

        if (estoques.lote) {
            app.db('estoques')
                .update(estoques)
                .where({ lote: estoques.lote })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else {
            app.db('estoques')
                .insert(estoques)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('estoques')
                .where({ lote: req.params.lote }).del()

            try {
                existsOrError(rowsDeleted, 'estoques não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 5 
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('estoques').count('lote').first()

        const count = parseInt(result.count)

        app.db('estoques')

            .select('id','COD', 'DES', 'UM', 'QTD', 'CUSTO_UNITARIO', 'CUSTO_TOTAL',
                'CATEGORIA', 'lote', 'markup', 'inicia', 'data')

            .limit(limit).offset(page * limit - limit)
            .then(estoques => res.json({ data: estoques, count, limit }))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req, res) => {

        app.db('estoques')
            .select('id','COD', 'DES', 'UM', 'QTD', 'CUSTO_UNITARIO', 'CUSTO_TOTAL',
                'CATEGORIA', 'lote', 'markup', 'inicia', 'data')
            .where({ lote: req.params.lote })
            .first()
            .then(estoques => res.json(estoques))
            .catch(err => res.status(500).send(err))
    }


    return { save, get, getById, remove }
}