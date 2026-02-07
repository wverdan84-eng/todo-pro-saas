// ============================================
// 🚀 TODO-PRO SAAS - VERSÃO VERCEL OTIMIZADA
// ============================================

// NÃO use dotenv na Vercel (ela injeta variáveis automaticamente)
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (e) {
    // dotenv não disponível, tudo bem
  }
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware ESSENCIAL para Vercel
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Headers para Vercel
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'TODO-PRO SaaS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// ==================== ROTAS SIMPLIFICADAS ====================

// Rota principal
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>🚀 TODO-PRO SaaS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        margin: 0;
        padding: 20px;
        color: white;
        text-align: center;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
      }
      .status {
        background: rgba(255,255,255,0.2);
        padding: 20px;
        border-radius: 15px;
        margin: 30px 0;
        backdrop-filter: blur(10px);
      }
      .success {
        color: #4ade80;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 TODO-PRO SaaS</h1>
      <p>Sistema profissional criado 100% no Termux</p>
      
      <div class="status">
        <h2 class="success">✅ Online na Vercel!</h2>
        <p>Sistema funcionando perfeitamente</p>
        <p>Dev: wverdan84 (GitHub: wverdan84-eng)</p>
      </div>
      
      <div>
        <h3>🔗 Endpoints disponíveis:</h3>
        <p><a href="/api" style="color: white;">/api</a> - Informações da API</p>
        <p><a href="/health" style="color: white;">/health</a> - Health check</p>
        <p><a href="/api/tasks" style="color: white;">/api/tasks</a> - Lista de tarefas</p>
      </div>
    </div>
  </body>
  </html>
  `);
});

// API Info
app.get('/api', (req, res) => {
  res.json({
    success: true,
    service: 'TODO-PRO SaaS',
    version: '1.0.0',
    status: 'online',
    deployedOn: 'Vercel',
    developer: 'wverdan84',
    github: 'wverdan84-eng',
    message: 'This SaaS was built 100% on Android using Termux!',
    endpoints: ['/', '/api', '/api/tasks', '/health']
  });
});

// Tasks API
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    tasks: [
      { id: 1, title: 'Configurar Vercel', completed: true },
      { id: 2, title: 'Deploy com sucesso', completed: true },
      { id: 3, title: 'Testar produção', completed: false }
    ]
  });
});

// Health check (CRITICAL for Vercel)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
    vercel: process.env.VERCEL === '1',
    region: process.env.VERCEL_REGION || 'unknown'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Contact support' : err.message
  });
});

// Export para Vercel
module.exports = app;

// Local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
