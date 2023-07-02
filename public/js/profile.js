const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#food-name').value.trim();
  const food_weight = document.querySelector('#food-weight').value.trim();

  if (name && food_weight) {
    const edamamAPIResponse = await fetch (`/api/edamam` , {
      method: 'POST',
      body: JSON.stringify({ 
        name, 
        food_weight,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if ( edamamAPIResponse.ok){
      const edamamAPIResponseParsed = await edamamAPIResponse.json();
      console.log(edamamAPIResponseParsed);
      const protein = edamamAPIResponseParsed.totalNutrients.PROCNT.quantity;
      const calories = edamamAPIResponseParsed.calories;
      const fat = edamamAPIResponseParsed.totalNutrients.FAT.quantity;
      const carbs = edamamAPIResponseParsed.totalNutrients['CHOCDF.net'].quantity;

      const response = await fetch(`/api/foods`, {
        method: 'POST',
        body: JSON.stringify({ 
          name, 
          food_weight,
          protein,
          calories,
          fat,
          carbs,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create food');
      }
    } else {
      alert('Failed to create food');
    }
    
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/foods/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete food');
    }
  }
};

document
  .querySelector('.new-food-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.food-list')
  .addEventListener('click', delButtonHandler);
