// Save Contact Functionality - vCard Generation
function setupSaveContact() {
    const saveContactBtn = document.getElementById('saveContactBtn');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', function() {
            generateVCard();
        });
    }
}

function generateVCard() {
    // Contact information
    const contact = {
        firstName: 'Muhammed',
        lastName: 'Anas',
        fullName: 'Muhammed Anas',
        title: 'Chief Executive Officer',
        company: 'Gift City Qatar',
        email: 'muhammed.anas@giftcityqatar.com',
        phone: '+97455551387',
        address: 'Gift City, Building Number 541, Ground Floor, Office Number 2, Old Murrah, Opposite Safari Hyper Market, Salwa Road, Doha, Qatar',
        website: 'https://www.giftcityqatar.com/',
        linkedin: 'https://linkedin.com/in/muhammed-anas',
        instagram: 'https://www.instagram.com/giftcity_qatar?igsh=YzZtdWo0MmZiOWNv',
        tiktok: 'https://www.tiktok.com/@giftcity_qatar?_r=1&_t=ZS-921jw9aZGeG',
        facebook: 'https://www.facebook.com/share/19kB69R5mq/'
    };

    // Create vCard content
    const vCard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${contact.fullName}`,
        `N:${contact.lastName};${contact.firstName};;;`,
        `ORG:${contact.company}`,
        `TITLE:${contact.title}`,
        `EMAIL;TYPE=WORK,INTERNET:${contact.email}`,
        `TEL;TYPE=WORK,CELL:${contact.phone}`,
        `ADR;TYPE=WORK:;;${contact.address};;;`,
        `URL:${contact.website}`,
        `URL;TYPE=LINKEDIN:${contact.linkedin}`,
        `URL;TYPE=INSTAGRAM:${contact.instagram}`,
        `URL;TYPE=TIKTOK:${contact.tiktok}`,
        `URL;TYPE=FACEBOOK:${contact.facebook}`,
        'END:VCARD'
    ].join('\n');

    // Create blob and download
    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.fullName.replace(/\s+/g, '_')}_Contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success feedback
    showNotification('Contact saved successfully!');
}

// Notification function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(20, 20, 30, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 15px;
                padding: 15px 25px;
                display: flex;
                align-items: center;
                gap: 12px;
                color: #00d4ff;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
                z-index: 10000;
                animation: slideUp 0.3s ease-out;
            }
            .notification i {
                font-size: 18px;
                color: #00ff88;
            }
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Generate QR Code
function generateQRCode() {
    const canvas = document.getElementById('qrCode');
    
    if (!canvas) {
        console.error('QR Code canvas not found');
        return;
    }

    const contactInfo = {
        name: 'Muhammed Anas',
        title: 'Chief Executive Officer',
        company: 'Gift City Qatar',
        email: 'muhammed.anas@giftcityqatar.com',
        phone: '+97455551387',
        website: 'https://www.giftcityqatar.com/',
        instagram: 'https://www.instagram.com/giftcity_qatar?igsh=YzZtdWo0MmZiOWNv',
        tiktok: 'https://www.tiktok.com/@giftcity_qatar?_r=1&_t=ZS-921jw9aZGeG',
        facebook: 'https://www.facebook.com/share/19kB69R5mq/'
    };

    // Create vCard string for QR code
    const vCardString = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${contactInfo.name}`,
        `ORG:${contactInfo.company}`,
        `TITLE:${contactInfo.title}`,
        `EMAIL:${contactInfo.email}`,
        `TEL:${contactInfo.phone}`,
        `URL:${contactInfo.website}`,
        'END:VCARD'
    ].join('\n');

    // Set canvas dimensions explicitly
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.width = '200px';
    canvas.style.height = '200px';

    // Generate QR code
    if (typeof QRCode !== 'undefined') {
        try {
            // Use the correct API based on library version
            if (QRCode.toCanvas) {
                QRCode.toCanvas(canvas, vCardString, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    },
                    errorCorrectionLevel: 'M'
                }, function (error) {
                    if (error) {
                        console.error('QR Code generation error:', error);
                        // Try alternative method
                        tryAlternativeQRGeneration(canvas, vCardString);
                    } else {
                        console.log('QR Code generated successfully');
                    }
                });
            } else if (QRCode.toString) {
                // Alternative API
                QRCode.toString(vCardString, {
                    type: 'image/png',
                    width: 200,
                    margin: 2
                }, function (err, string) {
                    if (err) {
                        console.error('QR Code error:', err);
                    } else {
                        const img = new Image();
                        img.src = string;
                        img.onload = function() {
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                        };
                    }
                });
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
            tryAlternativeQRGeneration(canvas, vCardString);
        }
    } else {
        console.error('QRCode library not loaded, retrying...');
        // Retry after a short delay
        setTimeout(() => {
            if (typeof QRCode !== 'undefined') {
                generateQRCode();
            } else {
                console.error('QRCode library failed to load');
            }
        }, 1000);
    }
}

// Alternative QR code generation method
function tryAlternativeQRGeneration(canvas, text) {
    // Try using a different approach or show error message
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QR Code Error', 100, 100);
}

