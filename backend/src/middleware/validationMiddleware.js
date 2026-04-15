export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema(req.body || {});

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    req.validatedBody = result.value;
    return next();
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema(req.query || {});

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    req.validatedQuery = result.value;
    return next();
  };
}
