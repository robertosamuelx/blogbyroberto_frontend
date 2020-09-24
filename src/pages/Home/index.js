import React, {useEffect, useState} from 'react';
import '../../global.css';
import './styles.css';
import profile from '../../assets/profile.jpg';
import { AiFillLike} from "react-icons/ai";
import { GiCancel } from 'react-icons/gi'
import {GrLinkNext, GrLinkPrevious} from 'react-icons/gr';
import api from '../../services/api';
import { DateFormat, MyLoading , Menu, MyModal, FileIcon} from '../../resources/components';
import { FaTrashAlt } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { formatSize } from '../../resources/functions'
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
    const [file, setFile] = useState(new Blob());
    const [fileName, setFileName] = useState('');

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

        const data = new FormData();
        data.append('title',title);
        data.append('text',text);
        data.append('howManyLiked',0);
        if(isVideo)
            data.append('isVideo',isVideo);
        if(file){
            if(file.size <= (100 * 1024 * 1024))
                data.append('file',file, fileName);
            else {
                setLabelModal('O arquivo é grande demais!');
                setIsVisibleLoading(false);
                setIsVisibleModal(true);
                refresh(1);
                return ;
            }
        }

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
        } ).catch( err => {
            console.log(err.message)
            setLabelModal('Falha ao carregar o arquivo!');
            setIsVisibleLoading(false);
            setIsVisibleModal(true);
            refresh(1);
        });
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
                return renderFile(props.post);
            }
            return (<p>{props.post.text}</p>);
        }
    }

    function renderFile(post){
        return (
            <div className="post-body render">
                <a target="_blank" rel="noopener noreferrer" href={post.url}><FileIcon file={post} /></a>
                <div className="post-body render-file">
                    <b>{post.fileName}</b>
                    <i>{formatSize(post.size)}</i>
                </div>
                <p>{post.text}</p>
            </div>
        );
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

                        <input 
                            type="file"
                            className="poster-footer file"
                            onChange={e => {
                                setFile(e.target.files[0])
                                setFileName(e.target.files[0].name)
                            }}
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