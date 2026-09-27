document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxes = document.querySelectorAll('.category');
    const filterButton = document.getElementById('filter-recipes');
    const recipeContainer = document.getElementById('recipe-container');

    async function fetchRecipes() {
        const response = await fetch('https://script.google.com/macros/s/AKfycbydwYUrLMxsxxlnSzA2qhAw8lINdLCnU22j1nrycBe2OaNFSfWHg0FfwsS5rfza7Md8/exec');
        const recipes = await response.json();
        return recipes;
    }

    function filterRecipes(recipes) {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredRecipes = recipes.filter(recipe => {
            return selectedCategories.every(category => recipe.categories.includes(category));
        });

        displayRecipes(filteredRecipes);
    }

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';
        if (recipes.length === 0) {
            recipeContainer.innerHTML = '<p>No recipes found matching the selected criteria.</p>';
        } else {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.innerHTML = `<a href="${recipe.url}" target="_blank">${recipe.title}</a>`;
                recipeContainer.appendChild(recipeElement);
            });
        }
    }

    fetchRecipes().then(recipes => {
        displayRecipes(recipes);
        filterButton.addEventListener('click', () => filterRecipes(recipes));
    });
});
