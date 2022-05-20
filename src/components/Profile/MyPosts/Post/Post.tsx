import React, { FC } from "react";
import style from './Post.module.css'
import ava from '../../../../assets/images/ava.png'

type Props = {
    message: string,
    likesCount: number,
}

const Post: FC<Props> = (props) => {
    return (
        <div className={style.item}>
            <img src={ava} alt='avatar'></img>
            <p className={style.text}>{props.message}</p>
            <div className={style.likes}>
                <span>Like:{props.likesCount}</span>
            </div>
        </div>
    );
}

export default Post;