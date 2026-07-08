import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const router = Router();

const handleError = (res: any, error: unknown) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (error) {
    return handleError(res, error);
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ success: true });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.json(team);
  } catch (error) {
    return handleError(res, error);
  }
});

router.put('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.json(team);
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    return res.json({ success: true });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId').sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    return res.json(activity);
  } catch (error) {
    return handleError(res, error);
  }
});

router.put('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    return res.json(activity);
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    return res.json({ success: true });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().populate('userId').populate('teamId').sort({ score: -1 });
    res.json(entries);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/leaderboard', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/leaderboard/:id', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findById(req.params.id).populate('userId').populate('teamId');
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    return res.json(entry);
  } catch (error) {
    return handleError(res, error);
  }
});

router.put('/leaderboard/:id', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    return res.json(entry);
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/leaderboard/:id', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    return res.json({ success: true });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    return res.json(workout);
  } catch (error) {
    return handleError(res, error);
  }
});

router.put('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    return res.json(workout);
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    return res.json({ success: true });
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;
