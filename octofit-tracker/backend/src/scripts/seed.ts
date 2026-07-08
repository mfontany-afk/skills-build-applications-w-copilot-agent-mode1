import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'admin' },
      { name: 'Marcus Reed', email: 'marcus@example.com', role: 'member' },
      { name: 'Sofia Patel', email: 'sofia@example.com', role: 'coach' },
      { name: 'Noah Brooks', email: 'noah@example.com', role: 'member' }
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Peak Performers',
        description: 'High-intensity training group',
        members: [users[0]._id, users[1]._id]
      },
      {
        name: 'Balance Builders',
        description: 'Recovery and mobility focused team',
        members: [users[2]._id, users[3]._id]
      }
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        notes: 'Early morning interval run'
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        notes: 'Full body strength session'
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        notes: 'Mobility and flexibility flow'
      }
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        score: 980,
        rank: 1
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        score: 910,
        rank: 2
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        score: 875,
        rank: 3
      }
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Cardio Blast',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 25
      },
      {
        name: 'Core Stability Flow',
        category: 'core',
        difficulty: 'beginner',
        durationMinutes: 20
      },
      {
        name: 'Recovery Mobility Session',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 30
      }
    ]);

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
