// Wait for the DOM to be fully loaded

function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            formMessage.style.display = 'block';
            formMessage.style.color = 'green';
            formMessage.textContent = 'Thank you! Your message has been sent.';
        } else {
            response.json().then(data => {
                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
                formMessage.textContent = data.errors ? data.errors.map(err => err.message).join(", ") : 'Oops! Something went wrong.';
            });
        }
    }).catch(() => {
        formMessage.style.display = 'block';
        formMessage.style.color = 'red';
        formMessage.textContent = 'Oops! There was a problem submitting your form.';
    });
}


document.addEventListener('DOMContentLoaded', function() {


    // Handle the contact form submission
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            // Note: The form now uses Formspree, so we don't need to prevent default
            // But we can still show an alert
            const fullName = document.getElementById('fullname').value;
            alert(`Thank you, ${fullName}! Your message has been received. We will contact you soon.`);
        });
    }
    
    // Gallery tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to the clicked button
                this.classList.add('active');
                
                // Show the corresponding tab pane
                const eventId = this.getAttribute('data-event');
                document.getElementById(eventId).classList.add('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .footer-services a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Function to handle the file upload for images
    // In a real implementation, this would upload the files to a server
    const fileInputs = document.querySelectorAll('.file-upload input[type="file"]');
    if (fileInputs.length > 0) {
        fileInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                const fileNameDisplay = this.parentElement.querySelector('.file-name');
                if (this.multiple) {
                    // For multiple files (gallery photos)
                    const fileCount = this.files.length;
                    if (fileCount > 0) {
                        if (fileCount > 3) {
                            alert('Please select a maximum of 3 images.');
                            this.value = ''; // Clear selection
                            fileNameDisplay.textContent = 'No files selected';
                        } else {
                            const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                            fileNameDisplay.textContent = fileNames;
                            
                            // In a real implementation, you would upload the files here
                            // For demo purposes, we'll just show the selected files would be displayed
                            alert(`Selected ${fileCount} image(s). In a real implementation, these would be uploaded and displayed in the gallery.`);
                        }
                    }
                } else {
                    // For single file (event poster)
                    const fileName = this.files[0]?.name;
                    if (fileName) {
                        fileNameDisplay.textContent = fileName;
                        
                        // In a real implementation, you would upload the file here
                        // For demo purposes, we'll just show the selected file would be displayed
                        alert(`Selected poster: ${fileName}. In a real implementation, this would be uploaded and displayed.`);
                    }
                }
            });
        });
    }
    
    // Handle event tab renaming
    const renameEventBtn = document.querySelector('.rename-event-btn');
    if (renameEventBtn) {
        renameEventBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                const eventName = prompt('Enter new event name:', activeTab.textContent);
                if (eventName && eventName.trim()) {
                    activeTab.textContent = eventName.trim();
                }
            }
        });
    }
    
    // Handle adding new event tabs
    const addEventBtn = document.querySelector('.add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            const eventName = prompt('Enter event name:');
            if (eventName && eventName.trim()) {
                // Get the tabs container
                const tabsContainer = document.querySelector('.tabs');
                const tabContent = document.querySelector('.tab-content');
                
                // Create a new tab button
                const newTabBtn = document.createElement('button');
                newTabBtn.className = 'tab-btn';
                newTabBtn.setAttribute('data-event', `event${tabsContainer.querySelectorAll('.tab-btn').length + 1}`);
                newTabBtn.textContent = eventName.trim();
                
                // Insert the new tab button before the add button
                tabsContainer.insertBefore(newTabBtn, addEventBtn);
                
                // Create a new tab pane
                const newTabPane = document.createElement('div');
                newTabPane.className = 'tab-pane';
                newTabPane.id = `event${tabsContainer.querySelectorAll('.tab-btn').length}`;
                
                // Add content to the new tab pane
                newTabPane.innerHTML = `
                    <div class="file-upload">
                        <label for="event${tabsContainer.querySelectorAll('.tab-btn').length}-photos" class="file-upload-btn">Upload Photos (Max 3)</label>
                        <input type="file" id="event${tabsContainer.querySelectorAll('.tab-btn').length}-photos" accept="image/*" multiple>
                        <div class="file-name">No files selected</div>
                    </div>
                    <div class="gallery-images">
                        <div class="gallery-image placeholder">
                            <p>Upload photos to display here</p>
                        </div>
                    </div>
                `;
                
                // Add the new tab pane to the tab content
                tabContent.appendChild(newTabPane);
                
                // Add event listener to the new file input
                const newFileInput = newTabPane.querySelector('input[type="file"]');
                newFileInput.addEventListener('change', function(e) {
                    const fileNameDisplay = this.parentElement.querySelector('.file-name');
                    const fileCount = this.files.length;
                    if (fileCount > 0) {
                        if (fileCount > 3) {
                            alert('Please select a maximum of 3 images.');
                            this.value = ''; // Clear selection
                            fileNameDisplay.textContent = 'No files selected';
                        } else {
                            const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                            fileNameDisplay.textContent = fileNames;
                            alert(`Selected ${fileCount} image(s). In a real implementation, these would be uploaded and displayed in the gallery.`);
                        }
                    }
                });
                
                // Add event listener to the new tab button
                newTabBtn.addEventListener('click', function() {
                    // Remove active class from all buttons and panes
                    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                    
                    // Add active class to the clicked button
                    this.classList.add('active');
                    
                    // Show the corresponding tab pane
                    const eventId = this.getAttribute('data-event');
                    document.getElementById(eventId).classList.add('active');
                });
                
                // Activate the new tab
                newTabBtn.click();
            }
        });
    }
});