const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // Identificação
  title: {
    type: String,
    required: [true, 'O título da tarefa é obrigatório'],
    trim: true,
    maxlength: [200, 'O título não pode ter mais que 200 caracteres']
  },
  description: {
    type: String,
    maxlength: [2000, 'A descrição não pode ter mais que 2000 caracteres']
  },

  // Propriedades
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled', 'on_hold'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,

  // Datas
  dueDate: Date,
  startDate: Date,
  reminderDate: Date,

  // Categorização
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  category: {
    type: String,
    enum: ['work', 'personal', 'health', 'finance', 'education', 'other'],
    default: 'personal'
  },
  color: {
    type: String,
    default: '#667eea'
  },

  // Relacionamentos
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],

  // Recurring
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrence: {
    pattern: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly', 'custom']
    },
    interval: Number,
    daysOfWeek: [Number], // 0-6 (Domingo-Sábado)
    endDate: Date,
    occurrences: Number
  },

  // Anexos
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  // Metadados
  estimatedTime: Number, // em minutos
  actualTime: Number, // em minutos
  position: Number, // para ordenação

  // Comentários (virtual)
  commentCount: {
    type: Number,
    default: 0
  },

  // Privacidade
  isPrivate: {
    type: Boolean,
    default: false
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes para performance
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ team: 1 });
taskSchema.index({ project: 1 });
taskSchema.index({ tags: 1 });
taskSchema.index({ createdAt: -1 });

// Virtual para tempo restante
taskSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  const now = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual para urgência
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.completed) return false;
  return new Date() > new Date(this.dueDate);
});

// Virtual para progresso
taskSchema.virtual('progress').get(function() {
  if (this.completed) return 100;
  if (this.status === 'in_progress') return 50;
  return 0;
});

// Hook para atualizar completedAt
taskSchema.pre('save', function(next) {
  if (this.isModified('completed') && this.completed) {
    this.completedAt = new Date();
  }
  if (this.isModified('completed') && !this.completed) {
    this.completedAt = null;
  }
  next();
});

// Hook para atualizar contagem de comentários
taskSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'task',
  count: true
});

// Método para marcar como concluída
taskSchema.methods.markComplete = function() {
  this.status = 'completed';
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Método para adicionar tag
taskSchema.methods.addTag = function(tag) {
  if (!this.tags.includes(tag.toLowerCase())) {
    this.tags.push(tag.toLowerCase());
  }
  return this.save();
};

// Método para remover tag
taskSchema.methods.removeTag = function(tag) {
  this.tags = this.tags.filter(t => t !== tag.toLowerCase());
  return this.save();
};

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
