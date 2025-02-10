$(document).ready(function () {
  // Fetch and display all media items
  fetchMediaList();

  // Handle form submission for adding or updating a media item
  $('#mediaListForm').on('submit', function (event) {
    event.preventDefault();
    const mediaListId = $('#mediaListId').val();
    const mediaListData = {
      title: $('#title').val(),
      type: $('#type').val(),
      description: $('#description').val()
    };

    if (mediaListId) {
      // Update existing media item
      updateMediaItem(mediaListId, mediaListData);
    } else {
      // Create new media item
      createMediaItem(mediaListData);
    }
  });

  // Fetch and display all media items
  function fetchMediaList() {
    fetch('http://localhost:3000/api/mediaList')
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#mediaListTableBody');
        tableBody.empty();
        data.forEach(mediaItem => {
          const row = `
            <tr>
              <td>${mediaItem.title}</td>
              <td>${mediaItem.type === 'movie' ? '电影' : '书籍'}</td>
              <td>${mediaItem.description}</td>
              <td>
                <button class="btn btn-sm btn-primary edit-media-item" data-id="${mediaItem.id}">编辑</button>
                <button class="btn btn-sm btn-danger delete-media-item" data-id="${mediaItem.id}">删除</button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });

        // Add event listeners for edit and delete buttons
        $('.edit-media-item').on('click', function () {
          const mediaListId = $(this).data('id');
          fetch(`http://localhost:3000/api/mediaList/${mediaListId}`)
            .then(response => response.json())
            .then(mediaItem => {
              $('#mediaListId').val(mediaItem.id);
              $('#title').val(mediaItem.title);
              $('#type').val(mediaItem.type);
              $('#description').val(mediaItem.description);
            });
        });

        $('.delete-media-item').on('click', function () {
          const mediaListId = $(this).data('id');
          deleteMediaItem(mediaListId);
        });
      })
      .catch(error => {
        console.error('Error fetching media list:', error);
      });
  }

  // Create a new media item
  function createMediaItem(mediaListData) {
    fetch('http://localhost:3000/api/mediaList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mediaListData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Media item created:', data);
        fetchMediaList(); // Refresh the media list
        $('#mediaListForm')[0].reset(); // Clear the form
      })
      .catch(error => {
        console.error('Error creating media item:', error);
      });
  }

  // Update an existing media item
  function updateMediaItem(mediaListId, mediaListData) {
    fetch(`http://localhost:3000/api/mediaList/${mediaListId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mediaListData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Media item updated:', data);
        fetchMediaList(); // Refresh the media list
        $('#mediaListForm')[0].reset(); // Clear the form
        $('#mediaListId').val(''); // Reset the media item ID
      })
      .catch(error => {
        console.error('Error updating media item:', error);
      });
  }

  // Delete a media item
  function deleteMediaItem(mediaListId) {
    fetch(`http://localhost:3000/api/mediaList/${mediaListId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Media item deleted');
          fetchMediaList(); // Refresh the media list
        } else {
          console.error('Error deleting media item');
        }
      })
      .catch(error => {
        console.error('Error deleting media item:', error);
      });
  }
});
