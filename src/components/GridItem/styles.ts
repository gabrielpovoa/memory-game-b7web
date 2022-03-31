import styled from "styled-components";
import { darken, lighten, opacify } from 'polished'

interface ContainerProps {
    showBackground: boolean;
}

interface IconeProps {
    opacity?: number
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground ? `${darken(0.3, '#1550FF')}` : `${lighten(0.7, '#E2E3E3')}`};
    height: 100px;
    border-radius: 20px;
    display: felx;
    align-items:center;
    justify-content: center;
    cursor: pointer;

`;

export const Icon = styled.img<IconeProps>`
    height: 40px; width: 40px;
    opacity: ${props => props.opacity ? props.opacity  : `${opacify(0.4, '#1550FF')}`}
`;