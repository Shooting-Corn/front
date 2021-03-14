import React , {useState}from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Timeline from "./Timeline.js";
import './Detail.css'

const GET_MOVIE = gql`
  query getMovie($id: String!) {
    movie(id: $id) {
      id
      title
      directors
      stars
      genres
      runtime
      grade 
      synopsis
      violence_per
      violence
      nudity
      word
      alcohol
      poster
      isLiked @client
    }
  }
`;

const Container = styled.div`

width: 100%;
height: 100%;

  
`;





const Column = styled.div`
  margin-left: 420px;
  width: 50%;
  padding:40px;
  
  background-color: white;
  border-radius: 18px;
  box-shadow:  10px 10px 10px #d1d2d4,
               -10px -10px 10px #ffffff;

  position:absolute;
  top:280px;
  
`;

const Title = styled.h1`
  position:absolute;
  left:550px;
  top:150px;
  font-size: 85px;
  margin-bottom: 15px;
  color:red;
`;

const Subtitle = styled.h4`
  margin-bottom: 35px;
  font-size: 18px;
`;

const Description = styled.p`
  margin-top: 10px;
  margin-bottom:30px;
  font-size: 18px;
  color:black;
`;




const Poster = styled.div`

position:absolute;
top: 5px; 
left:-300px;
  width: 30%;
  height: 100%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;


  border-radius: 18px;
`;




const Poster2 = styled.div`

position:absolute;
top: 0px; 
left:0px;
  width: 100%;
  height: 65%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;

  z-index:-1;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);

  opacity:0.4



`;




const Nudity = styled.h4`
  font-size: 15px;
  margin-bottom: 10px;  
  color: black
`;

const Violence = styled.h4`
  font-size: 15px;
  margin-bottom: 10px;  
  color:black
`;

const Profanity = styled.h4`
  font-size: 15px;
  margin-bottom: 10px;  
  color: black
`;

const Alcohol_Smoking = styled.h4`
  font-size: 15px;
  margin-bottom: 15px;  
  color: black
`;






export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: id }
  });

  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Container bg={data?.movie?.poster} >
<Poster2 bg={data?.movie?.poster}></Poster2>
<Title className="Title">
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "💖" : " "}`}
        </Title>


      <Column>

        
        <Subtitle className="Subtitle">
        {data?.movie?.grade}·{data?.movie?.genres}· {data?.movie?.directors} · {data?.movie?.runtime}min· {data?.movie?.stars}
        </Subtitle>
        <Description>{data?.movie?.synopsis}</Description>
        <Nudity>Nudity: level {data?.movie?.nudity}</Nudity>
        <Violence>Violence: level {data?.movie?.violence}</Violence>
        <Profanity>Profanity: {data?.movie?.word}</Profanity>
        <Alcohol_Smoking>Alcohol &amp; Smoking: {data?.movie?.alcohol}</Alcohol_Smoking>
        <button className="button" onClick={openModal}>Specific Timeline &gt;</button>
        {
          modalVisible && <Timeline
          id={data.movie.id}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}></Timeline>
        }
  
        <Poster bg={data?.movie?.poster}></Poster>
        
        
        

      </Column>

      
      
      

    </Container>
  );
};