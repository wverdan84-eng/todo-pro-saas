#!/bin/bash
echo "🚀 Configurando TODO-PRO SaaS no Termux..."

# Atualizar pacotes
pkg update -y && pkg upgrade -y

# Instalar Node.js e Git
pkg install nodejs git -y

# Clonar repositório (se usar git)
# git clone https://github.com/wverdan84-eng/todo-pro-saas.git
# cd todo-pro-saas

# Instalar dependências
npm install

# Configurar Tailwind CSS
npx tailwindcss init -p
npx tailwindcss -i ./src/input.css -o ./public/css/output.css --minify

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Configure seu arquivo .env com suas credenciais!"
fi

# Criar pastas necessárias
mkdir -p public/uploads/{avatars,tasks,teams}

# Iniciar servidor em modo desenvolvimento
echo "✅ Setup completo! Iniciando servidor..."
npm run dev
