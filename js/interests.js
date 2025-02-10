$(document).ready(function () {
  // Fetch and display all interests
  fetchInterests();

  // Handle form submission for adding or updating an interest
  $('#interestForm').on('submit', function (event) {
    event.preventDefault();
    const interestId = $('#interestId').val();
    const interestData = {
      name: $('#name').val(),
      category: $('#category').val(),
      description: $('#description').val()
    };

    if (interestId) {
      // Update existing interest
      updateInterest(interestId, interestData);
    } else {
      // Create new interest
      createInterest(interestData);
    }
  });

  // Fetch and display all interests
  function fetchInterests() {
    fetch('http://localhost:3000/api/interests')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#interestsTableBody');
        tableBody.empty();
        data.forEach(interest => {
          const row = `
            <tr>
              <td>${interest.name}</td>
              <td>${interest.category === 'hobby' ? '爱好' : '食物'}</td>
              <td>${interest.description}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-interest" data-id="${interest.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-interest" data-id="${interest.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-interest').on('click', function () {
          const interestId = $(this).data('id');
          fetch(`http://localhost:3000/api/interests/${interestId}`)
            .then(response => response.json())
            .then(interest => {
              $('#interestId').val(interest.id);
              $('#name').val(interest.name);
              $('#category').val(interest.category);
              $('#description').val(interest.description);
            });
        });

        $('.delete-interest').on('click', function () {
          const interestId = $(this).data('id');
          deleteInterest(interestId);
        });
      })
      .catch(error => {
        console.error('Error fetching interests:', error);
      });
  }

  // Create a new interest
  function createInterest(interestData) {
    fetch('http://localhost:3000/api/interests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interestData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Interest created:', data);
        fetchInterests(); // Refresh the interest list
        $('#interestForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating interest:', error);
      });
  }

  // Update an existing interest
  function updateInterest(interestId, interestData) {
    fetch(`http://localhost:3000/api/interests/${interestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interestData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Interest updated:', data);
        fetchInterests(); // Refresh the interest list
        $('#interestForm')[0].reset(); // Clear the form
        $('#interestId').val(''); // Reset the interest ID
      })
      .catch(error => {
        console.error('Error updating interest:', error);
      });
  }

  // Delete an interest
  function deleteInterest(interestId) {
    fetch(`http://localhost:3000/api/interests/${interestId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Interest deleted');
          fetchInterests(); // Refresh the interest list
        } else {
          console.error('Error deleting interest');
        }
      })
      .catch(error => {
        console.error('Error deleting interest:', error);
      });
  }
});
