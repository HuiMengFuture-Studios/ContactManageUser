$(document).ready(function () {
  // Fetch and display all transactions
  fetchTransactions();

  // Handle form submission for adding or updating a transaction
  $('#transactionForm').on('submit', function (event) {
    event.preventDefault();
    const transactionId = $('#transactionId').val();
    const transactionData = {
      title: $('#title').val(),
      description: $('#description').val(),
      dueDate: $('#dueDate').val()
    };

    if (transactionId) {
      // Update existing transaction
      updateTransaction(transactionId, transactionData);
    } else {
      // Create new transaction
      createTransaction(transactionData);
    }
  });

  // Fetch and display all transactions
  function fetchTransactions() {
    fetch('http://localhost:3000/api/transactions')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#transactionsTableBody');
        tableBody.empty();
        data.forEach(transaction => {
          const row = `
            <tr>
              <td>${transaction.title}</td>
              <td>${transaction.description}</td>
              <td>${transaction.dueDate}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-transaction" data-id="${transaction.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-transaction" data-id="${transaction.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-transaction').on('click', function () {
          const transactionId = $(this).data('id');
          fetch(`http://localhost:3000/api/transactions/${transactionId}`)
            .then(response => response.json())
            .then(transaction => {
              $('#transactionId').val(transaction.id);
              $('#title').val(transaction.title);
              $('#description').val(transaction.description);
              $('#dueDate').val(transaction.dueDate);
            });
        });

        $('.delete-transaction').on('click', function () {
          const transactionId = $(this).data('id');
          deleteTransaction(transactionId);
        });
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }

  // Create a new transaction
  function createTransaction(transactionData) {
    fetch('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Transaction created:', data);
        fetchTransactions(); // Refresh the transaction list
        $('#transactionForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating transaction:', error);
      });
  }

  // Update an existing transaction
  function updateTransaction(transactionId, transactionData) {
    fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Transaction updated:', data);
        fetchTransactions(); // Refresh the transaction list
        $('#transactionForm')[0].reset(); // Clear the form
        $('#transactionId').val(''); // Reset the transaction ID
      })
      .catch(error => {
        console.error('Error updating transaction:', error);
      });
  }

  // Delete a transaction
  function deleteTransaction(transactionId) {
    fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Transaction deleted');
          fetchTransactions(); // Refresh the transaction list
        } else {
          console.error('Error deleting transaction');
        }
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
      });
  }
});
