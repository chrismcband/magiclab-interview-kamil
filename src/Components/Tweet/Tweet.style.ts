import styled from 'styled-components';

const Wrap = styled.div`
  color: #222;
  max-width: 700px;
  min-height: 128px;
  position: relative;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
  padding: 10px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Text = styled.div`
  margin-top: 16px;
`;

const Avatar = styled.img`
  border-radius: 300px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Content = styled.div`
  margin-left: 150px;
  text-align: left;
`;

export default { Wrap, Avatar, Content, Name, Text };
