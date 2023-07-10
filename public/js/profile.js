renderChart();

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#food-name').value.trim();
  const food_amount = document.querySelector('#food-weight').value.trim();

  if (name && food_amount) {
    const edamamAPIResponse = await fetch(`/api/edamam`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        food_amount,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (edamamAPIResponse.ok) {
      const edamamAPIResponseParsed = await edamamAPIResponse.json();
      console.log(edamamAPIResponseParsed);
      const protein =
        edamamAPIResponseParsed?.totalNutrients?.PROCNT?.quantity || 0;
      const calories = edamamAPIResponseParsed?.calories || 0;
      const fat = edamamAPIResponseParsed?.totalNutrients?.FAT?.quantity || 0;
      const carbs =
        edamamAPIResponseParsed?.totalNutrients['CHOCDF.net']?.quantity || 0;

      const response = await fetch(`/api/foods`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          food_amount,
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

async function renderChart() {
  const response = await fetch(`/api/getTotals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });
  console.log(response);
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Carbohydrates', 'Fats', 'Protein'],
      datasets: [
        {
          label: '# of grams',
          data: [response.totalCarbs, response.totalFat, response.totalProtein],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: false,
      // scales: {
      //   y: {
      //     gridLines: {
      //       display:false
      //     },
      //     beginAtZero: true
      //   }
      // }
    },
  });
}

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
