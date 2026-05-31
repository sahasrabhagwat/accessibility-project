# Accessibility Project

A comprehensive JavaScript project dedicated to building accessible web applications and components that follow WCAG 2.1 standards.

🌐 **[Visit the Website](https://sahasrabhagwat.github.io/accessibility-project/)**

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project focuses on creating reusable, accessible web components and utilities that ensure all users, regardless of ability, can navigate and interact with web applications effectively. It emphasizes:

- **WCAG 2.1 Compliance** - Meeting Level AA accessibility standards
- **Semantic HTML** - Using proper HTML elements for better screen reader support
- **Keyboard Navigation** - Full keyboard accessibility for all components
- **ARIA Attributes** - Proper use of ARIA roles, properties, and states
- **Color Contrast** - Ensuring sufficient contrast ratios for readability
- **Focus Management** - Clear and logical focus indicators

## ✨ Features

- Accessible form components (inputs, buttons, modals)
- Screen reader optimized navigation patterns
- Keyboard shortcut handling
- Color contrast validation utilities
- Focus trap management
- Accessible data tables and lists
- ARIA attribute generators and validators
- Testing utilities for accessibility compliance

## Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/sahasrabhagwat/accessibility-project.git

# Navigate to the project directory
cd accessibility-project

# Install dependencies
npm install
```

### Usage

```javascript
// Import accessible components
import { AccessibleButton, AccessibleModal, AccessibleForm } from './components';

// Use in your application
const button = new AccessibleButton({
  text: 'Submit',
  ariaLabel: 'Submit form'
});
```

## 📚 Documentation

For detailed documentation and examples, please refer to the [docs](./docs) directory.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your contributions:
- Follow the project's coding standards
- Include tests for new functionality
- Are tested for accessibility compliance
- Include appropriate documentation

## 📖 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [The A11Y Project](https://www.a11yproject.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

**Made with ♿ for accessible web**
