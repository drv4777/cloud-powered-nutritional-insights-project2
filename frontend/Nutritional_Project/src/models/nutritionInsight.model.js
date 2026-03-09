/**
 * Model for aggregated nutritional insight rows returned by insights API.
 * Mirrors the shape seen in `results.json`.
 */
export const nutritionInsightModel = {
  dietType: '',
  proteinG: 0,
  carbsG: 0,
  fatG: 0,
}

/**
 * Normalizes backend payload keys into a frontend-friendly model.
 * @param {Record<string, unknown>} row
 */
export function toNutritionInsight(row = {}) {
  return {
    dietType: String(row.Diet_type ?? row.dietType ?? ''),
    proteinG: Number(row['Protein(g)'] ?? row.proteinG ?? 0),
    carbsG: Number(row['Carbs(g)'] ?? row.carbsG ?? 0),
    fatG: Number(row['Fat(g)'] ?? row.fatG ?? 0),
  }
}
