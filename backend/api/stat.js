module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        lotes: Number,
        estoques: Number,
        prevs: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0,
                    lotes: 0,
                    estoques: 0,
                    prevs: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}