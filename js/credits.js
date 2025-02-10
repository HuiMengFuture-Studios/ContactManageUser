$(document).ready(function () {
  // Fetch and populate contact options
  fetchContacts();

  // Handle form submission for calculating credit score for a single contact
  $('#creditForm').on('submit', function (event) {
    event.preventDefault();
    const contactId = parseInt($('#contactId').val(), 10);
    calculateCreditScore(contactId);
  });

  // Handle button click for calculating credit scores for all contacts
  $('#calculateAllButton').on('click', function () {
    calculateAllCreditScores();
  });

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
        showAlert('danger', '获取联系人失败');
      });
  }

  // Calculate and display credit score for a single contact
  function calculateCreditScore(contactId) {
    const creditData = {
      contactId: contactId
    };

    fetch('http://localhost:3000/api/credits/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creditData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Credit score calculated:', data);
        displayCreditScore(data.creditScore);
        showAlert('success', '信用评分计算成功');
      })
      .catch(error => {
        console.error('Error calculating credit score:', error);
        displayCreditScore('计算失败');
        showAlert('danger', '信用评分计算失败');
      });
  }

  // Calculate and display credit scores for all contacts
  function calculateAllCreditScores() {
    fetch('http://localhost:3000/api/credits/calculateAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('All credit scores calculated:', data);
        showAlert('success', '所有信用评分已计算完成');
      })
      .catch(error => {
        console.error('Error calculating all credit scores:', error);
        showAlert('danger', '批量计算信用评分失败');
      });
  }

  // Display the credit score
  function displayCreditScore(score) {
    $('#creditScoreValue').text(score);
  }

  // Show Bootstrap alert
  function showAlert(type, message) {
    const alertContainer = $('#alertContainer');
    alertContainer.empty();
    const alertHtml = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
    alertContainer.append(alertHtml);
  }
});
