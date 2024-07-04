export const validation = (schema) => {
  return async (req, res, next) => {
    let filterdedData = {};
    let errormessages = [];
    if (req.file) {
      filterdedData = {
        image: req.file,
        ...req.body,
        ...req.params,
        ...req.query,
      };
    } else if(req.files){
      filterdedData = { ...req.files,...req.body, ...req.params, ...req.query };
    } else {
      filterdedData = { ...req.body, ...req.params, ...req.query };
    }
    const { error } = schema.validate(filterdedData, {abortEarly:false});
    if (error) {
      error.details.forEach((e) => {
        const key = e.context.key;
        errormessages.push({ [key]: e.message });
      });
      return res.status(400).json({ message:'validation error', errormessages });
    }
    next();
  };
};
