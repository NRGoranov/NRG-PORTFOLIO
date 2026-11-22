/**
 * Clothing pages, assets, and the wishlist API stay in the repository.
 * They are unpublished unless this variable is exactly "true".
 * Set CLOTHING_PUBLIC=true and redeploy to restore public access.
 */
export function isClothingPublic(): boolean {
  return process.env.CLOTHING_PUBLIC === 'true'
}
