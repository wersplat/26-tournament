import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://graphql.bodegacatsgc.gg/v1/graphql',
  documents: ['src/lib/graphql/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    'src/types/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        skipTypename: false,
        headers: {
            'X-Hasura-Role': 'anonymous'
        }
      },
    },
  },
};

export default config;
