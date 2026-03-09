/**
 * Model for cluster API output placeholder.
 * Final cluster fields can be extended when backend contract is finalized.
 */
export const clusterModel = {
  clusterId: 0,
  dietType: '',
  recipeCount: 0,
  avgProteinG: 0,
  avgCarbsG: 0,
  avgFatG: 0,
}

/**
 * Normalizes backend payload keys into a frontend-friendly model.
 * @param {Record<string, unknown>} row
 */
export function toCluster(row = {}) {
  return {
    clusterId: Number(row.clusterId ?? row.ClusterId ?? 0),
    dietType: String(row.dietType ?? row.Diet_type ?? ''),
    recipeCount: Number(row.recipeCount ?? row.Recipe_count ?? 0),
    avgProteinG: Number(row.avgProteinG ?? row['Protein(g)'] ?? 0),
    avgCarbsG: Number(row.avgCarbsG ?? row['Carbs(g)'] ?? 0),
    avgFatG: Number(row.avgFatG ?? row['Fat(g)'] ?? 0),
  }
}
