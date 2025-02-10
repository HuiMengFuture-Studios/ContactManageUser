$(document).ready(function () {
  // Fetch and display all annual summaries
  fetchAnnualSummaries();

  // Handle form submission for adding or updating an annual summary
  $('#annualSummaryForm').on('submit', function (event) {
    event.preventDefault();
    const annualSummaryId = $('#annualSummaryId').val();
    const annualSummaryData = {
      year: parseInt($('#year').val(), 10),
      summary: $('#summary').val()
    };

    if (annualSummaryId) {
      // Update existing annual summary
      updateAnnualSummary(annualSummaryId, annualSummaryData);
    } else {
      // Create new annual summary
      createAnnualSummary(annualSummaryData);
    }
  });

  // Fetch and display all annual summaries
  function fetchAnnualSummaries() {
    fetch('http://localhost:3000/api/annualSummary')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#annualSummariesTableBody');
        tableBody.empty();
        data.forEach(annualSummary => {
          const row = `
            <tr>
              <td>${annualSummary.year}</td>
              <td>${annualSummary.summary}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-annual-summary" data-id="${annualSummary.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-annual-summary" data-id="${annualSummary.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-annual-summary').on('click', function () {
          const annualSummaryId = $(this).data('id');
          fetch(`http://localhost:3000/api/annualSummary/${annualSummaryId}`)
            .then(response => response.json())
            .then(annualSummary => {
              $('#annualSummaryId').val(annualSummary.id);
              $('#year').val(annualSummary.year);
              $('#summary').val(annualSummary.summary);
            });
        });

        $('.delete-annual-summary').on('click', function () {
          const annualSummaryId = $(this).data('id');
          deleteAnnualSummary(annualSummaryId);
        });
      })
      .catch(error => {
        console.error('Error fetching annual summaries:', error);
      });
  }

  // Create a new annual summary
  function createAnnualSummary(annualSummaryData) {
    fetch('http://localhost:3000/api/annualSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annualSummaryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Annual summary created:', data);
        fetchAnnualSummaries(); // Refresh the annual summary list
        $('#annualSummaryForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating annual summary:', error);
      });
  }

  // Update an existing annual summary
  function updateAnnualSummary(annualSummaryId, annualSummaryData) {
    fetch(`http://localhost:3000/api/annualSummary/${annualSummaryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annualSummaryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Annual summary updated:', data);
        fetchAnnualSummaries(); // Refresh the annual summary list
        $('#annualSummaryForm')[0].reset(); // Clear the form
        $('#annualSummaryId').val(''); // Reset the annual summary ID
      })
      .catch(error => {
        console.error('Error updating annual summary:', error);
      });
  }

  // Delete an annual summary
  function deleteAnnualSummary(annualSummaryId) {
    fetch(`http://localhost:3000/api/annualSummary/${annualSummaryId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Annual summary deleted');
          fetchAnnualSummaries(); // Refresh the annual summary list
        } else {
          console.error('Error deleting annual summary');
        }
      })
      .catch(error => {
        console.error('Error deleting annual summary:', error);
      });
  }
});
