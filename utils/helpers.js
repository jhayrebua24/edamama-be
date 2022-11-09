const slugify = (string) =>
  string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const transformPaginatedResult = ({ docs: data, ...meta }) => ({
  data,
  meta,
});

const formatPaginationParams = ({ query }) => ({
  page: query.page || 1,
  limit: query.limit || 15,
});

module.exports = {
  slugify,
  transformPaginatedResult,
  formatPaginationParams,
};
