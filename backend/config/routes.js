const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        // .get(admin(app.api.user.get))
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        // .get(admin(app.api.user.getById))
        .get(app.api.user.getById)
        .delete(admin(app.api.user.remove))

    app.route('/lotes')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.lote.save))
        // .get(admin(app.api.lote.get))
        .get(app.api.lote.get)

    app.route('/lotes/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.lote.save))
        // .get(admin(app.api.lote.getById))
        .get(app.api.lote.getById)
        .delete(admin(app.api.lote.remove))

    app.route('/estoques')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.estoques.get))
        .post(admin(app.api.estoques.save))

    app.route('/estoques/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.estoques.getById)
        .put(admin(app.api.estoques.save))
        .delete(admin(app.api.estoques.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/prevs')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.prev.get))
        .post(admin(app.api.prev.save))

    app.route('/prevs/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.prev.getById)
        .put(admin(app.api.prev.save))
        .delete(admin(app.api.prev.remove))

    // Cuidado com ordem! Tem que vir antes de /categories/:id

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}