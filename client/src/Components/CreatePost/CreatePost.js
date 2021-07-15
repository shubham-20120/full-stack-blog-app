import React, { useEffect, useState } from 'react'
import { MDBInput } from "mdbreact";
import './CreatePost.css'
import { Button } from '@material-ui/core';
import ViewBlog from '../ViewBlog/ViewBlog';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CircularProgress from '@material-ui/core/CircularProgress';
const CreatePost = () => {
    const [allParas, setAllParas] = useState([]);
    const [tempString, setTempString] = useState('');
    const [title, setTitle] = useState('');
    const [headerPhotoLink, setHeaderPhotoLink] = useState(null);
    const [previewPhotoLink, setPreviewPhotoLink] = useState(null);
    const [preview, setPreview] = useState(false);
    const [cloudinaryLink, setCloudinaryLink] = useState('');
    toast.configure();
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            history.push('/')
        }
    }, [])
    useEffect(() => {
        if (cloudinaryLink) {
            fetch("/make-blog", {
                method: "post",
                headers: { "Content-Type": "application/json", authorization: localStorage.getItem('userToken') },
                body: JSON.stringify({
                    title,
                    headerPhoto: cloudinaryLink,
                    description: allParas
                })
            }).then(res => res.json()).then(data => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }
                history.push('/my-blog')
                toast.success("Blog posted successfully!")
            })
        }
    }, [cloudinaryLink])

    const sendToBackend = () => {
        const data = new FormData();
        data.append('file', headerPhotoLink);
        data.append('upload_preset', 'social buddy');
        data.append('cloud_name', 'dg8m0efcx');
        fetch('https://api.cloudinary.com/v1_1/dg8m0efcx/image/upload', {
            method: 'post', body: data
        })
            .then(res => res.json())
            .then(data => {
                setCloudinaryLink(data.secure_url)
            })
            .catch(error => console.log(error))
    }

    const resetTemplate = () => {
        setTitle('');
        headerPhotoLink('');
        setAllParas([]);
    }
    const addParagraph = () => {
        setAllParas([...allParas, tempString]);
        setTempString('');
    }
    const toPreview = {
        pathname: `/preview/${localStorage.getItem('userToken').slice(5, 8)}`,
        state: {
            title: title,
            headerPhoto: previewPhotoLink,
            paras: allParas,
            date: Date.now()
        }
    }
    return (
        !preview ?
            <div className='createpost-main'>
                <div className="createpost-container">
                    {/* photo upload */}
                    <input onChange={(e) => {
                        setHeaderPhotoLink(e.target.files[0]); console.log(e.target.files[0].name); setPreviewPhotoLink(URL.createObjectURL(e.target.files[0]));
                    }} type="file" id="actual-btn" hidden />
                    <label className='temp' htmlFor="actual-btn">Cover Photo</label>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                            headerPhotoLink == null ? <b>No Leading Photo is selected</b> : headerPhotoLink.name
                        }
                    </span>

                    <div > <MDBInput value={title} onChange={(e) => { setTitle(e.target.value) }} type='textarea' className='createpost-input' label="Title" icon="pen" /></div>
                    {
                        allParas.length ?
                            allParas.map((para, index) => {
                                return (<p key={index}>
                                    {
                                        para.length < 10 ? para : (para.slice(0, 10) + '...')
                                    }
                                </p>)
                            })
                            :
                            <>
                                <hr />
                                <h5 style={{ fontWeight: '400', color: 'black' }}>No Paragraphs Selected</h5>
                            </>
                    }
                    <MDBInput value={tempString} onChange={(e) => { setTempString(e.target.value) }} type='textarea' rows="10" className='createpost-input' label="Decription" icon="pencil-ruler" />
                    <div className="addPara-btn"><Button variant="contained" color="secondary" onClick={addParagraph}>Add Paragraph</Button></div>
                    <div className="createpost-btns">
                        <Button variant="contained" color="primary" onClick={resetTemplate}>Reset Template</Button>
                        <Button variant="contained" color="primary" onClick={() => { localStorage.setItem('title', title); localStorage.setItem('headerPhoto', previewPhotoLink); localStorage.setItem('paras', JSON.stringify(allParas)); }}>
                            <Link to={toPreview} target="_blank" >Preview</Link>
                        </Button>
                        <Button variant="contained" color="primary" onClick={sendToBackend}>Post Blog</Button>
                    </div>
                </div>
            </div >
            :
            <>
                <Button style={{ float: 'right' }} variant="contained" color="primary" onClick={() => { setPreview(!preview) }}>Back <br /> to <br /> Edit</Button>
                < ViewBlog title={title} headerPhoto={headerPhotoLink} paras={allParas} />
            </>
    )
}

export default CreatePost