// Visit Counter
function updateVisitCounter() {
    let visitCount = localStorage.getItem('visitCount');
    if (visitCount) {
        visitCount = parseInt(visitCount) + 1;
    } else {
        visitCount = 1;
    }
    localStorage.setItem('visitCount', visitCount);
    const counterElement = document.getElementById('visitCount');
    if (counterElement) {
        counterElement.textContent = visitCount;
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup save contact button
    setupSaveContact();
    
    // Update visit counter
    updateVisitCounter();

    // Generate QR code - try multiple times to ensure library is loaded
    let qrAttempts = 0;
    const maxQrAttempts = 20;
    
    function tryGenerateQR() {
        const canvas = document.getElementById('qrCode');
        if (canvas) {
            // Set canvas dimensions explicitly
            canvas.width = 200;
            canvas.height = 200;
            canvas.style.width = '200px';
            canvas.style.height = '200px';
            
            // Check if QRCode library is available
            if (typeof QRCode !== 'undefined') {
                if (QRCode.toCanvas) {
                    console.log('QRCode library loaded, generating QR code...');
                    generateQRCode();
                    return; // Success, exit function
                } else {
                    console.log('QRCode library loaded but toCanvas method not available');
                }
            }
            
            // If we get here, library not loaded yet
            if (qrAttempts < maxQrAttempts) {
                qrAttempts++;
                if (qrAttempts % 5 === 0) {
                    console.log(`Waiting for QRCode library... attempt ${qrAttempts}/${maxQrAttempts}`);
                }
                setTimeout(tryGenerateQR, 300);
            } else {
                console.error('QRCode library failed to load after multiple attempts');
                // Show helpful message on canvas
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, 200, 200);
                ctx.fillStyle = '#333333';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('QR Code', 100, 90);
                ctx.fillStyle = '#666666';
                ctx.font = '11px Arial';
                ctx.fillText('Library not loaded', 100, 110);
                ctx.fillText('Please refresh', 100, 125);
            }
        } else {
            console.error('QR Code canvas element not found');
        }
    }
    
    // Wait for page to fully load, then start trying to generate QR code
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(tryGenerateQR, 500);
        });
    } else {
        setTimeout(tryGenerateQR, 500);
    }

    // Set up WhatsApp share link
    const whatsappShareBtn = document.getElementById('whatsappShare');
    if (whatsappShareBtn) {
        const profileUrl = window.location.href;
        const shareText = `Hey there! 👋\nIts Muhammed Anas!\n\nHere's my digital card:\n${profileUrl}\n\nPowered by Gift City Qatar!`;
        const encodedText = encodeURIComponent(shareText);
        whatsappShareBtn.href = `https://api.whatsapp.com/send?text=${encodedText}`;
    }
    
    // Handle profile image
    const profilePhoto = document.getElementById('profilePhoto');
    const profileInitials = document.getElementById('profileInitials');
    
    if (profilePhoto && profileInitials) {
        // Hide initials by default if image exists
        profilePhoto.onload = function() {
            profileInitials.style.display = 'none';
        };
        
        // Show initials if image fails to load
        profilePhoto.onerror = function() {
            profilePhoto.style.display = 'none';
            profileInitials.style.display = 'flex';
        };
        
        // Check if image source is valid
        if (profilePhoto.complete && profilePhoto.naturalHeight === 0) {
            profilePhoto.style.display = 'none';
            profileInitials.style.display = 'flex';
        }
    }
});

// Share Profile Function
function shareProfile(platform) {
    const profileUrl = window.location.href;
    const shareText = `Hey there! 👋\nIts Muhammed Anas!\n\nHere's my digital card:\n${profileUrl}\n\nPowered by Gift City Qatar!`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(profileUrl);

    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            break;
        default:
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Direct links to social media pages
function openFacebook() {
    window.open('https://www.facebook.com/share/19kB69R5mq/', '_blank');
}

function openInstagram() {
    window.open('https://www.instagram.com/giftcity_qatar?igsh=YzZtdWo0MmZiOWNv', '_blank');
}

function openTikTok() {
    window.open('https://www.tiktok.com/@giftcity_qatar?_r=1&_t=ZS-921jw9aZGeG', '_blank');
}

// Open Google Maps
function openGoogleMaps() {
    const address = 'Gift City, Building Number 541, Ground Floor, Office Number 2, Old Murrah, Opposite Safari Hyper Market, Salwa Road, Doha, Qatar';
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Handle profile image error - fallback to initials
function handleImageError(img) {
    img.style.display = 'none';
    const initials = document.getElementById('profileInitials');
    if (initials) {
        initials.style.display = 'flex';
    }
}

// Check if profile image loads successfully
document.addEventListener('DOMContentLoaded', function() {
    const profilePhoto = document.getElementById('profilePhoto');
    const profileInitials = document.getElementById('profileInitials');
    
    if (profilePhoto && profileInitials) {
        // Hide initials by default if image exists
        profilePhoto.onload = function() {
            profileInitials.style.display = 'none';
        };
        
        // Show initials if image fails to load
        profilePhoto.onerror = function() {
            profilePhoto.style.display = 'none';
            profileInitials.style.display = 'flex';
        };
        
        // Check if image source is valid
        if (profilePhoto.complete && profilePhoto.naturalHeight === 0) {
            profilePhoto.style.display = 'none';
            profileInitials.style.display = 'flex';
        }
    }
});

