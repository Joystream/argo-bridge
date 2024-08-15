# Argo bridge core package

This package contains a core package used by the other components of the bridge. It contains some utility functions, and most importantly, it specifies the configuration file (`src/config.ts`). The configuration file specifies configurations for all the networks supported by the bridge. This includes contract addresses, RPC endpoints, multisig configurations, etc. After any changes are applied to the package, it must be rebuilt before the changes will take effect in the other components.

## Building

To build the package, first make sure that you have the dependencies installed:

```bash
npm install
```

Then, you can build the package:

```bash
npm run build
```

The build contains both the CommonJS and ESM versions of the package, so that it can be used in any environment.
