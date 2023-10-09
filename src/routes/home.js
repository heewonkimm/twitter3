import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form.tsx";
import Timeline from "../components/timeline.tsx";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  /* overflow-y: scroll; */
  grid-template-rows: 1fr 5fr;
`;

function Home(){

  return (
    <Wrapper>
      <PostTweetForm/>
      <Timeline/>
    </Wrapper>
  )
}


export default Home