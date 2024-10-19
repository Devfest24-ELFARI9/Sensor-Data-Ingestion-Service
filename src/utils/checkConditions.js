const checkConditions = (data, conditions) => {
  for (const [metric, condition] of Object.entries(conditions)) {
    const { threshold, operator } = condition;
    const value = data[metric];
    switch (operator) {
      case '>': if (value > threshold) return true; break;
      case '<': if (value < threshold) return true; break;
      case '>=': if (value >= threshold) return true; break;
      case '<=': if (value <= threshold) return true; break;
      default: return false;
    }
  }
  return false;
};

module.exports = checkConditions;