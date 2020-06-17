import React from "react";
import { TweetProps } from "../../interfaces";
import Tweet from "../Tweet";
import Styled from "./TweetWrap.style";

interface TweetWrapProps {
  tweets: Array<TweetProps>;
  loadMore: Function;
}

const TweetWrap: React.FC<TweetWrapProps> = props => {
  const { tweets, loadMore } = props;
  // TODO: mayby add scroll to top button
  // TODO: implement Virtual list to improve performance
  return (
    <Styled.Wrap>
      {tweets.map(el => (
        <Tweet key={el.id} {...el} />
      ))}
      <button
        onClick={() => {
          loadMore();
        }}
      >
        Load more
      </button>
    </Styled.Wrap>
  );
};

export default TweetWrap;
