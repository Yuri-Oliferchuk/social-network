import React from "react";
import style from "./Paginator.module.css"

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);

    let pages = [];
    for (let i=1; i<=pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={style.usersMenu}>
            {pages.map(p => {
                return <span onClick={ () => props.onPageChanged(p)} 
                                className={(props.currentPage === p) ? style.selectedPage : undefined} 
                                key={p}>{p}</span>
            })}
        </div>
    )
}

export default Paginator;