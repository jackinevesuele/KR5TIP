let clickCount = 0;
let clickHistory = [];

const getCount = (req, res) => {
  res.json({ count: clickCount });
};

const incrementClick = (req, res) => {
  const { increment = 1 } = req.body;
  const value = parseInt(increment);
  const step = Number.isNaN(value) ? 1 : value;

  clickCount += step;

  const entry = {
    id: clickHistory.length + 1,
    timestamp: new Date().toISOString(),
    increment: step,
    result: clickCount
  };

  clickHistory.push(entry);

  res.json({ count: clickCount });
};

const resetCount = (req, res) => {
  clickCount = 0;
  clickHistory = [];
  res.json({ count: clickCount });
};

const getHistory = (req, res) => {
  const { limit } = req.query;
  if (!limit) {
    return res.json({ history: clickHistory });
  }
  const value = parseInt(limit);
  const safeLimit = Number.isNaN(value) ? 10 : value;
  res.json({ history: clickHistory.slice(-safeLimit) });
};

const getEntryById = (req, res) => {
  const { id } = req.params;
  const value = parseInt(id);
  const entry = clickHistory.find(item => item.id === value);
  if (!entry) {
    return res.status(404).json({ message: 'Запись не найдена' });
  }
  res.json(entry);
};

module.exports = {
  getCount,
  incrementClick,
  resetCount,
  getHistory,
  getEntryById
};
