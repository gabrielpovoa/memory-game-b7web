import React from 'react'
import * as C from './styles'
import { GridType } from '../../types/GridItemType'
import { items } from '../../data/items'

import B7SVG from '../../svgs/b7.svg'

interface Props {
    item: GridType;
    onClick: () => void
}

export const GridLayout = ({ item, onClick }: Props) => {
    return (
        <C.Container
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}>
            
            {item.permanentShown === false && item.shown === false &&
                <C.Icon 
                opacity={.1}
                src={B7SVG} alt='' />
            }

            {(item.permanentShown || item.shown) === true && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt={items[item.item].name} />
            }
        </C.Container>
    )
}

export default GridLayout