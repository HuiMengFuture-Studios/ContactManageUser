$(document).ready(function () {
  // Fetch and display all daily summaries
  fetchDailySummaries();

  // Handle form submission for adding or updating a daily summary
  $('#dailySummaryForm').on('submit', function (event) {
    event.preventDefault();
    const dailySummaryId = $('#dailySummaryId').val();
    const dailySummaryData = {
      date: $('#date').val(),
      summary: $('#summary').val()
    };

    if (dailySummaryId) {
      // Update existing daily summary
      updateDailySummary(dailySummaryId, dailySummaryData);
    } else {
      // Create new daily summary
      createDailySummary(dailySummaryData);
    }
  });

  // Fetch and display all daily summaries
  function fetchDailySummaries() {
    fetch('http://localhost:3000/api/dailySummary')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#dailySummariesTableBody');
        tableBody.empty();
        data.forEach(dailySummary => {
          const row = `
            <tr>
              <td>${dailySummary.date}</td>
              <td>${dailySummary.summary}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-daily-summary" data-id="${dailySummary.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-daily-summary" data-id="${dailySummary.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-daily-summary').on('click', function () {
          const dailySummaryId = $(this).data('id');
          fetch(`http://localhost:3000/api/dailySummary/${dailySummaryId}`)
            .then(response => response.json())
            .then(dailySummary => {
              $('#dailySummaryId').val(dailySummary.id);
              $('#date').val(dailySummary.date);
              $('#summary').val(dailySummary.summary);
            });
        });

        $('.delete-daily-summary').on('click', function () {
          const dailySummaryId = $(this).data('id');
          deleteDailySummary(dailySummaryId);
        });
      })
      .catch(error => {
        console.error('Error fetching daily summaries:', error);
      });
  }

  // Create a new daily summary
  function createDailySummary(dailySummaryData) {
    fetch('http://localhost:3000/api/dailySummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dailySummaryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Daily summary created:', data);
        fetchDailySummaries(); // Refresh the daily summary list
        $('#dailySummaryForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating daily summary:', error);
      });
  }

  // Update an existing daily summary
  function updateDailySummary(dailySummaryId, dailySummaryData) {
    fetch(`http://localhost:3000/api/dailySummary/${dailySummaryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dailySummaryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Daily summary updated:', data);
        fetchDailySummaries(); // Refresh the daily summary list
        $('#dailySummaryForm')[0].reset(); // Clear the form
        $('#dailySummaryId').val(''); // Reset the daily summary ID
      })
      .catch(error => {
        console.error('Error updating daily summary:', error);
      });
  }

  // Delete a daily summary
  function deleteDailySummary(dailySummaryId) {
    fetch(`http://localhost:3000/api/dailySummary/${dailySummaryId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Daily summary deleted');
          fetchDailySummaries(); // Refresh the daily summary list
        } else {
          console.error('Error deleting daily summary');
        }
      })
      .catch(error => {
        console.error('Error deleting daily summary:', error);
      });
  }
});
