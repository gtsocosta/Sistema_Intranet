exports.up = function (knex, Promise) {
    return knex.schema.createTable('estoques', table => {
        table.increments('id').primary()
        table.string('COD').notNull()
        table.string('DES').notNull()
        table.string('UM').notNull()
        table.integer('QTD').notNull()
        table.integer('CUSTO_UNITARIO').notNull()
        table.integer('CUSTO_TOTAL').notNull()
        table.string('CATEGORIA').notNull()
        table.string('lote')
        table.integer('markup')
        table.boolean('inicia').notNull().defaultTo(false)
        table.integer('userId').references('id')
            .inTable('users')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('estoque')
};
