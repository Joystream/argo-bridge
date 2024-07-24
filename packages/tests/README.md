## Argo bridge integration tests

This package contains integration tests for the argo bridge. The tests prepare a full deployment:
1. Launch development Joystream and EVM chains,
2. Elect the council, deploy the EVM contracts,
3. Launch the squid indexer for both chains.

Then a suite of tests is run that will interact with both networks and verify the bridge works as expected, including the data indexed by both indexers. The main test suite is located in `src/main.test.ts`.

### Running the tests

To run the tests, you need to meet the following requirements:

- Have `bun` installed, it's used to run the tests.
- Have `docker compose` installed, it's used to launch the Postgres DB for the indexer.
- Have a Docker Joystream node image available locally. At the time of writing, the image used is `joystream/node:9bb9ac54b99d6988c5127046966916681dbb3ffa`. The image is available on Docker Hub, but only for `linux/amd64`. If you're running on a different platform, you may need to build the image from monorepo yourself. Image tag is defined in `src/setup/joy.ts`.

Once you have all the requirements, you can run the tests with:
```bash
npm run test
```

After the tests are finished, they should perform a cleanup of the local environment.
