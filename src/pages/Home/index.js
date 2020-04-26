import React, {useEffect, useState} from 'react';
import {} from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import sertao from '../../assets/sertao.jpg';
import { AiFillLike } from "react-icons/ai";
import {GrLinkNext, GrLinkPrevious} from 'react-icons/gr';
import api from '../../services/api';

const postPerPage = 5;

export default function Home(){
    const [posts, setPosts] = useState([]);
    const [totalPost, setTotalPost] = useState(1);
    const [page, setPage] = useState(0);

    function nextPage(){
        const next_page = Number(page) + 1;
        console.log('next - '+next_page);
        api.get('/',{
            params: {
                'page' : next_page
            }
        })
        .then( response => {
            setPage(response.headers['page']);
            setPosts(response.data);
            setTotalPost(Number(response.headers['total'])/postPerPage);
            console.log(`actual page ${page}`);
            if(next_page > totalPost){
                alert('não há mais postagens');
                prevPage();
            }
        } );
    }

    function prevPage(){
        const prev_page = Number(page) - 1;
        console.log('prev - '+prev_page);
        api.get('/',{
            params: {
                'page' : prev_page
            }
        })
        .then( response => {
            setPage(response.headers['page']);
            setPosts(response.data);
            setTotalPost(Number(response.headers['total'])/postPerPage);
            console.log(`actual page ${page}`);
            if(prevPage < 1)
                nextPage();
        } );
    }

    useEffect( () => {
        nextPage()
    },[]);

    return( 
    <div>
        <div className="menu">
        <ul>
        <li><Link className="link" to="/">INÍCIO</Link></li>
        <li><Link className="link" to="/">BIBLIOTECA</Link></li>
        <li className="profile">
            <p>Blog By Roberto</p>
        </li>
        <li><Link className="link" to="/quemsoueu">QUEM SOU EU</Link></li>
        <li><Link className="link" to="/contato">CONTATO</Link></li>
        </ul>
    </div>


    <div className="body">
        {
            posts.map( post_ => {
                return (
                    <div className="post" key={post_._id}>
                        <div className="post-header">
                            <img src={profile} />
                            <h3>{post_.title}</h3>
                        </div>
                        <div className="post-body">
                            <p>{post_.text}</p>
                        </div>
                        <div className="post-footer">
                            <section><AiFillLike color="#00ffff" size={20}/><p>{post_.howManyLiked} pessoas curtiram isso</p></section>
                            <p>Postado em {post_.postedAt}</p>
                        </div>
                    </div>
                );
            }
            )
        }

        <div className="footer">
            <GrLinkPrevious onClick={prevPage} size={16} />
            Página atual: {page}
            <GrLinkNext onClick={nextPage} size={16} />
        </div>

    </div>
  </div>
        );
};