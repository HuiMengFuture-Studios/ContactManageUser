$(document).ready(function () {
  // Fetch and display all annual plans
  fetchAnnualPlans();

  // Handle form submission for adding or updating an annual plan
  $('#annualPlanForm').on('submit', function (event) {
    event.preventDefault();
    const annualPlanId = $('#annualPlanId').val();
    const annualPlanData = {
      year: parseInt($('#year').val(), 10),
      goals: $('#goals').val()
    };

    if (annualPlanId) {
      // Update existing annual plan
      updateAnnualPlan(annualPlanId, annualPlanData);
    } else {
      // Create new annual plan
      createAnnualPlan(annualPlanData);
    }
  });

  // Fetch and display all annual plans
  function fetchAnnualPlans() {
    fetch('http://localhost:3000/api/annualPlan')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#annualPlansTableBody');
        tableBody.empty();
        data.forEach(annualPlan => {
          const row = `
            <tr>
              <td>${annualPlan.year}</td>
              <td>${annualPlan.goals}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-annual-plan" data-id="${annualPlan.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-annual-plan" data-id="${annualPlan.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-annual-plan').on('click', function () {
          const annualPlanId = $(this).data('id');
          fetch(`http://localhost:3000/api/annualPlan/${annualPlanId}`)
            .then(response => response.json())
            .then(annualPlan => {
              $('#annualPlanId').val(annualPlan.id);
              $('#year').val(annualPlan.year);
              $('#goals').val(annualPlan.goals);
            });
        });

        $('.delete-annual-plan').on('click', function () {
          const annualPlanId = $(this).data('id');
          deleteAnnualPlan(annualPlanId);
        });
      })
      .catch(error => {
        console.error('Error fetching annual plans:', error);
      });
  }

  // Create a new annual plan
  function createAnnualPlan(annualPlanData) {
    fetch('http://localhost:3000/api/annualPlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annualPlanData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Annual plan created:', data);
        fetchAnnualPlans(); // Refresh the annual plan list
        $('#annualPlanForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating annual plan:', error);
      });
  }

  // Update an existing annual plan
  function updateAnnualPlan(annualPlanId, annualPlanData) {
    fetch(`http://localhost:3000/api/annualPlan/${annualPlanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annualPlanData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Annual plan updated:', data);
        fetchAnnualPlans(); // Refresh the annual plan list
        $('#annualPlanForm')[0].reset(); // Clear the form
        $('#annualPlanId').val(''); // Reset the annual plan ID
      })
      .catch(error => {
        console.error('Error updating annual plan:', error);
      });
  }

  // Delete an annual plan
  function deleteAnnualPlan(annualPlanId) {
    fetch(`http://localhost:3000/api/annualPlan/${annualPlanId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Annual plan deleted');
          fetchAnnualPlans(); // Refresh the annual plan list
        } else {
          console.error('Error deleting annual plan');
        }
      })
      .catch(error => {
        console.error('Error deleting annual plan:', error);
      });
  }
});
