document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchIndex = [];

    // Check if the search elements exist on the page
    if (!searchInput || !searchResults) {
        return; // Do nothing if the search bar isn't on this page
    }

    // Fetch the search index data file created by the Python script
    fetch('/js/search_index.json')
        .then(response => {
            if (!response.ok) {
                console.error("Failed to load search index. Make sure 'search_index.json' exists.");
                return [];
            }
            return response.json();
        })
        .then(data => {
            searchIndex = data;
        })
        .catch(error => {
            console.error("Error parsing search index:", error);
        });

    // Listen for user input in the search bar
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = ''; // Clear previous results

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        // Filter the index to find matching items
        const results = searchIndex.filter(item =>
            item.keyword.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query)
        );

        // Display the results
        if (results.length > 0) {
            // Show a maximum of 10 results
            results.slice(0, 10).forEach(result => {
                const item = document.createElement('a');
                item.href = result.url;
                item.innerHTML = `<strong>${result.keyword}</strong><p>${result.text.substring(0, 80)}...</p>`;
                searchResults.appendChild(item);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide the results dropdown when the user clicks anywhere else on the page
    document.addEventListener('click', function(e) {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.style.display = 'none';
        }
    });
});