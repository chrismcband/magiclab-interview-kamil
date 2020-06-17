import React from 'react';
import { TweetProps } from '../../interfaces';
import Styled from './Tweet.style';

const Tweet: React.FC<TweetProps> = (props) => {
  const { image, id, text, username } = props;
  return (
    <Styled.Wrap id={id.toString()}>
      <Styled.Avatar src={image} alt={`avatar for ${username}`} />
      <Styled.Content>
        <Styled.Name>{username}</Styled.Name>
        <Styled.Text>{text}</Styled.Text>
      </Styled.Content>
    </Styled.Wrap>
  );
};
// make sure we only rerender new elements
export default React.memo(Tweet);
