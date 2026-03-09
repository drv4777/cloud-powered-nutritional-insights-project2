import { useMemo, useState } from 'react'
import './App.css'
import ApiActionControls from './components/ApiActionControls'
import DataPreviewPanel from './components/DataPreviewPanel'
import FilterControls from './components/FilterControls'
import PaginationControls from './components/PaginationControls'
import {
  clusterModel,
  filterPaginationModel,
  nutritionInsightModel,
  pageMetaModel,
  recipeModel,
  toCluster,
  toNutritionInsight,
  toRecipe,
} from './models'

const placeholderInsightApiRows = [
  { Diet_type: 'dash', 'Protein(g)': 69.28, 'Carbs(g)': 160.53, 'Fat(g)': 101.15 },
  { Diet_type: 'keto', 'Protein(g)': 101.26, 'Carbs(g)': 57.97, 'Fat(g)': 153.12 },
  { Diet_type: 'mediterranean', 'Protein(g)': 101.11, 'Carbs(g)': 152.9, 'Fat(g)': 101.42 },
  { Diet_type: 'paleo', 'Protein(g)': 88.67, 'Carbs(g)': 129.55, 'Fat(g)': 135.67 },
  { Diet_type: 'vegan', 'Protein(g)': 56.16, 'Carbs(g)': 254.0, 'Fat(g)': 103.3 },
  { Diet_type: 'vegetarian', 'Protein(g)': 72.4, 'Carbs(g)': 210.3, 'Fat(g)': 88.2 },
  { Diet_type: 'low-carb', 'Protein(g)': 95.3, 'Carbs(g)': 82.7, 'Fat(g)': 118.9 },
  { Diet_type: 'high-protein', 'Protein(g)': 121.5, 'Carbs(g)': 140.1, 'Fat(g)': 98.4 },
]

const placeholderRecipeApiRows = [
  {
    Diet_type: 'paleo',
    Recipe_name: 'Paleo Pumpkin Pie',
    Cuisine_type: 'american',
    'Protein(g)': 30.91,
    'Carbs(g)': 302.59,
    'Fat(g)': 96.76,
    Extraction_day: '10/16/2022',
    Extraction_time: '17:20:09',
  },
]

const placeholderClusterApiRows = [
  {
    clusterId: 1,
    Diet_type: 'keto',
    Recipe_count: 124,
    'Protein(g)': 110.2,
    'Carbs(g)': 63.5,
    'Fat(g)': 147.8,
  },
]

