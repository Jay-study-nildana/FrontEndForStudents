import styled from 'styled-components';
import RandomQuoteList from './randomstuffgenerator/RandomQuoteList';

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;
    width: 100vw;
    height: 100vh;
`;

const App = () => (
  <AppContainer>
      <RandomQuoteList />
  </AppContainer>
);

export default App;
