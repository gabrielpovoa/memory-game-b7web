import { useEffect, useState } from 'react';
import { GridType } from './types/GridItemType';
import { items } from './data/items'
import { formatTimeElapsed } from './helpers/formatTimeElepsed';

import Global from './GlobalStyle/Global';
import * as C from './App.styles'

import logoImg from './assets/devmemory_logo.png'
import buttonIcon from './svgs/restart.svg'

import InfoItem from './components/infoItem'
import Button from './components/ButtonItem'
import GridLayout from './components/GridItem';

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElepsed, setTimeElepsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridType[]>([])

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) { setTimeElepsed(timeElepsed + 1) }
    }, 1000)

    return () => clearInterval(timer)
  }, [playing, timeElepsed])

  const resetAndCreateGrid = () => {
    //1st step: reset
    setTimeElepsed(0)
    setMoveCount(0)
    setShowCount(0)

    //2nd create grid 

    let tmpGrid: GridType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({ item: null, shown: false, permanentShown: false })
    }

    //2.1 fill the grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {

        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    //2.3 put on state
    setGridItems(tmpGrid)

    //3rd start the game
    setPlaying(true)
  }

  // verify if game is over
  useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false)
    }
  }, [gridItems, moveCount])

  //Verify if opened are equal
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {

        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems]
          // v1 - if both cards are equal, turn them on permanent else, close them up
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0)
        } else {
          //v2 verification: both items are difenrent, close all them up
          setTimeout(() => {
            let tmpGrid = [...gridItems]
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGridItems(tmpGrid);
            setShowCount(0)
          }, 1000);
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }

  }, [shownCount, gridItems])

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];
      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount(shownCount + 1);
      }

      setGridItems(tmpGrid)
    }
  }

  return <>
    <Global />
    <C.Container className="App">
      <C.Info>
        <C.LogoLink>
          <img src={logoImg} alt="" width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Time' value={formatTimeElapsed(timeElepsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>
        <Button icon={buttonIcon} label="Reiniciar" onClick={resetAndCreateGrid} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridLayout
              item={item}
              key={index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  </>;
}

export default App;
