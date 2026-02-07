const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  
  // Membros
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'viewer'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Configurações
  settings: {
    canInvite: {
      type: Boolean,
      default: true
    },
    taskVisibility: {
      type: String,
      enum: ['all', 'assigned', 'private'],
      default: 'all'
    },
    defaultTaskStatus: {
      type: String,
      default: 'pending'
    }
  },
  
  // Estatísticas
  stats: {
    totalTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    activeMembers: { type: Number, default: 0 }
  },
  
  // Personalização
  color: {
    type: String,
    default: '#667eea'
  },
  logo: String,
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Virtual para URL do logo
teamSchema.virtual('logoUrl').get(function() {
  if (this.logo && !this.logo.startsWith('http')) {
    return `${process.env.BASE_URL}/uploads/teams/${this.logo}`;
  }
  return this.logo;
});

// Método para adicionar membro
teamSchema.methods.addMember = function(userId, role = 'member') {
  if (!this.members.some(m => m.user.toString() === userId.toString())) {
    this.members.push({ user: userId, role });
    this.stats.activeMembers++;
    return this.save();
  }
  return this;
};

// Método para remover membro
teamSchema.methods.removeMember = function(userId) {
  this.members = this.members.filter(m => m.user.toString() !== userId.toString());
  this.stats.activeMembers = Math.max(0, this.stats.activeMembers - 1);
  return this.save();
};

// Método para verificar permissão
teamSchema.methods.hasPermission = function(userId, requiredRole = 'member') {
  const member = this.members.find(m => m.user.toString() === userId.toString());
  if (!member) return false;
  
  const roleHierarchy = { viewer: 1, member: 2, admin: 3 };
  return roleHierarchy[member.role] >= roleHierarchy[requiredRole];
};

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
