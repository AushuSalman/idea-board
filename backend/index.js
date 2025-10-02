const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all ideas
app.get('/ideas', async (req, res) => {
  const ideas = await prisma.idea.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(ideas);
});

// Create new idea
app.post('/ideas', async (req, res) => {
  const { text } = req.body;
  if (!text || text.length > 280) {
    return res.status(400).json({ error: 'Idea text required, max 280 chars' });
  }
  const idea = await prisma.idea.create({ data: { text } });
  res.status(201).json(idea);
});

// Upvote an idea
app.patch('/ideas/:id/upvote', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updated = await prisma.idea.update({
      where: { id },
      data: { upvotes: { increment: 1 } }
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: 'Idea not found' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
});

// Delete idea
app.delete('/ideas/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.idea.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Idea not found' });
  }
});
