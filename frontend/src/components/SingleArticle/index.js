import React, { useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_getSingleArticle } from '../../store/article';
import { Col, Container, Row } from "react-bootstrap";


export default function SingleArticle() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const article = useSelector((state) => state.articles.article.article);
    const comments = useSelector((state) => state.articles.article.comments)

useEffect(() => {
    dispatch(thunk_getSingleArticle(id));
}, [dispatch])

    return (
        <>
        <div>{article?.text}</div>
        {console.log(article)}
        <h1>Comments</h1>
        {comments?.map((comment) => (
            <p id={comment.id}>{comment.text}</p>
        ))}
        </>
    )
}