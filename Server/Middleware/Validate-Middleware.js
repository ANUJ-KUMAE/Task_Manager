const Validate = (schema) => async (req, resp, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    next();
  } catch (err) {
    const status = 422;
    const message = err.errors[0].message;

    const error = {
      status,
      message,
    };

    next(error);
  }
};

module.exports = Validate;
