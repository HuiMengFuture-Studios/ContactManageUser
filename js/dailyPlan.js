$(document).ready(function () {
  // Fetch and display all daily plans
  fetchDailyPlans();

  // Handle form submission for adding or updating a daily plan
  $('#dailyPlanForm').on('submit', function (event) {
    event.preventDefault();
    const dailyPlanId = $('#dailyPlanId').val();
    const dailyPlanData = {
      date: $('#date').val(),
      tasks: $('#tasks').val()
    };

    if (dailyPlanId) {
      // Update existing daily plan
      updateDailyPlan(dailyPlanId, dailyPlanData);
    } else {
      // Create new daily plan
      createDailyPlan(dailyPlanData);
    }
  });

  // Fetch and display all daily plans
  function fetchDailyPlans() {
    fetch('http://localhost:3000/api/dailyPlan')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#dailyPlansTableBody');
        tableBody.empty();
        data.forEach(dailyPlan => {
          const row = `
            <tr>
              <td>${dailyPlan.date}</td>
              <td>${dailyPlan.tasks}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-daily-plan" data-id="${dailyPlan.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-daily-plan" data-id="${dailyPlan.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-daily-plan').on('click', function () {
          const dailyPlanId = $(this).data('id');
          fetch(`http://localhost:3000/api/dailyPlan/${dailyPlanId}`)
            .then(response => response.json())
            .then(dailyPlan => {
              $('#dailyPlanId').val(dailyPlan.id);
              $('#date').val(dailyPlan.date);
              $('#tasks').val(dailyPlan.tasks);
            });
        });

        $('.delete-daily-plan').on('click', function () {
          const dailyPlanId = $(this).data('id');
          deleteDailyPlan(dailyPlanId);
        });
      })
      .catch(error => {
        console.error('Error fetching daily plans:', error);
      });
  }

  // Create a new daily plan
  function createDailyPlan(dailyPlanData) {
    fetch('http://localhost:3000/api/dailyPlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dailyPlanData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Daily plan created:', data);
        fetchDailyPlans(); // Refresh the daily plan list
        $('#dailyPlanForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating daily plan:', error);
      });
  }

  // Update an existing daily plan
  function updateDailyPlan(dailyPlanId, dailyPlanData) {
    fetch(`http://localhost:3000/api/dailyPlan/${dailyPlanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dailyPlanData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Daily plan updated:', data);
        fetchDailyPlans(); // Refresh the daily plan list
        $('#dailyPlanForm')[0].reset(); // Clear the form
        $('#dailyPlanId').val(''); // Reset the daily plan ID
      })
      .catch(error => {
        console.error('Error updating daily plan:', error);
      });
  }

  // Delete a daily plan
  function deleteDailyPlan(dailyPlanId) {
    fetch(`http://localhost:3000/api/dailyPlan/${dailyPlanId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Daily plan deleted');
          fetchDailyPlans(); // Refresh the daily plan list
        } else {
          console.error('Error deleting daily plan');
        }
      })
      .catch(error => {
        console.error('Error deleting daily plan:', error);
      });
  }
});
