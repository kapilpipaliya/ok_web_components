export default { title: "Application/Macaron" };

import { styled } from '@macaron-css/solid';

const StyledButton = styled('button', {
    base: {
        borderRadius: 6,
    },
    variants: {
        color: {
            neutral: { background: 'whitesmoke' },
            brand: { background: 'blueviolet' },
            accent: { background: 'slateblue' },
        },
        size: {
            small: { padding: 12 },
            medium: { padding: 16 },
            large: { padding: 24 },
        },
        rounded: {
            true: { borderRadius: 999 },
        },
    },
    compoundVariants: [
        {
            variants: {
                color: 'neutral',
                size: 'large',
            },
            style: {
                background: 'ghostwhite',
            },
        },
    ],

    defaultVariants: {
        color: 'accent',
        size: 'medium',
    },
});

export const Macaron = () => {


    return <>
        <StyledButton color="accent" size="small" rounded={true}>
            Click me!
        </StyledButton>
    </>
}