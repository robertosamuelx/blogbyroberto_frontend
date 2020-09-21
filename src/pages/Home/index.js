import React, {useEffect, useState} from 'react';
import '../../global.css';
import './styles.css';
import profile from '../../assets/profile.jpg';
import { AiFillLike } from "react-icons/ai";
import { GiCancel } from 'react-icons/gi'
import {GrLinkNext, GrLinkPrevious} from 'react-icons/gr';
import api from '../../services/api';
import { DateFormat, MyLoading , Menu, MyModal} from '../../resources/components';
import { FaTrashAlt } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
const postPerPage = 5;

export default function Home(){
    const [posts, setPosts] = useState([]);
    const [totalPost, setTotalPost] = useState(1);
    const [page, setPage] = useState(0);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [title,setTitle] = useState('');
    const [text, setText] = useState('');
    const [isVideo, setIsVideo] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [labelModal, setLabelModal] = useState('');

    function refresh(value){
        setIsVisibleLoading(true);
        api.get('/',{
            params: {
                'page' : value
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

    function changePage(value){
        setIsVisibleLoading(true);
        let next_page = 0;
        if(value === 'next')
            next_page = Number(page) + 1;
        else
            next_page = Number(page) - 1;
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

    useEffect( () => {
        console.log('refresh');
        refresh(1);
    },[]);

    function RenderPrevControl(){
        if(page <= totalPost && page > 1)
            return (<GrLinkPrevious className="control" onClick={() => changePage('prev')} size={25} />);
        else 
            return (<GiCancel className="control" size={25} />);
    }

    function RenderNextControl(){
        if(page < totalPost)
            return (<GrLinkNext className="control" onClick={() => changePage('next')} size={25} />);
        else 
            return (<GiCancel className="control" size={25} />);
    }


    function createPost(event){
        setIsVisibleLoading(true);
        event.preventDefault();

        const data = {title,text,howManyLiked:0,isVideo}
        console.log(isVideo);

        api.put('/post',data,{
            headers: {
                Authorization: localStorage.getItem('id')
            }
        }).then( response => {
            console.log(response);
            setLabelModal('Postagem feita!');
            setIsVisibleLoading(false);
            setIsVisibleModal(true);
            refresh(1);
        } );
    }

    function deletePost(id){
        setIsVisibleLoading(true);
        api.delete(`/post/${id}`, {
            headers: {
                Authorization: localStorage.getItem('id')
            }
        }).then( response => {
            console.log(response.data);
            setIsVisibleLoading(false);
            setLabelModal('Postagem apagada!');
            setIsVisibleModal(true)
            refresh(page);
        }).catch( response => {
            console.log(response.data);
        });
    }

    function RenderPostBody(props){
        if(props.post.isVideo){
            console.log(props.post.text);
            return (<iframe title={props.post.title} src={props.post.text} 
            frameBorder="0" allow="accelerometer; 
            autoplay; encrypted-media; 
            gyroscope; picture-in-picture" allowFullScreen></iframe>);}
        else {
            if(props.post.awsKey){
                return (<p><a href={props.post.url}>{props.post.awsKey}</a></p>);
            }
            return (<p>{props.post.text}</p>);
        }
    }
    
    return(

    <div>
        <Menu />
        <MyModal isOpen={isVisibleModal} onRequestClose={() => setIsVisibleModal(false)} contentLabel={labelModal}/>

        {localStorage.getItem('id') != null &&
            <div 
                className="poster">
                    <form 
                    onSubmit={createPost}>

                        <textarea 
                        placeholder="Postagem..." 
                        value={text}
                        onChange={e => setText(e.target.value)} 
                        />

                        <div 
                        className="poster-footer">

                            <p className="poster-footer-check">Assinale para vídeo <input onChange={e => {setIsVideo(e.target.checked)}} type="checkbox"/></p>

                            <input 
                            type="text"
                            className="poster-footer-title"
                            placeholder="Título da postagem" 
                            value={title}
                            onChange={e => setTitle(e.target.value)} 
                            />

                            <button 
                            type="submit"><MdSend color="#000000" className="poster-footer-icon" size={25}/></button>
                        </div>
                    </form>
                </div>}
        

    <div className="body">

            { isVisibleLoading === true &&
            <div style={{display: 'flex',justifyContent:'center',margin: '2%'}}><MyLoading /></div>
            }
        {
            posts.map( post_ => {
                return (
                    <div className="post" key={post_._id}>
                        <div className="post-header">
                            <img src={profile} alt="meu perfil"/>
                            <h3>{post_.title}</h3>
                            {localStorage.getItem('id') != null &&
                            <FaTrashAlt style={15} onClick={() => {deletePost(post_._id)}} color="#000000"/>}
                        </div>
                        <div className="post-body">
                            <RenderPostBody post={post_}/>
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