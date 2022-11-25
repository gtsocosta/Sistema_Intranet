module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const lote = { ...req.body };
    if (req.params.id) lote.id = req.params.id;

    if (!req.originalUrl.startsWith("/lotes")) lote.inicia = false;

    try {
      existsOrError(lote.name, "Lote não informado");
      existsOrError(lote.metros, "Metragem não informado");
      existsOrError(lote.homag, "Quatidade chapas Homag não infromada");
      existsOrError(lote.nesting, "Quatidade chapas Nesting não infromada");
      existsOrError(lote.content, "Conteúdo não informado");
      const loteFromDB = await app
        .db("lotes")
        .where({ name: lote.name })
        .first();

      if (!lote.id) {
        notExistsOrError(loteFromDB, "Lote já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (lote.id) {
      app
        .db("lotes")
        .update(lote)
        .where({ id: lote.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("lotes")
        .insert(lote)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("lotes")

        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Lote não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
  // const limit = 3;

  const get = async (req, res) => {
    // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
    // const page = req.query.page || 1;
    // const result = await app.db("lotes").count("id").first();
    // const count = parseInt(result.count);

    app
      .db("lotes")
      .select(
        "id",
        "name",
        "metros",
        "homag",
        "nesting",
        "description",
        "inicia",
        "userId",
        "date"
      )
      .then((lotes) => res.json(lotes))

      // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
      // .limit(limit)
      // .offset(page * limit - limit)
      // .then((lotes) => res.json({ data: lotes, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("lotes")
      .where({ id: req.params.id })
      .first()
      .then((lote) => {
        lote.content = lote.content.toString();
        return res.json(lote);
      })
      .catch((err) => res.status(500).send(err));
  };
  return { save, get, getById, remove };
};
