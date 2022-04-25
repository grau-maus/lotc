import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_getSingleArticle } from '../../store/article';
import { Col, Container, Row } from "react-bootstrap";


export default function SingleArticle() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const article = useSelector((state) => state.articles.article);
    const comments = useSelector((state) => state.articles.comments);
    let [loaded, setLoaded] = useState(false);

useEffect(() => {
    dispatch(thunk_getSingleArticle(id));
    setLoaded(true)
}, [dispatch]);

 if(!article) return <h1>loading</h1>
 return (
        <>
        <div breakpoints={['sm']}>
          <h2>{article?.title}</h2>
          <div>{article?.text}</div>


        </div>
        <h1>Comments</h1>
        {comments?.map((comment) => (
            <p id={comment.id}>{comment.text}</p>
        ))}
        </>
    )

}