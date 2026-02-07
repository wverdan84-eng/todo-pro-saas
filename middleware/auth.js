module.exports = {
  verifyToken: (req, res, next) => {
    // Simulação de verificação
    req.userId = 'demo-user';
    req.user = { name: 'Demo User', email: 'demo@todo.com' };
    next();
  },
  isAdmin: (req, res, next) => {
    next();
  }
};
