export const calculateSubtotal = (node) => {
  if (!node.children) return isNaN(node.value) ? 0 : node.value;
  return node.children.reduce(
    (sum, child) => sum + calculateSubtotal(child),
    0
  );
};

export const distributeToChildren = (children, newTotal) => {
  const oldTotal = children.reduce((sum, c) => sum + c.value, 0);
  return children.map((child) => ({
    ...child,
    value: parseFloat(((child.value / oldTotal) * newTotal).toFixed(4)),
  }));
};

export const calculateVariance = (original, current) => {
  return original === 0
    ? 0
    : parseFloat((((current - original) / original) * 100).toFixed(2));
};
