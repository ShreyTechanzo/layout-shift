import { VariantProps } from 'class-variance-authority';

import { typographyVariants } from './helpers';

export type Variant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;
