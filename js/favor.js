$(document).ready(function () {
  // Fetch and display all favors
  fetchFavors();
  // Fetch and populate contact options
  fetchContacts();

  // Handle form submission for adding or updating a favor
  $('#favorForm').on('submit', function (event) {
    event.preventDefault();
    const favorId = $('#favorId').val();
    const favorData = {
      contactId: parseInt($('#contactId').val(), 10),
      amount: parseFloat($('#amount').val()),
      description: $('#description').val(),
      date: $('#date').val(),
      status: $('#status').val(),
      isReturned: $('#isReturned').val() === 'true'
    };

    if (favorId) {
      // Update existing favor
      updateFavor(favorId, favorData);
    } else {
      // Create new favor
      createFavor(favorData);
    }
  });

  // Fetch and display all favors
  function fetchFavors() {
    fetch('http://localhost:3000/api/favors')
      .then(response => response.json())
      .then(favors => {
        fetch('http://localhost:3000/api/contacts')
          .then(response => response.json())
          .then(contacts => {
            const contactMap = contacts.reduce((map, contact) => {
              map[contact.id] = contact.name;
              return map;
            }, {});

            const tableBody = $('#favorsTableBody');
            tableBody.empty();
            favors.forEach(favor => {
              const formattedDate = formatDate(favor.date);
              const row = `
                <tr>
                  <td>${contactMap[favor.contactId]}</td>
                  <td>${favor.amount.toFixed(2)}</td>
                  <td>${favor.description}</td>
                  <td>${formattedDate}</td>
                  <td>${favor.status}</td>
                  <td>${favor.isReturned ? '已归还' : '未归还'}</td>
                  <td>
                    <button class="btn btn-sm btn-primary edit-favor" data-id="${favor.id}">编辑</button>
                    <button class="btn btn-sm btn-danger delete-favor" data-id="${favor.id}">删除</button>
                  </td>
                </tr>
              `;
              tableBody.append(row);
            });

            // Add event listeners for edit and delete buttons
            $('.edit-favor').on('click', function () {
              const favorId = $(this).data('id');
              fetch(`http://localhost:3000/api/favors/${favorId}`)
                .then(response => response.json())
                .then(favor => {
                  $('#favorId').val(favor.id);
                  $('#contactId').val(favor.contactId);
                  $('#amount').val(favor.amount);
                  $('#description').val(favor.description);
                  $('#date').val(favor.date);
                  $('#status').val(favor.status);
                  $('#isReturned').val(favor.isReturned.toString());
                });
            });

            $('.delete-favor').on('click', function () {
              const favorId = $(this).data('id');
              deleteFavor(favorId);
            });
          })
          .catch(error => {
            console.error('Error fetching contacts:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching favors:', error);
      });
  }

  // Fetch and populate contact options
  function fetchContacts() {
    fetch('http://localhost:3000/api/contacts')
      .then(response => response.json())
      .then(data => {
        const contactSelect = $('#contactId');
        contactSelect.empty();
        data.forEach(contact => {
          const option = `<option value="${contact.id}">${contact.name}</option>`;
          contactSelect.append(option);
        });
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }

  // Create a new favor
  function createFavor(favorData) {
    fetch('http://localhost:3000/api/favors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favorData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Favor created:', data);
        fetchFavors(); // Refresh the favor list
        $('#favorForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating favor:', error);
      });
  }

  // Update an existing favor
  function updateFavor(favorId, favorData) {
    fetch(`http://localhost:3000/api/favors/${favorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favorData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Favor updated:', data);
        fetchFavors(); // Refresh the favor list
        $('#favorForm')[0].reset(); // Clear the form
        $('#favorId').val(''); // Reset the favor ID
      })
      .catch(error => {
        console.error('Error updating favor:', error);
      });
  }

  // Delete a favor
  function deleteFavor(favorId) {
    fetch(`http://localhost:3000/api/favors/${favorId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Favor deleted');
          fetchFavors(); // Refresh the favor list
        } else {
          console.error('Error deleting favor');
        }
      })
      .catch(error => {
        console.error('Error deleting favor:', error);
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
