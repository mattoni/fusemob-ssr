import { lazyLoad } from 'fuse-tools';

export const asyncRoutes = {
    about: {
        instructions: 'views/about/components/**',
        entrypoint: 'views/about/components/index.tsx',
    },
    home: {
        instructions: 'views/home/components/**',
        entrypoint: 'views/home/components/index.tsx',
    },
    currency: {
        instructions: 'views/currency/components/**',
        entrypoint: 'views/currency/components/index.tsx',
    },
};

export type IAsyncRoutes = keyof typeof asyncRoutes;
