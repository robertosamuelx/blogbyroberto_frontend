import React, {useEffect, useState} from 'react';
import '../../global.css';
import './styles.css';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import sertao from '../../assets/sertao.jpg';
import { AiFillLike } from "react-icons/ai";
import api from '../../services/api';

export default function Home(){
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    

    useEffect( () => {
        api.get('/',{})
        .then( (response) => {
            setPosts(response.data);
            console.log(response.headers);
        } );
    },[localStorage.getItem('id')]);

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
        {posts.map( post_ => {
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
        )}

        <div>
            Páginas 
        </div>

    </div>
  </div>
        );
};