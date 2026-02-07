const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Identificação
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um email válido']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff'
  },

  // Perfil
  bio: {
    type: String,
    maxlength: 500
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  // Assinatura/Plano
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise', 'custom'],
    default: 'free'
  },
  planExpiresAt: Date,
  stripeCustomerId: String,
  stripeSubscriptionId: String,

  // Limites do plano
  limits: {
    maxTasks: { type: Number, default: 100 },
    maxTeams: { type: Number, default: 1 },
    maxMembers: { type: Number, default: 1 },
    maxStorage: { type: Number, default: 100 } // MB
  },
  usage: {
    tasks: { type: Number, default: 0 },
    teams: { type: Number, default: 0 },
    members: { type: Number, default: 0 },
    storage: { type: Number, default: 0 } // MB
  },

  // Configurações
  settings: {
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    language: { type: String, default: 'pt-BR' },
    timezone: { type: String, default: 'America/Sao_Paulo' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      taskReminders: { type: Boolean, default: true }
    }
  },

  // Segurança
  lastLogin: Date,
  loginHistory: [{
    ip: String,
    userAgent: String,
    timestamp: { type: Date, default: Date.now }
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verifyEmailToken: String,
  verifyEmailExpire: Date,

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual para avatar URL
userSchema.virtual('avatarUrl').get(function() {
  if (this.avatar && !this.avatar.startsWith('http')) {
    return `${process.env.BASE_URL}/uploads/avatars/${this.avatar}`;
  }
  return this.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=667eea&color=fff`;
});

// Método para verificar limite do plano
userSchema.methods.checkLimit = function(resource, amount = 1) {
  const currentUsage = this.usage[resource] || 0;
  const maxLimit = this.limits[`max${resource.charAt(0).toUpperCase() + resource.slice(1)}`] || 0;
  
  return currentUsage + amount <= maxLimit;
};

// Método para incrementar uso
userSchema.methods.incrementUsage = function(resource, amount = 1) {
  this.usage[resource] = (this.usage[resource] || 0) + amount;
  return this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;
