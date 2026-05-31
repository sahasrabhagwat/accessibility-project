# AccessPath

## Project Title
**AccessPath** - A Comprehensive Web Application for Accessibility-Aware Location Discovery and Comparison

---

## Problem Statement

Many individuals with accessibility needs—including people with mobility challenges, sensory sensitivities, and communication requirements—struggle to find public spaces, businesses, and services that meet their specific accessibility standards. Existing location discovery platforms provide minimal or inconsistent accessibility information, forcing users to spend significant time researching venues before visiting them.

AccessPath addresses this gap by providing a centralized, user-friendly platform where individuals can discover, evaluate, and compare accessibility features across various types of locations—from libraries and parks to restaurants and hospitals.

---

## Project Objective

The primary objectives of AccessPath are to:

1. **Democratize accessibility information** by aggregating detailed accessibility data for public venues
2. **Empower users with disabilities** to make informed decisions about which locations to visit based on their specific accessibility needs
3. **Provide comprehensive filtering capabilities** across multiple accessibility dimensions (mobility, sensory, and communication)
4. **Enable location comparison** to help users evaluate multiple venues before deciding where to go
5. **Support personalization** through favorites and custom location management

---

## Features

### Core Features

- **Advanced Search & Filtering**
  - Text-based search for location names
  - Category filtering (libraries, parks, restaurants, hospitals, etc.)
  - Minimum accessibility score slider (0-100)
  - Multi-select accessibility feature filters

- **Detailed Accessibility Assessment**
  - **Mobility**: Wheelchair accessibility, parking, restrooms, ramps, elevators, wheelchair-friendly paths
  - **Sensory**: Noise levels, lighting conditions, quiet spaces availability
  - **Communication**: Staff assistance, written signage, digital resources, ASL availability, Braille availability

- **Dynamic Scoring System**
  - Overall accessibility score (0-100) for each location
  - Color-coded ratings: Green (70+), Orange (40-69), Red (<40)
  - Individual mobility, sensory, and communication scores

- **Interactive Map Integration**
  - Real-time map visualization using Leaflet
  - Marker display for filtered locations
  - Pop-up information on marker hover/click

- **Location Details**
  - Comprehensive accessibility information
  - Operating hours and contact details
  - Website links and addresses
  - Detailed breakdowns of accessibility features

- **Favorites Management**
  - Save favorite locations locally
  - Quick access to preferred venues
  - Persistent storage using browser localStorage

- **Location Comparison**
  - Compare up to 3 locations side-by-side
  - Feature-by-feature comparison table
  - Accessibility score comparison

- **Add Custom Places**
  - Users can add their own locations
  - Input custom accessibility information
  - Integrate custom places with existing database

---

## Technologies Used

### Frontend Stack
- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive styling and visual design
- **JavaScript (ES6+)**: Core application logic and interactivity

### Mapping & Geolocation
- **Leaflet.js**: Interactive map library
- **OpenStreetMap**: Map tile provider

### Data Storage
- **JSON**: Static data format for location database
- **localStorage API**: Client-side persistent storage for user preferences

### Development Environment
- **Git**: Version control
- **GitHub**: Repository hosting

---

## Project Structure

```
accessibility-project/
│
├── index.html                  # Home page with location search and filters
├── map.html                    # Dedicated map view page
├── details.html                # Individual location details page
├── favorites.html              # Saved favorites display page
├── compare.html                # Side-by-side location comparison page
├── add-place.html              # Form for adding custom locations
├── aboutus.html                # Project information page
├── contactme.html              # Contact information page
│
├── accessibility.js            # Core application logic (12.4 KB)
│                               # - Data fetching and merging
│                               # - Filter setup and management
│                               # - Scoring algorithms
│                               # - Map initialization and updates
│                               # - Location display and interactivity
│
├── add-place.js                # Custom place submission logic
├── compare.js                  # Location comparison functionality
├── details.js                  # Location details page logic
├── favorites.js                # Favorites management
├── map.js                      # Map-specific operations
│
├── accessibility.json          # Location database (16.7 KB)
│                               # Contains 20+ curated Richmond area venues
│
├── style.css                   # Global styles and responsive design
│                               # - Navigation styling
│                               # - Card layouts
│                               # - Filter UI elements
│                               # - Map styling
│                               # - Button and form styles
│
└── README.md                   # Project documentation
```

---

## Installation Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side requirements for local development
- Git (optional, for cloning the repository)

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sahasrabhagwat/accessibility-project.git
   cd accessibility-project
   ```

2. **Alternative: Direct Download**
   - Download the repository as a ZIP file
   - Extract to your desired location

3. **Verify File Structure**
   - Ensure all HTML, CSS, and JavaScript files are in the same directory
   - Confirm `accessibility.json` is present in the root directory

4. **No Build Process Required**
   - This is a client-side only application
   - No npm, build tools, or compilation needed

---

## How to Run the Project

### Local Development

#### Option 1: Direct File Opening
1. Navigate to the project directory
2. Right-click on `index.html`
3. Select "Open with" → Choose your browser
4. The application will load immediately

#### Option 2: Using a Local Server (Recommended)
For better compatibility and to avoid CORS issues:

**Using Python 3:**
```bash
cd accessibility-project
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd accessibility-project
http-server
```

**Using Live Server (VS Code):**
1. Install Live Server extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

#### Option 3: Deploy to GitHub Pages
1. Push your changes to GitHub
2. Navigate to repository Settings → Pages
3. Set source to `main` branch
4. Your site will be available at `https://yourusername.github.io/accessibility-project`