function App() {
  const [insights, setInsights] = useState(() =>
    placeholderInsightApiRows.map((row) => ({ ...nutritionInsightModel, ...toNutritionInsight(row) })),
  )
  const [recipes, setRecipes] = useState(() =>
    placeholderRecipeApiRows.map((row) => ({ ...recipeModel, ...toRecipe(row) })),
  )
  const [clusters, setClusters] = useState(() =>
    placeholderClusterApiRows.map((row) => ({ ...clusterModel, ...toCluster(row) })),
  )
  const [filters, setFilters] = useState(() => ({ ...filterPaginationModel }))
  const [apiStatus, setApiStatus] = useState('Backend API placeholder mode.')
  const [activeDataset, setActiveDataset] = useState('insights')

  const dietOptions = useMemo(() => {
    const optionSet = new Set(insights.map((item) => item.dietType).filter(Boolean))
    return ['all', ...optionSet]
  }, [insights])

  const filteredInsights = useMemo(() => {
    const searchValue = filters.searchDietType.trim().toLowerCase()
    return insights.filter((item) => {
      const matchesSearch = item.dietType.toLowerCase().includes(searchValue)
      const matchesSelect =
        filters.selectedDietType === 'all' || item.dietType === filters.selectedDietType
      return matchesSearch && matchesSelect
    })
  }, [filters.searchDietType, filters.selectedDietType, insights])

  const paginationMeta = useMemo(() => {
    const totalItems = filteredInsights.length
    const totalPages = Math.max(1, Math.ceil(totalItems / filters.pageSize))
    const safeCurrentPage = Math.min(filters.currentPage, totalPages)
    return {
      ...pageMetaModel,
      totalItems,
      totalPages,
      currentPage: safeCurrentPage,
      pageSize: filters.pageSize,
    }
  }, [filteredInsights.length, filters.currentPage, filters.pageSize])

  const pagedInsights = useMemo(() => {
    const startIndex = (paginationMeta.currentPage - 1) * paginationMeta.pageSize
    const endIndex = startIndex + paginationMeta.pageSize
    return filteredInsights.slice(startIndex, endIndex)
  }, [filteredInsights, paginationMeta.currentPage, paginationMeta.pageSize])

  const handleSearchChange = (event) => {
    const value = event.target.value
    setFilters((previous) => ({ ...previous, searchDietType: value, currentPage: 1 }))
  }

  const handleDietTypeChange = (event) => {
    const value = event.target.value
    setFilters((previous) => ({ ...previous, selectedDietType: value, currentPage: 1 }))
  }

  const goToPreviousPage = () => {
    setFilters((previous) => ({
      ...previous,
      currentPage: Math.max(1, previous.currentPage - 1),
    }))
  }

  const goToNextPage = () => {
    setFilters((previous) => ({
      ...previous,
      currentPage: Math.min(paginationMeta.totalPages, previous.currentPage + 1),
    }))
  }

  const handleGetInsights = () => {
    setInsights(
      placeholderInsightApiRows.map((row) => ({ ...nutritionInsightModel, ...toNutritionInsight(row) })),
    )
    setActiveDataset('insights')
    setApiStatus('Insights loaded from placeholder data. Backend API will replace this.')
  }

  const handleGetRecipes = () => {
    setRecipes(placeholderRecipeApiRows.map((row) => ({ ...recipeModel, ...toRecipe(row) })))
    setActiveDataset('recipes')
    setApiStatus(`Recipes placeholder loaded (${placeholderRecipeApiRows.length} records).`)
  }

  const handleGetClusters = () => {
    setClusters(placeholderClusterApiRows.map((row) => ({ ...clusterModel, ...toCluster(row) })))
    setActiveDataset('clusters')
    setApiStatus(`Clusters placeholder loaded (${placeholderClusterApiRows.length} records).`)
  }

  return (
    <div className="app-page">
      <header className="app-header">
        <h1>Nutritional Insights</h1>
      </header>

      <main className="app-content">
        <section className="section-block">
          <h2>Explore Nutritional Insights</h2>
          <div className="charts-grid">
            <article className="chart-card">
              <h3>Bar Chart</h3>
              <p>Average macronutrient content by diet type.</p>
            </article>
            <article className="chart-card">
              <h3>Scatter Plot</h3>
              <p>Nutrient relationships (e.g., protein vs carbs).</p>
            </article>
            <article className="chart-card">
              <h3>Heatmap</h3>
              <p>Nutrient correlations.</p>
            </article>
            <article className="chart-card">
              <h3>Pie Chart</h3>
              <p>Recipe distribution by diet type.</p>
            </article>
          </div>
        </section>

        <section className="section-block">
          <h2>Filters and Data Interaction</h2>
          <FilterControls
            searchValue={filters.searchDietType}
            selectedDietType={filters.selectedDietType}
            dietOptions={dietOptions}
            onSearchChange={handleSearchChange}
            onDietTypeChange={handleDietTypeChange}
          />
        </section>

        <section className="section-block">
          <h2>API Data Interaction</h2>
          <ApiActionControls
            onGetInsights={handleGetInsights}
            onGetRecipes={handleGetRecipes}
            onGetClusters={handleGetClusters}
            apiStatus={apiStatus}
            recipeCount={recipes.length}
            clusterCount={clusters.length}
          />
        </section>

        <section className="section-block">
          <h2>Pagination</h2>
          <DataPreviewPanel
            activeDataset={activeDataset}
            insightsPage={pagedInsights}
            recipes={recipes}
            clusters={clusters}
            paginationMeta={paginationMeta}
          />
          <PaginationControls
            currentPage={paginationMeta.currentPage}
            totalPages={paginationMeta.totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
            onPageSelect={(page) =>
              setFilters((previous) => ({ ...previous, currentPage: page }))
            }
          />
          
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2025 Nutritional Insights. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App
