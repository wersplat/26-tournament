import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '/Volumes/870SSD/Active GH Projects/graphql-server/src/schema-clean.graphql',
  documents: ['src/graphql/**/*.graphql'],
  ignoreNoDocuments: false,
  generates: {
    'src/types/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,
        skipTypename: false,
      },
    },
  },
};

export default config;


