exports.up = function (knex, Promise) {
  return knex.schema.createTable("lotes", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.integer("metros").notNull();
    table.integer("homag").notNull();
    table.integer("nesting").notNull();
    table.string("description", 1000);
    table.boolean("inicia").notNull().defaultTo(false);
    table.integer("userId").references("id").inTable("users");
    table.binary("content").notNull();
    table.timestamp('date');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("lotes");
};
