const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const lotesCount = await app.db('lotes').count('id').first()
        const estoquesCount = await app.db('estoques').count('lote').first()
        const prevsCount = await app.db('prevs').count('name').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt': -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            lotes: lotesCount.count,
            estoques: estoquesCount.count,
            prevs: prevsCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        const changeLotes = !lastStat || stat.lotes !== lastStat.lotes
        const changeEstoques = !lastStat || stat.estoques !== lastStat.estoques
        const changePrevs = !lastStat || stat.prevs !== lastStat.prevs

        if (changeUsers || changeCategories || changeArticles || changeLotes|| changePrevs || changeEstoques ) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}