module.exports = app => {

    const save = (req, res) => {
        const prev = { ...req.body }
        if (req.params.name) prev.name = req.params.name

        if (!req.originalUrl.startsWith('/prevs')) prev.inicia = false

            .where({ name: prev.name }).first()

        if (prev.name) {
            app.db('prevs')
                .update(prev)
                .where({ name: prev.name })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else {
            app.db('prevs')
                .insert(prev)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('prevs')
                .where({ name: req.params.name }).del()
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {
        app.db('prevs')
            .select('cod', 'des', 'um', 'qtd', 'custo_unitario', 'custo_total',
                'categoria', 'name', 'markup', 'inicia', 'diaselect')
            .then(prevs => res.json({ data: prevs }))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {

        app.db('prevs')
            .select('cod', 'des', 'um', 'qtd', 'custo_unitario', 'custo_total',
                'categoria', 'name', 'markup', 'inicia', 'diaselect')
            .where({ name: req.params.name })
            .first()
            .then(prev => res.json(prev))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, remove, getById }
}