fetch('https://bookingsystem.azurewebsites.net/api/treatment/treatmentList')
    .then(response => response.json())
    .then(data => {
        const treatmentsContainer = document.getElementById('treatmentsContainer');

        data.forEach(treatment => {
            const treatmentCard = document.createElement('div');
            treatmentCard.classList.add('card', 'treatment-card');

            const img = document.createElement('img');
            img.src = treatment.image;
            img.classList.add('card-img-top');
            img.alt = treatment.name;
            treatmentCard.appendChild(img);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = treatment.name;
            cardBody.appendChild(title);

            const description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = treatment.description;
            cardBody.appendChild(description);

            const select = document.createElement('select');
            select.classList.add('form-control', 'mb-2');
            select.id = `${treatment.name.replace(/\s+/g, '')}Options`;

            const chooseOption = document.createElement('option');
            chooseOption.value = 'none';
            chooseOption.textContent = 'Choose an option';
            select.appendChild(chooseOption);

            treatment.options.forEach(option => {
                const treatmentOption = document.createElement('option');
                treatmentOption.value = option.optionValue;
                treatmentOption.textContent = option.optionName;
                select.appendChild(treatmentOption);
            });

            cardBody.appendChild(select);

            const selectedOptionInfo = document.createElement('div');
            selectedOptionInfo.id = `selectedOptionInfo${treatment.name.replace(/\s+/g, '')}`;
            cardBody.appendChild(selectedOptionInfo);

            treatmentCard.appendChild(cardBody);
            treatmentsContainer.appendChild(treatmentCard);
        });

        // Event listener kode her
        const selects = document.querySelectorAll('select');

        selects.forEach(select => {
            select.addEventListener('change', function(event) {
                const selectedOption = event.target.value;

                if (selectedOption !== 'none') {
                    const treatmentName = select.parentElement.querySelector('.card-title').textContent;
                    window.location.href = `booking.html?treatment=${encodeURIComponent(treatmentName)}`;
                }
            });
        });
    })
    .catch(error => {
        console.error('Fejl ved hentning af behandlingsdata:', error);
    });
