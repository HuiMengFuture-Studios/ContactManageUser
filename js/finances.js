$(document).ready(function () {
  // Fetch and display all finance records
  fetchFinanceRecords();

  // Handle form submission for adding or updating a finance record
  $('#financeForm').on('submit', function (event) {
    event.preventDefault();
    const financeId = $('#financeId').val();
    const financeData = {
      amount: parseFloat($('#amount').val()),
      description: $('#description').val(),
      date: $('#date').val(),
      type: $('#type').val()
    };

    if (financeId) {
      // Update existing finance record
      updateFinanceRecord(financeId, financeData);
    } else {
      // Create new finance record
      createFinanceRecord(financeData);
    }
  });

  // Fetch and display all finance records
  function fetchFinanceRecords() {
    fetch('http://localhost:3000/api/finances')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#financeTableBody');
        tableBody.empty();
        data.forEach(financeRecord => {
          const formattedDate = formatDate(financeRecord.date);
          const row = `
            <tr>
              <td>${financeRecord.amount.toFixed(2)}</td>
              <td>${financeRecord.description}</td>
              <td>${formattedDate}</td>
              <td>${financeRecord.type === 'income' ? '收入' : '支出'}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-finance-record" data-id="${financeRecord.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-finance-record" data-id="${financeRecord.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-finance-record').on('click', function () {
          const financeId = $(this).data('id');
          fetch(`http://localhost:3000/api/finances/${financeId}`)
            .then(response => response.json())
            .then(financeRecord => {
              $('#financeId').val(financeRecord.id);
              $('#amount').val(financeRecord.amount);
              $('#description').val(financeRecord.description);
              $('#date').val(financeRecord.date);
              $('#type').val(financeRecord.type);
            });
        });

        $('.delete-finance-record').on('click', function () {
          const financeId = $(this).data('id');
          deleteFinanceRecord(financeId);
        });
      })
      .catch(error => {
        console.error('Error fetching finance records:', error);
      });
  }

  // Create a new finance record
  function createFinanceRecord(financeData) {
    fetch('http://localhost:3000/api/finances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(financeData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Finance record created:', data);
        fetchFinanceRecords(); // Refresh the finance record list
        $('#financeForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating finance record:', error);
      });
  }

  // Update an existing finance record
  function updateFinanceRecord(financeId, financeData) {
    fetch(`http://localhost:3000/api/finances/${financeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(financeData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Finance record updated:', data);
        fetchFinanceRecords(); // Refresh the finance record list
        $('#financeForm')[0].reset(); // Clear the form
        $('#financeId').val(''); // Reset the finance record ID
      })
      .catch(error => {
        console.error('Error updating finance record:', error);
      });
  }

  // Delete a finance record
  function deleteFinanceRecord(financeId) {
    fetch(`http://localhost:3000/api/finances/${financeId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Finance record deleted');
          fetchFinanceRecords(); // Refresh the finance record list
        } else {
          console.error('Error deleting finance record');
        }
      })
      .catch(error => {
        console.error('Error deleting finance record:', error);
      });
  }

  // Function to format date to yyyy-mm-dd hh:mm:ss
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
});