### Accessing the Application
- **Home Page**: `index.html` - Search and filter locations
- **Map View**: Click "map" in navigation or visit `map.html`
- **Location Details**: Click any location card on the home page
- **Favorites**: Click "Favorites" to view saved locations
- **Compare**: Click "Compare" to view side-by-side comparisons
- **Add Place**: Submit custom accessible locations
- **About Us**: Learn more about the project
- **Contact Us**: Reach out for feedback or inquiries

---

## Usage Guide

### Finding Accessible Locations

1. **Search by Name**
   - Type location name in the search bar
   - Results update in real-time

2. **Filter by Category**
   - Use the "Category" dropdown
   - Select from: All, Library, Park, Restaurant, etc.

3. **Filter by Accessibility Features**
   - Check desired accessibility features
   - Options include: Wheelchair access, parking, restrooms, lighting, staff assistance, ASL, Braille, etc.
   - Multiple selections work with AND logic (all checked features must be present)

4. **Set Minimum Accessibility Score**
   - Use the range slider (0-100)
   - Only locations meeting the score threshold will display

5. **View on Map**
   - Filtered locations appear as markers
   - Click markers for quick info
   - Navigate and zoom as needed

6. **View Detailed Information**
   - Click any location card
   - See comprehensive accessibility breakdown
   - Check hours, address, and website

### Managing Favorites

1. Click "☆ Add Favorite" on any location card
2. Button changes to "★ Remove Favorite"
3. Visit "Favorites" page to view all saved locations
4. Favorites persist across browser sessions

### Comparing Locations

1. Click "+ Add To Compare" on up to 3 location cards
2. Navigate to "Compare" page
3. View side-by-side accessibility comparison
4. Remove locations using the Remove button if needed

### Adding Custom Locations

1. Navigate to "Add Place"
2. Fill in required information:
   - Location name
   - Type/category
   - Address
   - Contact details
3. Mark accessibility features as applicable
4. Submit to add to your personal database
5. Custom places appear in all searches and filters

---

## Data Structure

### Location Object Format
```json
{
  "id": "loc-001",
  "name": "Twin Hickory Library",
  "type": "library",
  "address": "5001 Twin Hickory Rd, Glen Allen, VA 23059",
  "website": "https://henricolibrary.org/twin-hickory",
  "lat": 37.6760004,
  "lng": -77.5950595,
  "accessibility": {
    "mobility": {
      "wheelchair_accessible_entrance": true,
      "accessible_parking": true,
      "accessible_restrooms": true,
      "ramp_or_level_entry": true,
      "elevator": true,
      "wheelchair_paths": true
    },
    "sensory": {
      "noise_level": "low",
      "lighting": "bright",
      "quiet_spaces": true
    },
    "communication": {
      "staff_assistance": true,
      "written_signage": true,
      "digital_resources": true,
      "asl_available": "unknown",
      "braille_available": "partial"
    }
  }
}
```

---

## Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ⚠️ Requires JavaScript enabled
- ⚠️ Requires localStorage support

---

## Future Improvements

### Phase 2: Enhanced Features
- **User Authentication**: Create accounts to sync favorites across devices
- **Real Reviews & Ratings**: Allow users to leave detailed accessibility reviews
- **Accessibility Audit Tools**: Businesses can submit official accessibility certifications
- **Event-Based Accessibility**: Filter events and venues by specific dates/times
- **Mobile App**: Native iOS and Android applications

### Phase 3: Data & Integration
- **API Integration**: Connect with Google Places and OpenStreetMap APIs for real-time data
- **Crowdsourced Data**: Community-driven accessibility updates and verification
- **Accessibility Certification**: Partner with disability advocacy organizations for data verification
- **Multi-Language Support**: Localization for non-English speakers
- **Export Functionality**: Download/print accessibility reports

### Phase 4: Advanced Features
- **Personalized Recommendations**: AI-powered suggestions based on user preferences
- **Route Planning**: Integrate with navigation for accessible route suggestions
- **Virtual Tours**: 360° venue walkthroughs for pre-visit planning
- **Accessible Transportation**: Integration with transit accessibility information
- **Community Forums**: Discussion boards for sharing accessibility experiences
- **Dark Mode**: Reduce eye strain for visually sensitive users

### Performance & Optimization
- **Progressive Web App (PWA)**: Offline functionality and app-like experience
- **Database Migration**: Move from JSON to proper backend database (PostgreSQL/MongoDB)
- **Caching Strategy**: Implement efficient caching for improved load times
- **Performance Monitoring**: Analytics and optimization tracking
- **SEO Optimization**: Improve search engine discoverability

### Accessibility Enhancements
- **WCAG 2.1 AA Compliance**: Full accessibility audit and implementation
- **Screen Reader Optimization**: Enhanced ARIA labels and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility throughout app
- **High Contrast Mode**: Additional visual options for low-vision users
- **Audio Descriptions**: For complex visualizations and maps

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AccessibilityFeature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add accessibility feature'`)
5. Push to your fork (`git push origin feature/AccessibilityFeature`)
6. Submit a Pull Request

### Contribution Guidelines
- Maintain consistent code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed
- Respect accessibility best practices

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact & Support

- **Project Author**: Sahasra Bhagwat
- **GitHub Repository**: [sahasrabhagwat/accessibility-project](https://github.com/sahasrabhagwat/accessibility-project)
- **For Feedback**: Visit the "Contact Us" page in the application
- **Issues & Bug Reports**: [GitHub Issues](https://github.com/sahasrabhagwat/accessibility-project/issues)

---

## Acknowledgments

- **Leaflet.js** for interactive mapping capabilities
- **OpenStreetMap** for map data and tiles
- **Local Richmond organizations** for accessibility insights
- **Community members** for testing and feedback

---

**Made with ♿ for accessibility and inclusivity**

*Last Updated: May 31, 2026*
