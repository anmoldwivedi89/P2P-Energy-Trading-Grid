/**
 * Format currency with symbol
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

/**
 * Format energy units (kWh, MWh)
 */
export const formatEnergy = (units) => {
  if (units >= 1000) {
    return `${(units / 1000).toFixed(2)} MWh`;
  }
  return `${Number(units || 0).toFixed(2)} kWh`;
};

/**
 * Format date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format wallet / blockchain address
 */
export const truncateAddress = (address, start = 6, end = 4) => {
  if (!address) return '';
  if (address.length <= start + end) return address;
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
};
