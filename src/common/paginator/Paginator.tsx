import React, { useState } from "react";
import style from "./Paginator.module.css";

type Props = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize: number
}

const Paginator: React.FC<Props> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize}) => {
    let pagesCount = Math.ceil(totalItemsCount/pageSize);

    let pages: Array<number> = [];
    for (let i=1; i<=pagesCount; i++) {
        pages.push(i);
    }

    const portionsCount = Math.ceil(pagesCount/portionSize);
    const [portionNumber, setPortionNumber] = useState<number>(1);
    const leftBorder = (portionNumber - 1) * portionSize + 1;
    const rightBorder = portionNumber * portionSize;

    return (
        <div className={style.paginatorMenu}>
            {portionNumber > 1 &&
                <button onClick={() => {setPortionNumber( portionNumber - 1 )}}>PREV</button>
            }
            {pages
                .filter(p => p >= leftBorder && p <= rightBorder)
                .map(p => {
                return <span onClick={ () => onPageChanged(p)} 
                                className={(currentPage === p) ? style.selectedPage : undefined} 
                                key={p}>{p}</span>
            })}
            {portionNumber < portionsCount &&
                <button onClick={() => {setPortionNumber( portionNumber + 1 )}}>NEXT</button>
            }
        </div>
    )
}

export default Paginator;