import { useEffect, useState } from "react"
import { getMainVideos, getMovies } from "../axios/axios";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { motion } from 'framer-motion';
import Button from "./Button";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";


export default function MainVideo() {

    const [videoKey, setVideoKey] = useState(null);
    const [randomMovie, setRandomMovie] = useState('');
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        async function movieData() {
            try {
                const movies = await getMovies('now_playing');//메인비디오에 들어갈 목록을 가져옴
                // console.log(movies)
                const randomVideo = movies[Math.floor(Math.random() * movies.length)]
                setRandomMovie(randomVideo);
                const videos = await getMainVideos(randomVideo.id)
                if (videos.length > 0) {
                    setVideoKey(videos[0].key)
                } else {
                    console.log('비디오를 받아오지 못했습니다.')
                }
            } catch (error) {
                console.error(error)
            }
        }
        movieData()
    }, [])
    //yarn add react-player

    return (
        <MainVideoContainer>
            <VideoWrapper>
                <ReactPlayer
                    url={`https://youtu.be/${videoKey}`}
                    muted={true}
                    controls={false}
                    width='100%'
                    height='100%'
                    playing={true}
                />
            </VideoWrapper>
            <VideoInfoWrapper>
                <motion.h2 initial={{
                    transform: 'scale(1.3) translateY(0px)',
                    transformOrigin: 'left bottom'
                }}
                    animate={{
                        transform: 'scale(1) translateY(100px)',
                        transition: { delay: 3, duration: 1 }
                    }}
                >
                    {randomMovie.title}
                </motion.h2>

                <motion.p
                    initial={{
                        transform: 'translateY(0)',
                        opacity : 1,
                        transformOrigin: 'left bottom'
                    }}
                    animate={{
                        transform: 'translateY(110px)',
                        opacity : 0,
                        transition : { delay: 3, duration: 1 }
                    }}

                >
                    {randomMovie.overview}
                </motion.p>
                <BtnsWrapper>
                    <Button accent='accent'> <FaPlay />재생</Button>
                    <Button> <IoIosInformationCircleOutline/>상세정보</Button>
                </BtnsWrapper>

            </VideoInfoWrapper>
        </MainVideoContainer>
    )
}

const MainVideoContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`
const VideoWrapper = styled.div`
    width: 100%;
    height: 100%;
`

const VideoInfoWrapper = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 0px 60px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    h2{
        color: #fff;
        font-size: 80px;
        font-weight: bold;
    }
    p{
        font-size : 24px;
        line-height: 1.3;
        width: 40%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: #fff;
        margin-bottom: 24px;
        position: relative;
        z-index: 1;
    }
`

const BtnsWrapper = styled.div`
    display: flex;
    gap: 12px;
    position: relative;
    z-index: 3;
`