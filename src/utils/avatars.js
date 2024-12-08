import crypto from 'crypto-js'
/**
 * Generate a Gravatar URL based on the email address.
 * 
 * @param {string} email
 * @returns {string} Avatar URL
 */
function generateAvatarUrl(email) {
  const hash = crypto.MD5(email)
  return `https://www.gravatar.com/avatar/${hash}?s=128&d=identicon`
}

export { generateAvatarUrl }