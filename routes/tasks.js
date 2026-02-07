const express = require('express');
const router = express.Router();

// GET todas as tasks
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    tasks: [
      { id: 1, title: 'Configurar servidor', completed: true },
      { id: 2, title: 'Criar rotas', completed: true }
    ] 
  });
});

// POST criar task
router.post('/', (req, res) => {
  res.json({ success: true, message: 'Task created' });
});

module.exports = router;
