$(document).ready(function () {
  // Fetch and display all monthly summaries
  fetchMonthlySummaries();

  // Handle form submission for adding or updating a monthly summary
  $('#monthlySummaryForm').on('submit', function (event) {
    event.preventDefault();
    const monthlySummaryId = $('#monthlySummaryId').val();
    const monthlySummaryData = {
      month: $('#month').val(),
      summary: $('#summary').val()
    };

    if (monthlySummaryId) {
      // Update existing monthly summary
      updateMonthlySummary(monthlySummaryId, monthlySummaryData);
    } else {
      // Create new monthly summary
      createMonthlySummary(monthlySummaryData);
    }
  });

  // Fetch and display all monthly summaries
  function fetchMonthlySummaries() {
    fetch('http://localhost:3000/api/monthlySummary')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#monthlySummariesTableBody');
        tableBody.empty();
        data.forEach(monthlySummary => {
          const row = `
            <tr>
              <td>${monthlySummary.month}</td>
              <td>${monthlySummary.summary}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-monthly-summary" data-id="${monthlySummary.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-monthly-summary" data-id="${monthlySummary.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-monthly-summary').on('click', function () {
          const monthlySummaryId = $(this).data('id');
          fetch(`http://localhost:3000/api/monthlySummary/${monthlySummaryId}`)
            .then(response => response.json())
            .then(monthlySummary => {
              $('#monthlySummaryId').val(monthlySummary.id);
              $('#month').val(monthlySummary.month);
              $('#summary').val(monthlySummary.summary);
            });
        });

        $('.delete-monthly-summary').on('click', function () {
          const monthlySummaryId = $(this).data('id');
          deleteMonthlySummary(monthlySummaryId);
        });
      })
      .catch(error => {
        console.error('Error fetching monthly summaries:', error);
      });
  }

  // Create a new monthly summary
  function createMonthlySummary(monthlySummaryData) {
    fetch('http://localhost:3000/api/monthlySummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monthlySummaryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Monthly summary created:', data);
        fetchMonthlySummaries(); // Refresh the monthly summary list
        $('#monthlySummaryForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating monthly summary:', error);
      });
  }

  // Update an existing monthly summary
  function updateMonthlySummary(monthlySummaryId, monthlySummaryData) {
    fetch(`http://localhost:3000/api/monthlySummary/${monthlySummaryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monthlySummaryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Monthly summary updated:', data);
        fetchMonthlySummaries(); // Refresh the monthly summary list
        $('#monthlySummaryForm')[0].reset(); // Clear the form
        $('#monthlySummaryId').val(''); // Reset the monthly summary ID
      })
      .catch(error => {
        console.error('Error updating monthly summary:', error);
      });
  }

  // Delete a monthly summary
  function deleteMonthlySummary(monthlySummaryId) {
    fetch(`http://localhost:3000/api/monthlySummary/${monthlySummaryId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Monthly summary deleted');
          fetchMonthlySummaries(); // Refresh the monthly summary list
        } else {
          console.error('Error deleting monthly summary');
        }
      })
      .catch(error => {
        console.error('Error deleting monthly summary:', error);
      });
  }
});
