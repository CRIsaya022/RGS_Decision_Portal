document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('login-form');
    const modal = document.getElementById('decision-modal');
    const closeBtn = document.querySelector('.close-btn');
    const decisionContent = document.getElementById('decision-content');
    
    // Applicant data with the correct IDs
    const applicants = [
    {
        id: '250731',
        dob: '2005-02-19',
        status: 'accepted',
        name: 'Crispin',
        acceptancePath: 'assets/Crispin/crispin.jpg',
        financialPath: 'assets/Crispin/crispin_aid.pdf'
    },

     {
        id: '000000',
        dob: '2025-07-10',
        status: 'accepted',
        name: 'Jane Doe',
        acceptancePath: 'assets/Jane/jane_doe.jpg',
        financialPath: 'assets/Jane/jane.pdf'
    },
    // {
    //     id: '250894',
    //     dob: '2005-05-20',
    //     status: 'accepted',
    //     name: 'Christopher',
    //     acceptancePath: 'assets/Christopher/christopher.jpg',
    //     financialPath: 'assets/Christopher/Final RGS Financial Support Letter.pdf'
    // },
    {
        id: '251067',
        dob: '2002-05-17',
        status: 'accepted',
        name: 'Emmanuel Ambrose',
        acceptancePath: 'assets/Emmanuel_Ambrose/emmanuel.jpg',
        financialPath: 'assets/Emmanuel_Ambrose/emmanuel_ambrose_aid.pdf'
    },
    {
        id: '251248',
        dob: '2006-04-15',
        status: 'accepted',
        name: 'Emmanuel Mwakyusa',
        acceptancePath: 'assets/Emmanuel_Mwakyusa/emmanuel.jpg',
        financialPath: 'assets/Emmanuel_Mwakyusa/emmanuel_mwakyusa_aid.pdf'
    },
    {
        id: '251395',
        dob: '2005-06-10',
        status: 'accepted',
        name: 'Kelvin',
        acceptancePath: 'assets/Kelvin/kelvin.jpg',
        financialPath: 'assets/Kelvin/kelvin_aid.pdf'
    },
    {
        id: '251562',
        dob: '2005-11-06',
        status: 'accepted',
        name: 'Lukas',
        acceptancePath: 'assets/Lukas/lukas.jpg',
        financialPath: 'assets/Lukas/lukas_aid.pdf'
    }
];

  
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const applicantId = document.getElementById('applicant-id').value.trim();
        const dob = document.getElementById('dob').value;
        
        // Find the applicant in our mock data
        const applicant = findApplicant(applicantId, dob);
        
        if (applicant) {
            showDecision(applicant);
        } else {
            showError(                       // invalid combo → show error
    'Oops! We couldn’t find a match for that Applicant ID and Date of Birth. ' +
    'Please contact us if you need any support.'
  );
         
        }
    });

    // SHOW ERROR FUNCTION
    function showError(message) {
  decisionContent.innerHTML = `
    <div class="decision-header" style="text-align: center;">
      <h2 style="margin-bottom: 1rem;">Oops! Login Error</h2>
      <p style="
        max-width: 400px;
        margin: 0 auto;
        font-size: 1rem;
        line-height: 1.6;
      ">
        ${message}
      </p>
    </div>
  `;
  modal.style.display = 'block';
}



    
    // Close the modal when clicking the close button
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default behavior
        modal.style.display = 'none';
        // Remove the confetti canvas if it exists
        const confettiCanvas = document.querySelector('canvas[style*="position: fixed"]');
        if (confettiCanvas && confettiCanvas.parentNode) {
            confettiCanvas.parentNode.removeChild(confettiCanvas);
        }
    });
    
    // Add touch event for better mobile responsiveness
    closeBtn.addEventListener('touchend', function(e) {
        e.preventDefault(); // Prevent default touch behavior
        modal.style.display = 'none';
        // Remove the confetti canvas if it exists
        const confettiCanvas = document.querySelector('canvas[style*="position: fixed"]');
        if (confettiCanvas && confettiCanvas.parentNode) {
            confettiCanvas.parentNode.removeChild(confettiCanvas);
        }
    });
    
    // Close the modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            // Remove the confetti canvas if it exists
            const confettiCanvas = document.querySelector('canvas[style*="position: fixed"]');
            if (confettiCanvas && confettiCanvas.parentNode) {
                confettiCanvas.parentNode.removeChild(confettiCanvas);
            }
        }
    });
    
    // Find an applicant in our mock data
    function findApplicant(id, dob) {
        return applicants.find(applicant => 
            applicant.id.toLowerCase() === id.toLowerCase() && applicant.dob === dob
        );
    }
    
    // Show the decision in the modal
    function showDecision(applicant) {
        // Get current date for the letter
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        // Create the decision content based on status
        if (applicant.status === 'accepted') {
            // Determine which statement of understanding to use (same for all applicants)
            // const statementOfUnderstandingPath = 'assets/Final RGS statement of Understanding.pdf';
            let statementOfUnderstandingPath;

if (applicant.name === 'Jane Doe') {
    statementOfUnderstandingPath = 'assets/Jane/jane.pdf';
} else {
    statementOfUnderstandingPath = 'assets/Final RGS statement of Understanding.pdf';
}

            
            decisionContent.innerHTML = `
                <div class="decision-header">
                    <h2>Rafiki Global Scholars Decision</h2>
                    <p>${formattedDate}</p>
                </div>
                
                <div class="acceptance">
                    <div class="confetti-container"></div>
                    <div class="acceptance-letter">
                        <img src="${applicant.acceptancePath}" alt="Acceptance Letter" class="acceptance-img" />
                    </div>
                </div>
                
                <div class="document-links">
                    <h4>Important Documents:</h4>
                    <ul>
                        <li><a href="${applicant.financialPath}" target="_blank" class="document-link">
                            <i class="fas fa-file-pdf"></i> View Financial Offer
                        </a></li>
                        <li><a href="${statementOfUnderstandingPath}" target="_blank" class="document-link">
                            <i class="fas fa-file-pdf"></i> View Statement of Understanding
                        </a></li>
                    </ul>
                    
                    <div class="acceptance-instructions">
                        To accept this offer, kindly review and sign the Statement of Understanding and submit it by Friday, July 11th via email.
                    </div>
                </div>
                
                <p style="margin-top: 20px;">We look forward to welcoming you to the Rafiki Global Scholars community. If you have any questions, please don't hesitate to contact the Rafiki Global Scholars team.</p>
            `;
            
            // Function to adjust confetti for screen size
            function getConfettiConfig(isMobile) {
                return {
                    scalar: isMobile ? 1.2 : 1.8,  // Maintain original size
                    particleCount: isMobile ? 250 : 450,  // More particles for density
                    spread: isMobile ? 85 : 115,  // Wider spread for more coverage
                    zIndex: 2000,  // Ensure confetti appears above everything
                    gravity: 1.4,  // Balanced gravity for realistic falling
                    velocity: 2.2,  // Balanced velocity for elegant movement
                    drift: 1.2,    // Add some horizontal drift for realism
                    ticks: 500,    // Longer-lasting confetti
                    shapes: ['square', 'circle'],  // Mix of shapes for elegance
                    colors: [
                        '#00843D', // Rafiki Green
                        '#4CAF50', // Medium Green
                        '#FFC107', // Gold/Yellow
                        '#FFFFFF', // White
                        '#FFD700', // Gold
                        '#00A550', // Bright Green
                        '#E6C200'  // Rich Gold
                    ]
                };
            }
            
            // Check if device is mobile
            const isMobile = window.innerWidth < 768;
            const config = getConfettiConfig(isMobile);
            
            // Create canvas for confetti that stays above the PDF
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '2000';
            document.body.appendChild(canvas);
            
            // Configure confetti.js to use our canvas
            const myConfetti = confetti.create(canvas, { resize: true });
            
            // Trigger confetti animation - elegant and realistic celebration
            setTimeout(() => {
                // Main central burst with rich color mix
                myConfetti({
                    ...config,
                    origin: { y: 0.25 },
                    angle: 90,
                    decay: 0.91,        // Slower decay for longer-lasting particles
                    shapes: ['square', 'circle'],
                    ticks: config.ticks,
                    scalar: config.scalar * 1.05,
                    disableForReducedMotion: true
                });
                
                // Elegant side bursts with varied angles
                const sideAngles = [60, 120];
                sideAngles.forEach(angle => {
                    myConfetti({
                        ...config,
                        particleCount: Math.floor(config.particleCount * 0.6),
                        angle: angle,
                        spread: config.spread * 0.9,
                        origin: { x: angle < 90 ? 0.1 : 0.9, y: 0.25 },
                        scalar: config.scalar * 0.95,
                        drift: angle < 90 ? 0.5 : -0.5,
                        ticks: config.ticks * 0.9
                    });
                });
                
                // Immediate follow-up for density and realism
                setTimeout(() => {
                    // Realistic falling pattern from top
                    myConfetti({
                        ...config,
                        particleCount: Math.floor(config.particleCount * 0.7),
                        spread: config.spread * 1.2,
                        origin: { y: 0, x: 0.5 },
                        gravity: config.gravity * 0.9,
                        scalar: config.scalar * 0.9,
                        ticks: config.ticks * 1.1,
                        shapes: ['square', 'circle']
                    });
                    
                    // Elegant side showers
                    setTimeout(() => {
                        // Create a sequence of smaller bursts for a sustained elegant effect
                        for (let i = 0; i < 4; i++) {
                            setTimeout(() => {
                                const xPos = 0.2 + (i * 0.2);
                                myConfetti({
                                    ...config,
                                    particleCount: Math.floor(config.particleCount / 3),
                                    spread: config.spread * 0.7,
                                    origin: { y: 0.15, x: xPos },
                                    scalar: config.scalar * (0.9 + (i * 0.05)),
                                    drift: (xPos - 0.5) * 2,
                                    ticks: config.ticks * 0.85,
                                    gravity: config.gravity * (1 + (i * 0.1))
                                });
                            }, i * 120); // Elegant timing between bursts
                        }
                    }, 150);
                }, 80);
            }, 100);
            
            // Listen for window resize to adjust confetti for orientation changes
            window.addEventListener('resize', function() {
                if (modal.style.display === 'block') {
                    const isNowMobile = window.innerWidth < 768;
                    const newConfig = getConfettiConfig(isNowMobile);
                    
                    // Create an elegant burst on resize
                    myConfetti({
                        ...newConfig,
                        particleCount: Math.floor(newConfig.particleCount / 2),
                        spread: newConfig.spread * 0.9,
                        origin: { y: 0.25, x: 0.5 },
                        decay: 0.92,
                        shapes: ['square', 'circle'],
                        ticks: newConfig.ticks * 0.8
                    });
                    
                    // Add a complementary burst for visual richness
                    setTimeout(() => {
                        myConfetti({
                            ...newConfig,
                            particleCount: Math.floor(newConfig.particleCount / 3),
                            spread: newConfig.spread * 0.8,
                            origin: { y: 0.2, x: 0.3 + (Math.random() * 0.4) },
                            scalar: newConfig.scalar * 0.9,
                            drift: (Math.random() - 0.5) * 2,
                            ticks: newConfig.ticks * 0.7
                        });
                    }, 100);
                }
            });
            
            // No need for duplicate event listener as we've already handled canvas cleanup
            // in the main close button event listener
        } else {
            // This is just a fallback, as per requirements we're only showing acceptances
            decisionContent.innerHTML = `
                <div class="decision-header">
                    <img src="assets/rafiki-logo.png" alt="Rafiki Global Scholars Logo" class="decision-logo">
                    <h2>Rafiki Global Scholars Decision</h2>
                    <p>${formattedDate}</p>
                </div>
                
                <p>There was an error retrieving your decision. Please contact the program office for assistance.</p>
            `;
        }
        
        // Display the modal
        modal.style.display = 'block';
        const audio = document.getElementById('acceptance-audio');
if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => {
        console.warn('Autoplay blocked until user interacts with the page');
    });
}

    }
    
    // For demo purposes - allow testing with our applicant IDs
    // This is just to make testing easier
    document.addEventListener('keydown', function(e) {
        // Press Ctrl+K for Kelvin
        if (e.ctrlKey && e.key === 'k') {
            document.getElementById('applicant-id').value = '251395';
            document.getElementById('dob').value = '2000-01-15';
        }
        // Press Ctrl+L for Lukas
        if (e.ctrlKey && e.key === 'l') {
            document.getElementById('applicant-id').value = '251562';
            document.getElementById('dob').value = '2000-01-15';
        }
    });
});