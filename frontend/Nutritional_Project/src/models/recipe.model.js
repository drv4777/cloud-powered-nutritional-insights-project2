/**
 * Model for recipe-level rows returned by recipes API.
 * Mirrors the CSV dataset column structure.
 */
export const recipeModel = {
  dietType: '',
  recipeName: '',
  cuisineType: '',
  proteinG: 0,
  carbsG: 0,
  fatG: 0,
  extractionDay: '',
  extractionTime: '',
}

/**
 * Normalizes backend payload keys into a frontend-friendly model.
 * @param {Record<string, unknown>} row
 */
export function toRecipe(row = {}) {
  return {
    dietType: String(row.Diet_type ?? row.dietType ?? ''),
    recipeName: String(row.Recipe_name ?? row.recipeName ?? ''),
    cuisineType: String(row.Cuisine_type ?? row.cuisineType ?? ''),
    proteinG: Number(row['Protein(g)'] ?? row.proteinG ?? 0),
    carbsG: Number(row['Carbs(g)'] ?? row.carbsG ?? 0),
    fatG: Number(row['Fat(g)'] ?? row.fatG ?? 0),
    extractionDay: String(row.Extraction_day ?? row.extractionDay ?? ''),
    extractionTime: String(row.Extraction_time ?? row.extractionTime ?? ''),
  }
}
