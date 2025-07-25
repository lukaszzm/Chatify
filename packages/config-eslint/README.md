# @chatify/config-eslint

Shared ESLint configuration presets for the Chatify monorepom provides consistent code quality and style enforcement across all JS/TS files in the project.

## Configurations

- `base.js` - Base ESLint configuration with fundamental rules
- `nest.js` - Configuration tailored for NestJS backend applications
- `react.js` - Configuration optimized for React applications

## Usage

Extend the appropriate configuration in your ESLint config file:

```javascript
// eslint.config.mjs
import baseConfig from "@chatify/config-eslint/react.js";

export default baseConfig;
```

This ensures consistent code style, best practices, and error prevention across the entire monorepo.
