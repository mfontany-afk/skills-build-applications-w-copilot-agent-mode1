import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' }
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });

const leaderboardEntrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, default: 0 },
  rank: { type: Number, default: 0 }
}, { timestamps: true });

const workoutSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'general' },
  difficulty: { type: String, default: 'beginner' },
  durationMinutes: { type: Number, default: 30 }
}, { timestamps: true });

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = model('Workout', workoutSchema);
