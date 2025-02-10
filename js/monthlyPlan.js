$(document).ready(function () {
  // Fetch and display all monthly plans
  fetchMonthlyPlans();

  // Handle form submission for adding or updating a monthly plan
  $('#monthlyPlanForm').on('submit', function (event) {
    event.preventDefault();
    const monthlyPlanId = $('#monthlyPlanId').val();
    const monthlyPlanData = {
      month: $('#month').val(),
      goals: $('#goals').val()
    };

    if (monthlyPlanId) {
      // Update existing monthly plan
      updateMonthlyPlan(monthlyPlanId, monthlyPlanData);
    } else {
      // Create new monthly plan
      createMonthlyPlan(monthlyPlanData);
    }
  });

  // Fetch and display all monthly plans
  function fetchMonthlyPlans() {
    fetch('http://localhost:3000/api/monthlyPlan')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#monthlyPlansTableBody');
        tableBody.empty();
        data.forEach(monthlyPlan => {
          const row = `
            <tr>
              <td>${monthlyPlan.month}</td>
              <td>${monthlyPlan.goals}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-monthly-plan" data-id="${monthlyPlan.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-monthly-plan" data-id="${monthlyPlan.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-monthly-plan').on('click', function () {
          const monthlyPlanId = $(this).data('id');
          fetch(`http://localhost:3000/api/monthlyPlan/${monthlyPlanId}`)
            .then(response => response.json())
            .then(monthlyPlan => {
              $('#monthlyPlanId').val(monthlyPlan.id);
              $('#month').val(monthlyPlan.month);
              $('#goals').val(monthlyPlan.goals);
            });
        });

        $('.delete-monthly-plan').on('click', function () {
          const monthlyPlanId = $(this).data('id');
          deleteMonthlyPlan(monthlyPlanId);
        });
      })
      .catch(error => {
        console.error('Error fetching monthly plans:', error);
      });
  }

  // Create a new monthly plan
  function createMonthlyPlan(monthlyPlanData) {
    fetch('http://localhost:3000/api/monthlyPlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monthlyPlanData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Monthly plan created:', data);
        fetchMonthlyPlans(); // Refresh the monthly plan list
        $('#monthlyPlanForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating monthly plan:', error);
      });
  }

  // Update an existing monthly plan
  function updateMonthlyPlan(monthlyPlanId, monthlyPlanData) {
    fetch(`http://localhost:3000/api/monthlyPlan/${monthlyPlanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monthlyPlanData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Monthly plan updated:', data);
        fetchMonthlyPlans(); // Refresh the monthly plan list
        $('#monthlyPlanForm')[0].reset(); // Clear the form
        $('#monthlyPlanId').val(''); // Reset the monthly plan ID
      })
      .catch(error => {
        console.error('Error updating monthly plan:', error);
      });
  }

  // Delete a monthly plan
  function deleteMonthlyPlan(monthlyPlanId) {
    fetch(`http://localhost:3000/api/monthlyPlan/${monthlyPlanId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Monthly plan deleted');
          fetchMonthlyPlans(); // Refresh the monthly plan list
        } else {
          console.error('Error deleting monthly plan');
        }
      })
      .catch(error => {
        console.error('Error deleting monthly plan:', error);
      });
  }
});
