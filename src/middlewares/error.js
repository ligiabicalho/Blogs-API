module.exports = async (error, _req, res, _next) => {
  const { status, message } = error;
  console.error('Error:', status, message);
  return res.status(status || 500).json({ message });
};