/**
 * Utility helper to calculate product price and size scale
 * defaults to 250g display size for e-commerce catalog consistency.
 */
export const getProductPriceAndSize = (product, targetSize = "250g") => {
  if (!product) return 0;
  
  // Intercept and return manual pricing directly if configured
  if (targetSize === "100g" && product.price_100g !== undefined && product.price_100g !== null && product.price_100g !== 0 && product.price_100g !== "" && product.price_100g !== "0.00") {
    return Math.round(parseFloat(product.price_100g));
  }
  if (targetSize === "250g" && product.price_250g !== undefined && product.price_250g !== null && product.price_250g !== 0 && product.price_250g !== "" && product.price_250g !== "0.00") {
    return Math.round(parseFloat(product.price_250g));
  }
  if (targetSize === "500g" && product.price_500g !== undefined && product.price_500g !== null && product.price_500g !== 0 && product.price_500g !== "" && product.price_500g !== "0.00") {
    return Math.round(parseFloat(product.price_500g));
  }

  // Fallback to auto-scaling logic for legacy products
  let baseGrams = 100;
  const sizeStr = (product.size || "100g").toLowerCase();
  
  if (sizeStr.includes("kg")) {
    baseGrams = (parseFloat(sizeStr) || 1) * 1000;
  } else {
    baseGrams = parseFloat(sizeStr) || 100;
  }
  
  const basePrice = parseFloat(product.price) || 0;
  const pricePerGram = basePrice / baseGrams;
  
  let targetGrams = 250;
  if (targetSize === "100g") {
    targetGrams = 100;
  } else if (targetSize === "250g") {
    targetGrams = 250;
  } else if (targetSize === "500g") {
    targetGrams = 500;
  } else {
    targetGrams = parseFloat(targetSize) || 250;
  }
  
  let calculatedPrice = pricePerGram * targetGrams;
  
  // Apply bulk discount to encourage higher volume sizes
  if (targetSize === "250g") {
    calculatedPrice = calculatedPrice * 0.92; // 8% bulk discount
  } else if (targetSize === "500g") {
    calculatedPrice = calculatedPrice * 0.85; // 15% bulk discount
  }
  
  return Math.round(calculatedPrice);
};
