# Silkcoat Liberia Website

A modern, professional website for Silkcoat paint company's Liberian franchise, featuring comprehensive product catalogs, service information, and integrated inventory system access.

## 🎨 Features

### **Modern Design**
- Professional, corporate aesthetic with Turkish paint industry excellence
- Responsive design optimized for all devices
- Smooth animations and micro-interactions
- Contemporary color scheme and typography

### **Comprehensive Content**
- **Homepage**: Hero section, feature highlights, product previews
- **About**: Company history, mission, team, certifications
- **Products**: Filterable catalog with detailed specifications
- **Services**: Professional support, training, technical assistance
- **Contact**: Forms, location info, FAQ section

### **Interactive Elements**
- Product filtering and modal details
- Animated statistics counters
- Contact form with validation
- Inventory system integration
- Smooth scrolling navigation

### **Technical Excellence**
- Bootstrap 5 framework
- Modern CSS with custom properties
- ES6+ JavaScript functionality
- SEO-optimized structure
- Performance optimizations

## 🚀 Quick Start

### **Prerequisites**
- Web server (Apache, Nginx, or local development server)
- Modern web browser
- Internet connection (for CDN resources)

### **Installation**
1. **Download/Clone** the project files
2. **Upload** to your web server or open locally
3. **Replace** placeholder images with actual company photos
4. **Update** contact information and company details
5. **Configure** inventory system URL integration

### **File Structure**
```
silkcoat-liberia/
├── index.html              # Homepage
├── about.html              # About Us
├── products.html           # Product Catalog
├── services.html           # Services
├── contact.html            # Contact & Location
├── css/
│   └── style.css          # Custom Styles
├── js/
│   └── main.js            # JavaScript Functions
├── images/                # Image Assets
└── README.md              # Documentation
```

## 🛠️ Customization

### **Inventory System Integration**
The navigation includes an "Inventory System" link that prompts users for their inventory system URL:

```javascript
// In js/main.js - Inventory System Link Handler
const inventoryLink = document.getElementById('inventoryLink');
inventoryLink.addEventListener('click', function(e) {
    e.preventDefault();
    const inventoryUrl = prompt('Please enter your inventory system URL:');
    if (inventoryUrl && inventoryUrl.trim() !== '') {
        window.open(inventoryUrl, '_blank');
    }
});
```

**To customize:**
1. Replace the prompt with your actual inventory system URL
2. Or implement user authentication/session management
3. Or integrate with your existing user management system

### **Contact Information**
Update the following in all HTML files:
- Phone numbers: `+231 XXX XXXX`
- Email addresses: `info@silkcoat-liberia.com`
- Physical address: `Broad Street, Monrovia, Liberia`
- Social media links

### **Company Content**
- Replace team member information in `about.html`
- Update product specifications in `products.html`
- Customize service offerings in `services.html`
- Modify company history and mission statements

### **Branding**
- **Logo**: Replace `images/logo.png` with actual company logo
- **Colors**: Modify CSS custom properties in `css/style.css`
- **Typography**: Update Google Fonts import if needed

## 🎯 Key Sections

### **Homepage Features**
- **Hero Section**: Compelling introduction with call-to-action
- **Feature Cards**: Key selling points and benefits
- **Product Preview**: Showcase of main product categories
- **About Preview**: Company introduction and values
- **Contact CTA**: Clear path to get in touch

### **Product Catalog**
- **Filtering System**: Filter by Interior, Exterior, Primers, Specialty
- **Product Cards**: Visual product presentation with features
- **Modal Details**: Comprehensive product specifications
- **Feature Tags**: Quick identification of key benefits

### **Services Offered**
- **Color Consultation**: Professional color matching services
- **Technical Support**: Application guidance and troubleshooting
- **Training Programs**: Professional certification and education
- **Project Estimation**: Material calculation and planning
- **Delivery & Logistics**: Nationwide distribution services
- **Customer Support**: Comprehensive customer care

### **Contact Options**
- **Contact Form**: Detailed inquiry form with validation
- **Direct Contact**: Phone, email, WhatsApp options
- **Location Info**: Address and business hours
- **FAQ Section**: Common questions and answers

## 🔧 Technical Details

### **Dependencies**
- **Bootstrap 5.3.0**: Responsive framework
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts**: Poppins typography
- **Vanilla JavaScript**: No additional frameworks required

### **Browser Support**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

### **Performance Features**
- Lazy loading for images
- Optimized CSS animations
- Efficient JavaScript execution
- CDN resources for faster loading
- Compressed and minified assets

### **SEO Optimization**
- Semantic HTML structure
- Meta descriptions and titles
- Proper heading hierarchy
- Alt text for images
- Clean URL structure

## 📱 Responsive Design

The website is fully responsive with breakpoints optimized for:
- **Desktop**: 1200px and above
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: Below 768px

### **Mobile Features**
- Touch-friendly navigation
- Optimized form inputs
- Readable typography
- Accessible button sizes
- Smooth scrolling

## 🎨 Color Scheme

```css
:root {
    --primary-color: #1e3a8a;      /* Deep Blue */
    --secondary-color: #3b82f6;    /* Blue */
    --accent-color: #f59e0b;       /* Amber */
    --success-color: #10b981;      /* Emerald */
    --dark-color: #1f2937;         /* Gray-800 */
    --light-color: #f8fafc;        /* Gray-50 */
}
```

## 📞 Support & Maintenance

### **Regular Updates**
- Update product information as needed
- Refresh team member photos and bios
- Keep contact information current
- Monitor and update external links

### **Performance Monitoring**
- Check page load speeds regularly
- Optimize images as needed
- Monitor mobile performance
- Test form functionality

### **Security Considerations**
- Keep contact forms secure
- Validate all user inputs
- Use HTTPS for production
- Regular security updates

## 📄 License

This website template is created for Silkcoat Liberia. All rights reserved.

## 🤝 Contributing

For updates or modifications, please contact the development team or submit detailed change requests.

---

**Silkcoat Liberia** - Premium Paint Solutions for Liberia
*Designed by Dorbor Solutions*
