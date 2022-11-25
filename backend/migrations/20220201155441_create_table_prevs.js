
exports.up = function (knex, Promise) {
    return knex.schema.createTable('prevs', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cod').notNull()
        table.string('des').notNull()
        table.string('um').notNull()
        table.integer('qtd').notNull()
        table.money('custo_unitario').notNull()
        table.money('custo_total').notNull()
        table.string('categoria').notNull()        
        table.double('markup')
        table.boolean('inicia').notNull().defaultTo(false)
        table.date('diaselect')
        table.integer('userid').references('id')
            .inTable('prevs')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('prevs')
};
