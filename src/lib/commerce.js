import Commerce from "@chec/commerce.js";

const commerceApiKey = process.env.REACT_APP_COMMERCE_API_KEY;
export const commerce = new Commerce(commerceApiKey);
