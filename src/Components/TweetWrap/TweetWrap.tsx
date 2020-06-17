import React, { useRef, useEffect } from "react";
import { TweetProps } from "../../interfaces";
import Tweet from "../Tweet";
import Styled from "./TweetWrap.style";

interface TweetWrapProps {
  tweets: Array<TweetProps>;
  loadMore: Function;
  // setScrollTop: Function;
  toggleRunning: Function;
}

const TweetWrap: React.FC<TweetWrapProps> = props => {
  const { tweets, loadMore, toggleRunning } = props;
  const wrapRef = useRef();
  const childWrapRef = useRef();

  const setRunning = value => {
    if (childWrapRef && childWrapRef.current) {
      const childElement = childWrapRef.current;

      console.log("height", childElement.clientHeight);
      console.log("value", value);
      if (value === 0) {
        return toggleRunning(true);
      } else if (childElement.clientHeight === value) {
        return loadMore();
      }
      toggleRunning(false);
    }
  };

  useEffect(() => {
    if (wrapRef && wrapRef.current && childWrapRef && childWrapRef.current) {
      const currentElement = wrapRef.current;

      currentElement.addEventListener("scroll", e => {
        setRunning(currentElement.scrollTop);
      });
      return () => {
        currentElement.removeEventListener("scroll", e => {
          setRunning(currentElement.scrollTop);
        });
      };
    }
  });

  // TODO: mayby add scroll to top button
  // TODO: implement Virtual list to improve performance
  return (
    <Styled.Wrap ref={wrapRef}>
      <div ref={childWrapRef}>
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
      </div>
    </Styled.Wrap>
  );
};

export default TweetWrap;
