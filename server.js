// ============================================
// 🚀 TODO-PRO SAAS - VERSÃO FINAL VERCEL
// ============================================

// Carregar variáveis de ambiente
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROTAS ====================

// Rota principal - Landing Page PROFISSIONAL
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 TODO-PRO | Sistema Profissional de Tarefas</title>
    <meta name="description" content="Sistema de gerenciamento de tarefas profissional. Aumente sua produtividade em 10x.">
    
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
      * { font-family: 'Inter', sans-serif; }
      body { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }
      .glass-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
    </style>
  </head>
  <body class="text-white">
    
    <!-- Navbar -->
    <nav class="glass-card py-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <i class="fas fa-tasks text-purple-600 text-xl"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold">TODO<span class="text-yellow-300">PRO</span></h1>
              <p class="text-xs opacity-75">SaaS Profissional</p>
            </div>
          </div>
          <div class="hidden md:flex space-x-6">
            <a href="#features" class="hover:text-yellow-300">Features</a>
            <a href="#api" class="hover:text-yellow-300">API</a>
            <a href="#deploy" class="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
              <i class="fas fa-rocket mr-2"></i>Deploy Agora
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-block p-3 bg-white/20 rounded-full mb-6">
          <i class="fas fa-terminal text-3xl"></i>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          SaaS Criado 100% no
          <span class="text-yellow-300">Termux</span>
        </h1>
        <p class="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          Sistema profissional de gerenciamento de tarefas desenvolvido inteiramente no Android.
          Pronto para deploy na Vercel em 2 minutos.
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <a href="#deploy" class="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-bold hover-lift">
            <i class="fas fa-cloud-upload-alt mr-2"></i>Fazer Deploy na Vercel
          </a>
          <a href="/api" class="glass-card px-8 py-4 rounded-xl text-lg font-bold hover-lift">
            <i class="fas fa-code mr-2"></i>Testar API
          </a>
        </div>

        <!-- Status Badges -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div class="glass-card p-4 rounded-xl">
            <div class="text-2xl font-bold text-green-400">✅</div>
            <p class="text-sm">Node.js</p>
          </div>
          <div class="glass-card p-4 rounded-xl">
            <div class="text-2xl font-bold text-green-400">✅</div>
            <p class="text-sm">Express</p>
          </div>
          <div class="glass-card p-4 rounded-xl">
            <div class="text-2xl font-bold text-yellow-400">🚀</div>
            <p class="text-sm">Vercel Ready</p>
          </div>
          <div class="glass-card p-4 rounded-xl">
            <div class="text-2xl font-bold text-blue-400">📱</div>
            <p class="text-sm">Termux</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">✨ Features Principais</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="glass-card p-6 rounded-2xl hover-lift">
          <div class="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-bolt text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">API REST Completa</h3>
          <p class="opacity-90">Endpoints para criar, ler, atualizar e excluir tarefas</p>
        </div>
        
        <div class="glass-card p-6 rounded-2xl hover-lift">
          <div class="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-mobile-alt text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">100% Responsivo</h3>
          <p class="opacity-90">Funciona perfeitamente em mobile, tablet e desktop</p>
        </div>
        
        <div class="glass-card p-6 rounded-2xl hover-lift">
          <div class="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-cloud text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">Deploy Instantâneo</h3>
          <p class="opacity-90">Pronto para Vercel, Netlify, Render, etc.</p>
        </div>
      </div>
    </section>

    <!-- API Section -->
    <section id="api" class="container mx-auto px-4 py-16">
      <div class="glass-card rounded-2xl p-8">
        <h2 class="text-3xl font-bold mb-6 text-center">🔧 API REST</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="border-b border-white/20">
              <tr>
                <th class="pb-3">Método</th>
                <th class="pb-3">Endpoint</th>
                <th class="pb-3">Descrição</th>
                <th class="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-white/10">
                <td class="py-3"><span class="bg-green-500 text-white px-2 py-1 rounded text-xs">GET</span></td>
                <td class="py-3 font-mono">/api</td>
                <td class="py-3">Informações da API</td>
                <td class="py-3"><span class="text-green-400">✅ Online</span></td>
              </tr>
              <tr class="border-b border-white/10">
                <td class="py-3"><span class="bg-green-500 text-white px-2 py-1 rounded text-xs">GET</span></td>
                <td class="py-3 font-mono">/api/tasks</td>
                <td class="py-3">Listar todas as tarefas</td>
                <td class="py-3"><span class="text-green-400">✅ Online</span></td>
              </tr>
              <tr class="border-b border-white/10">
                <td class="py-3"><span class="bg-blue-500 text-white px-2 py-1 rounded text-xs">POST</span></td>
                <td class="py-3 font-mono">/api/tasks</td>
                <td class="py-3">Criar nova tarefa</td>
                <td class="py-3"><span class="text-green-400">✅ Online</span></td>
              </tr>
              <tr>
                <td class="py-3"><span class="bg-green-500 text-white px-2 py-1 rounded text-xs">GET</span></td>
                <td class="py-3 font-mono">/health</td>
                <td class="py-3">Health check do sistema</td>
                <td class="py-3"><span class="text-green-400">✅ Online</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mt-8">
          <a href="/api" class="inline-flex items-center text-yellow-300 hover:text-yellow-400 text-lg">
            <i class="fas fa-external-link-alt mr-2"></i>
            Testar API Agora
          </a>
        </div>
      </div>
    </section>

    <!-- Deploy Guide -->
    <section id="deploy" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-8">🚀 Deploy na Vercel em 2 Minutos</h2>
      <div class="max-w-2xl mx-auto">
        <div class="glass-card p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold mb-3">1. Push para GitHub</h3>
          <pre class="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm">
