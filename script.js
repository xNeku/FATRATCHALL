document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const mealForm = document.getElementById('meal-form');
    const mealNameInput = document.getElementById('meal-name');
    const mealIngredientsInput = document.getElementById('meal-ingredients');
    const mealList = document.getElementById('meal-list');

    // Función para obtener las comidas del localStorage
    const getMeals = () => {
        // Si no hay nada, empieza con tu batido de ejemplo
        const initialMeal = [{
            id: 1,
            name: 'Batido 1',
            ingredients: '2 plátanos\n3 cucharadones de yogurt light\n2 scoops de prote\n2 de creatina\ntaza de leche\ntaza de agua\n= 35g de prote'
        }];
        const meals = localStorage.getItem('meals');
        return meals ? JSON.parse(meals) : initialMeal;
    };

    // Función para guardar las comidas en el localStorage
    const saveMeals = (meals) => {
        localStorage.setItem('meals', JSON.stringify(meals));
    };

    // Función para renderizar (mostrar) una comida en la página
    const renderMeal = (meal) => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.setAttribute('data-id', meal.id);

        mealCard.innerHTML = `
            <h3>${meal.name}</h3>
            <p>${meal.ingredients}</p>
            <button class="delete-btn" title="Eliminar comida">X</button>
        `;

        mealList.appendChild(mealCard);
    };
    
    // Función para cargar y mostrar todas las comidas guardadas
    const loadMeals = () => {
        mealList.innerHTML = ''; // Limpia la lista antes de volver a pintarla
        const meals = getMeals();
        meals.forEach(meal => renderMeal(meal));
    };

    // Event Listener para el envío del formulario (añadir nueva comida)
    mealForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const name = mealNameInput.value.trim();
        const ingredients = mealIngredientsInput.value.trim();

        if (name === '' || ingredients === '') {
            alert('Por favor, rellena ambos campos.');
            return;
        }

        const newMeal = {
            id: Date.now(), // ID único basado en la fecha y hora actual
            name: name,
            ingredients: ingredients
        };

        const meals = getMeals();
        meals.push(newMeal);
        saveMeals(meals);

        renderMeal(newMeal); // Añade la nueva comida a la vista sin recargar
        
        // Limpia los campos del formulario
        mealNameInput.value = '';
        mealIngredientsInput.value = '';
    });

    // Event Listener para eliminar una comida (usando delegación de eventos)
    mealList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const card = e.target.closest('.meal-card');
            const mealId = Number(card.getAttribute('data-id'));
            
            // Eliminar del DOM
            card.remove();

            // Eliminar del localStorage
            let meals = getMeals();
            meals = meals.filter(meal => meal.id !== mealId);
            saveMeals(meals);
        }
    });

    // Carga inicial de las comidas al abrir la página
    loadMeals();
});
