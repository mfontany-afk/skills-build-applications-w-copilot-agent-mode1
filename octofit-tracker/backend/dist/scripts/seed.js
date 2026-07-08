"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Seed the octofit_db database with test data');
        console.log('Connected to octofit_db');
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.LeaderboardEntry.deleteMany({});
        await models_1.Workout.deleteMany({});
        const users = await models_1.User.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'admin' },
            { name: 'Marcus Reed', email: 'marcus@example.com', role: 'member' },
            { name: 'Sofia Patel', email: 'sofia@example.com', role: 'coach' },
            { name: 'Noah Brooks', email: 'noah@example.com', role: 'member' }
        ]);
        const teams = await models_1.Team.insertMany([
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
        await models_1.Activity.insertMany([
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
        await models_1.LeaderboardEntry.insertMany([
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
        await models_1.Workout.insertMany([
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
        await (0, database_1.disconnectDatabase)();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
