import React, { useEffect } from 'react';
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { useState } from 'react';
import { format } from 'date-fns'
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from './api/Posts'
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [post,setPost] = useState([])
  const [search,setSerach] = useState('')
  const [searchResult,setSearchResult] = useState([])
  const [postTitle,setPostTittle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/post')

  useEffect(()=>{
    setPost(data)
  },[data])

  useEffect(()=>{
    const filteredResults = post.filter((post)=>{
      return  (post.body.toLowerCase().includes(search.toLowerCase()) ||
               post.title.toLowerCase().includes(search.toLowerCase()))
    });
    setSearchResult(filteredResults.reverse());
  },[post,search])

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id = post.length ? post[post.length - 1].id + 1 : 1;
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody}
    try{
      const response = await api.post('/post',newPost)
      const allPosts = [...post, response.data]
      setPost(allPosts)
      setPostTittle('')
      setPostBody('')
      navigate('/')
    }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else {
          console.log(`Error : ${err.message}`);
        } 
    }
    
  }

  const handleEdit =async (id)=>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {id,title: editTitle,datetime,body: editBody}
    try{
      const response = await api.put(`/post/${id}`,updatedPost)
      setPost(post.map(post => post.id === id ? {...response.data} : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete =async(id)=>{
    try{
      await api.delete(`/post/${id}`)
      const postDelete = post.filter(post => post.id !== id);
      setPost(postDelete)
      navigate('/')
    }catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else {
        console.log(`Error : ${err.message}`);
      } 
    }

  }  
  return (
    <div className='App'>
      <Header title='social media' width={width} />
      <Nav
        search={search}
        setSerach={setSerach}
      />
      <Routes>
        <Route path='/' element={<Home 
        post={searchResult} 
        fetchError={fetchError} 
        isLoading={isLoading} />} />
        <Route path='/post'>
            <Route index element={<NewPost 
              postTitle={postTitle}
              postBody={postBody}
              setPostTittle={setPostTittle}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
              posts = {post}
              />}
            />
            <Route path=':id' element={<PostPage posts={post} handleDelete={handleDelete}/>} />
        </Route>
      <Route path='/edit/:id' element={<EditPost
      editTitle={editTitle}
      editBody={editBody}
      posts={post}
      setEditBody={setEditBody}
      setEditTitle={setEditTitle}
      handleEdit={handleEdit} 
      />} 
      
      />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
