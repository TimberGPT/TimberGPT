/**
 * Formats a currency amount into a compact representation
 * @param {string|number} amount - The amount to format (e.g. "US $1200.00" or 1200)
 * @param {string} [defaultCurrency="$"] - The default currency symbol if none is detected
 * @returns {string} - Formatted amount (e.g. "US $1.2k")
 */
export const formatCurrency = (amount, defaultCurrency = "$") => {
  // For string amounts with currency prefixes
  if (typeof amount === "string") {
    // Extract the currency prefix (like "US $")
    const currencyPrefix = amount.match(/^([^0-9]+)/);
    const prefix = currencyPrefix ? currencyPrefix[0].trim() : "";

    // Extract numeric value
    const matches = amount.match(/[\d,.]+/);
    const numericValue = matches ? parseFloat(matches[0].replace(/,/g, "")) : 0;

    // Determine the symbol - if there's a $ in the prefix, don't add another one
    const currencySymbol = prefix.includes("$") ? "" : defaultCurrency;

    // Format the number with the original prefix
    if (numericValue >= 1000000) {
      return `${prefix}${currencySymbol}${(numericValue / 1000000).toFixed(
        1
      )}M`;
    } else if (numericValue >= 1000) {
      return `${prefix}${currencySymbol}${(numericValue / 1000).toFixed(1)}k`;
    }

    return `${prefix}${currencySymbol}${numericValue.toFixed(0)}`;
  }

  // For numeric amounts
  const numericValue = amount;

  if (numericValue >= 1000000) {
    return `${defaultCurrency}${(numericValue / 1000000).toFixed(1)}M`;
  } else if (numericValue >= 1000) {
    return `${defaultCurrency}${(numericValue / 1000).toFixed(1)}k`;
  }

  return `${defaultCurrency}${numericValue.toFixed(0)}`;
};
