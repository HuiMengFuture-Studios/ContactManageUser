$(document).ready(function () {
  // Priority mapping from English to Chinese
  const priorityMap = {
    'low': '低',
    'medium': '中',
    'high': '高'
  };

  // Fetch and display all wishlist items
  fetchWishlistItems();

  // Handle form submission for adding or updating a wishlist item
  $('#wishlistForm').on('submit', function (event) {
    event.preventDefault();
    const wishlistId = $('#wishlistId').val();
    const wishlistData = {
      item: $('#item').val(),
      description: $('#description').val(),
      priority: $('#priority').val()
    };

    if (wishlistId) {
      // Update existing wishlist item
      updateWishlistItem(wishlistId, wishlistData);
    } else {
      // Create new wishlist item
      createWishlistItem(wishlistData);
    }
  });

  // Fetch and display all wishlist items
  function fetchWishlistItems() {
    fetch('http://localhost:3000/api/wishlists')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#wishlistTableBody');
        tableBody.empty();
        data.forEach(wishlistItem => {
          const row = `
            <tr>
              <td>${wishlistItem.item}</td>
              <td>${wishlistItem.description}</td>
              <td>${priorityMap[wishlistItem.priority]}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-wishlist-item" data-id="${wishlistItem.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-wishlist-item" data-id="${wishlistItem.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-wishlist-item').on('click', function () {
          const wishlistId = $(this).data('id');
          fetch(`http://localhost:3000/api/wishlists/${wishlistId}`)
            .then(response => response.json())
            .then(wishlistItem => {
              $('#wishlistId').val(wishlistItem.id);
              $('#item').val(wishlistItem.item);
              $('#description').val(wishlistItem.description);
              $('#priority').val(wishlistItem.priority);
            });
        });

        $('.delete-wishlist-item').on('click', function () {
          const wishlistId = $(this).data('id');
          deleteWishlistItem(wishlistId);
        });
      })
      .catch(error => {
        console.error('Error fetching wishlist items:', error);
      });
  }

  // Create a new wishlist item
  function createWishlistItem(wishlistData) {
    fetch('http://localhost:3000/api/wishlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wishlistData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Wishlist item created:', data);
        fetchWishlistItems(); // Refresh the wishlist list
        $('#wishlistForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating wishlist item:', error);
      });
  }

  // Update an existing wishlist item
  function updateWishlistItem(wishlistId, wishlistData) {
    fetch(`http://localhost:3000/api/wishlists/${wishlistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wishlistData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Wishlist item updated:', data);
        fetchWishlistItems(); // Refresh the wishlist list
        $('#wishlistForm')[0].reset(); // Clear the form
        $('#wishlistId').val(''); // Reset the wishlist item ID
      })
      .catch(error => {
        console.error('Error updating wishlist item:', error);
      });
  }

  // Delete a wishlist item
  function deleteWishlistItem(wishlistId) {
    fetch(`http://localhost:3000/api/wishlists/${wishlistId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Wishlist item deleted');
          fetchWishlistItems(); // Refresh the wishlist list
        } else {
          console.error('Error deleting wishlist item');
        }
      })
      .catch(error => {
        console.error('Error deleting wishlist item:', error);
      });
  }
});
