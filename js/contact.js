$(document).ready(function () {
  // 获取当前页面的URL路径
  const path = window.location.pathname;
  console.log(path);

  // 移除所有导航项的active类
  $('.navbar-nav .nav-item').removeClass('active');

  // 根据URL路径激活相应的导航项
  $('.navbar-nav .nav-item').each(function () {
    const url = $(this).data('url');
    if (path.endsWith('/' + url + '.html') || (url === '' && path === '/')) {
      console.log('active:' + url);
      $(this).addClass('active');
    } else {
      console.log('not active:' + url);
    }
  });

  // Fetch and display all contacts
  fetchContacts();

  // Handle form submission for adding or updating a contact
  $('#contactForm').on('submit', function (event) {
    event.preventDefault();
    const contactId = $('#contactId').val();
    const contactData = {
      name: $('#name').val(),
      phone: $('#phone').val(),
      email: $('#email').val(),
      relationship: $('#relationship').val(),
      source: $('#source').val()
    };

    if (contactId) {
      // Update existing contact
      updateContact(contactId, contactData);
    } else {
      // Create new contact
      createContact(contactData);
    }
  });

  // Fetch and display all contacts
  function fetchContacts() {
    fetch('http://localhost:3000/api/contacts')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#contactsTableBody');
        tableBody.empty();
        data.forEach(contact => {
          // Fetch credit score for the contact
          const row = `
              <tr>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email ? contact.email : '未填写'}</td>
                <td>${contact.relationship}</td>
                <td>${contact.source}</td>
                <td>${contact.creditScore ? contact.creditScore : '未计算'}</td>
                <td>
                  <button class="btn btn-sm btn-primary edit-contact" data-id="${contact.id}">编辑</button>
                  <button class="btn btn-sm btn-danger delete-contact" data-id="${contact.id}">删除</button>
                </td>
              </tr>
            `;
          tableBody.append(row);
        });
      });

    // Add event listeners for edit and delete buttons
    $('.edit-contact').on('click', function () {
      const contactId = $(this).data('id');
      fetch(`http://localhost:3000/api/contacts/${contactId}`)
        .then(response => response.json())
        .then(contact => {
          $('#contactId').val(contact.id);
          $('#name').val(contact.name);
          $('#phone').val(contact.phone);
          $('#email').val(contact.email);
          $('#relationship').val(contact.relationship);
          $('#source').val(contact.source);
        });
    });

    $('.delete-contact').on('click', function () {
      const contactId = $(this).data('id');
      deleteContact(contactId);
    })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }

  // Create a new contact
  function createContact(contactData) {
    fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Contact created:', data);
        fetchContacts(); // Refresh the contact list
        $('#contactForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating contact:', error);
      });
  }

  // Update an existing contact
  function updateContact(contactId, contactData) {
    fetch(`http://localhost:3000/api/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Contact updated:', data);
        fetchContacts(); // Refresh the contact list
        $('#contactForm')[0].reset(); // Clear the form
        $('#contactId').val(''); // Reset the contact ID
      })
      .catch(error => {
        console.error('Error updating contact:', error);
      });
  }

  // Delete a contact
  function deleteContact(contactId) {
    fetch(`http://localhost:3000/api/contacts/${contactId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Contact deleted');
          fetchContacts(); // Refresh the contact list
        } else {
          console.error('Error deleting contact');
        }
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  }
});
