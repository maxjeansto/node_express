const success = (res, status, message) => {
    res.status(status).json({ message });
  };


const error = (res, status, message) => {
    res.status(status).json({ message });
  };

export { success, error };