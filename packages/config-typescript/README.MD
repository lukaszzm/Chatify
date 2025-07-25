# @chatify/config-typescript

Shared TypeScript configuration presets for the Chatify monorepo, provides consistent TypeScript settings across all packages and applications to ensure type safety and consistent compilation behavior.

## Configurations

- `base.json` - Base TypeScript configuration with common settings
- `nest.json` - Configuration optimized for NestJS backend applications
- `react-library.json` - Configuration for React component libraries
- `vite.json` - Configuration for Vite-based applications

## Usage

Extend the appropriate configuration in your `tsconfig.json`:

```json
{
  "extends": "@chatify/config-typescript/nest.json",
  "compilerOptions": {
    // Additional project-specific options
  }
}
```