git add .
git commit -m "Ready for Vercel"
git push origin main</pre>
        </div>
        
        <div class="glass-card p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold mb-3">2. Importar na Vercel</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
              <span>Acesse <a href="https://vercel.com" class="text-yellow-300 hover:underline">vercel.com</a></span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
              <span>Conecte sua conta GitHub</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
              <span>Importe o repositório</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
              <span>Clique em "Deploy"</span>
            </li>
          </ul>
        </div>
        
        <div class="glass-card p-6 rounded-xl">
          <h3 class="text-xl font-bold mb-3">3. Sua URL será:</h3>
          <div class="bg-black/30 p-4 rounded-lg">
            <code class="text-lg">https://todo-pro-saas.vercel.app</code>
          </div>
          <p class="mt-3 text-sm opacity-90">Pronto! Seu SaaS estará online para o mundo todo.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-4 py-8 mt-16 border-t border-white/10">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-white rounded flex items-center justify-center">
              <i class="fas fa-terminal text-purple-600"></i>
            </div>
            <div>
              <p class="font-bold">TODO-PRO SaaS</p>
              <p class="text-sm opacity-75">Criado no Termux</p>
            </div>
          </div>
        </div>
        
        <div class="text-center mb-4 md:mb-0">
          <p class="opacity-90">
            Desenvolvido por <strong>wverdan84</strong>
          </p>
          <p class="text-sm opacity-75">
            GitHub: <a href="https://github.com/wverdan84-eng" class="text-yellow-300 hover:underline">wverdan84-eng</a>
          </p>
        </div>
        
        <div class="flex space-x-4">
          <a href="https://github.com/wverdan84-eng" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
            <i class="fab fa-github"></i>
          </a>
          <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center" title="Online">
            <i class="fas fa-circle text-green-400"></i>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8 pt-8 border-t border-white/10">
        <p class="text-sm opacity-75">
          🚀 Este projeto prova que você pode criar um SaaS profissional 100% no Android usando Termux!
        </p>
        <p class="text-xs opacity-50 mt-2">
          Node.js + Express + Vercel = SaaS Sucesso
        </p>
      </div>
    </footer>

    <!-- Floating Chat -->
    <div class="fixed bottom-4 right-4">
      <div class="relative">
        <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        <div class="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <i class="fas fa-comment text-xl"></i>
        </div>
      </div>
    </div>

    <!-- Script para animações -->
    <script>
      // Animação simples para elementos
      document.addEventListener('DOMContentLoaded', function() {
        // Adiciona classe de animação aos cards
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.1}s`;
          card.classList.add('animate-fade-in');
        });
      });
    </script>
    
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
      }
    </style>
    
  </body>
  </html>
  `;
  res.send(html);
});

// API Routes
app.get('/api', (req, res) => {
  res.json({
    success: true,
    service: 'TODO-PRO SaaS',
    version: '1.0.0',
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    deployed: process.env.VERCEL === '1',
    readyForProduction: true,
    endpoints: {
      home: '/',
      apiInfo: '/api',
      tasks: '/api/tasks',
      health: '/health'
    },
    developer: {
      name: 'wverdan84',
      github: 'wverdan84-eng',
      builtWith: 'Termux (Android)'
    },
    message: 'This SaaS was built 100% on Android using Termux!'
  });
});

app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    count: 3,
    tasks: [
      {
        id: 1,
        title: 'Configurar projeto Node.js no Termux',
        description: 'Instalar Node.js, npm e configurar ambiente',
        completed: true,
        priority: 'high',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Desenvolver API REST com Express',
        description: 'Criar endpoints para gerenciamento de tarefas',
        completed: true,
        priority: 'high',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Deploy automático na Vercel',
        description: 'Configurar deploy contínuo com GitHub',
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      }
    ],
    stats: {
      total: 3,
      completed: 2,
      pending: 1,
      completionRate: '66%'
    }
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newTask = {
    id: Date.now(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'medium'
  };
  
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task: newTask
  });
});

// Health check endpoint (important for Vercel)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    vercel: process.env.VERCEL === '1',
    region: process.env.VERCEL_REGION || 'local'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    availableRoutes: ['/', '/api', '/api/tasks', '/health']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
  ============================================
  🚀  TODO-PRO SaaS - VERCEL READY
  ============================================
  📡  Porta: ${PORT}
  🌐  URL: http://localhost:${PORT}
  🔧  Modo: ${process.env.NODE_ENV || 'development'}
  👤  Dev: wverdan84
  💻  GitHub: wverdan84-eng
  ⏰  Iniciado: ${new Date().toLocaleString('pt-BR')}
  ============================================
  ✅  Pronto para deploy na Vercel!
  ============================================
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

module.exports = app;
