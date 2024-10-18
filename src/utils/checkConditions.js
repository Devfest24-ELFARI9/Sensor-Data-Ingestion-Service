const checkConditions = (data, conditions) => {
    const condition = conditions[data.type];
    if (condition) {
      const { threshold, operator } = condition;
      const value = data.value;
      switch (operator) {
        case '>': return value > threshold;
        case '<': return value < threshold;
        case '>=': return value >= threshold;
        case '<=': return value <= threshold;
        default: return false;
      }
    }
    return false;
  };
  
  module.exports = checkConditions;
  