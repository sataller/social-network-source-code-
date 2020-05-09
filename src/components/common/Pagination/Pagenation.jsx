import React, {useState} from "react";
import style from "./Pagination.module.css";

const Pagination = ({totalCount, pageSize, currentPage, paginationSize, ...props}) => {
    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let [portionNumber, setPortionNumber] = useState(1)

    let leftBorder = (portionNumber - 1) * paginationSize + 1;

    let rightBorder = portionNumber * paginationSize

    let pagination = pages.filter(p => p >= leftBorder).filter(p => p <= rightBorder)


    // let endPage = pages[pages.length-1]
    // let firstPage = pages[0]
    // pagination.push(endPage)
    // pagination.unshift(firstPage)

    return (
        <div className={style.pagination}>
            <div className={style.button}>{portionNumber <= 1 ? <button className={style.pageButton}></button> :
                <button type={"button"} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }} className={style.pageButton}> {"<"} </button>
            }</div>

            {pagination.map(p => {
                return <div className={style.pageNumber + " " + (currentPage === p && style.selected)}
                            onClick={(e) => {
                                props.onPageChanged(p)
                            }}>{p} </div>
            })}

            <div className={style.button}>{portionNumber == Math.ceil(pagesCount / paginationSize) ?
                <button className={style.pageButton}></button> :
                <button type={"button"} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }} className={style.pageButton}> {">"} </button>
            }</div>

        </div>
    )
}

export default Pagination