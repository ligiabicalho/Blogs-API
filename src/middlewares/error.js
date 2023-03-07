module.exports = async (error, _req, res, _next) => {
  const { status, message } = error;
  console.error('Error:', error);
  console.log('middle error status msg', status, message);
  return res.status(status || 500).json({ message });
};