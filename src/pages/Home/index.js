import React, {useEffect, useState} from 'react';
import {} from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import sertao from '../../assets/sertao.jpg';
import { AiFillLike } from "react-icons/ai";
import { GiCancel } from 'react-icons/gi'
import {GrLinkNext, GrLinkPrevious} from 'react-icons/gr';
import api from '../../services/api';
import MyLoading from '../../resources/Loading';
import DateFormat from '../../resources/DateFormat';

const postPerPage = 5;

export default function Home(){
    const [posts, setPosts] = useState([]);
    const [totalPost, setTotalPost] = useState(1);
    const [page, setPage] = useState(0);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    function nextPage(){
        setIsVisibleLoading(true);
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
            setTotalPost(Math.ceil(Number(response.headers['total'])/postPerPage));
            console.log(`actual page ${page}`);
            setIsVisibleLoading(false);
        } );
    }

    function prevPage(){
        setIsVisibleLoading(true);
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
            setTotalPost(Math.ceil( Number(response.headers['total'])/postPerPage));
            console.log(`actual page ${page}`);
            setIsVisibleLoading(false);
        } );
    }

    useEffect( () => {
        nextPage()
    },[]);

    function RenderLoading(){
        if(isVisibleLoading){
            return (<div style={{display: 'flex',justifyContent:'center',margin: '2%'}}><MyLoading /></div>);
        }
        else {
            return (<div></div>);
        }
    }

    function RenderPrevControl(){
        if(page <= totalPost && page > 1)
            return (<GrLinkPrevious className="control" onClick={prevPage} size={25} />);
        else 
            return (<GiCancel className="control" size={25} />);
    }

    function RenderNextControl(){
        if(page < totalPost)
            return (<GrLinkNext className="control" onClick={nextPage} size={25} />);
        else 
            return (<GiCancel className="control" size={25} />);
    }
    

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
        <RenderLoading />
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
                            <p>Postado em <DateFormat date={post_.postedAt}/></p>
                        </div>
                    </div>
                );
            }
            )
        }

        <div className="footer">
            <RenderPrevControl />
            Página {page} de {totalPost}
            <RenderNextControl />
        </div>

    </div>
  </div>
        );
};