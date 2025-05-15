const mongoose = require('mongoose');

const hunterSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  rank: { type: String, enum: ['E', 'D', 'C', 'B', 'A', 'S'], default: 'E' },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  weapon: {
    type: String,
    enum: ['sword', 'spear', 'bow', 'dagger', 'staff'],
    required: true
  },
  class: { type: String, default: null }, // เช่น warrior, mage
  skills: [{
    skillId: mongoose.Schema.Types.ObjectId,
    level: { type: Number, default: 1 }
  }],
  inventory: [{
    itemId: mongoose.Schema.Types.ObjectId,
    quantity: Number
  }],
  equipment: {
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    armor: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    accessory: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
  },
  gold: { type: Number, default: 0 },
  partyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party', default: null }
});

module.exports = mongoose.model('Hunter', hunterSchema);
