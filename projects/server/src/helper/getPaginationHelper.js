function getPaginationParams(req, itemsPerPage) {
  let { page } = req.query;

  page = parseInt(page);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const offset = (page - 1) * itemsPerPage;

  return { page, offset };
}

module.exports = { getPaginationParams };
