//note - the example project I was referencing was doing it with TODOs.
//I have retained the names.
//in my project, I am consuming an API server of my own design.
//https://jay-study-nildana.github.io/RandomStuffDocs/

import React from 'react';
import styled from 'styled-components';

// NOTE : This file contains lot of code that is not actually used

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
        ? 'none'
        : '2px solid red')};
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;

const CompletedButton = styled(Button)`
    background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
    background-color: #ee2222;
    margin-left: 8px;
`;

//original CSS. compare this with the styled components above
// .todo-item-container {
//     background: #fff;
//     border-radius: 8px;
//     margin-top: 8px;
//     padding: 16px;
//     position: relative;
//     box-shadow: 0 4px 8px grey;
// }

// .buttons-container {
//     position: absolute;
//     right: 12px;
//     bottom: 12px;
// }

// button {
//     font-size: 16px;
//     padding: 8px;
//     border: none;
//     border-radius: 8px;
//     outline: none;
//     cursor: pointer;
// }

// .completed-button {
//     display: inline-block;
//     background-color: #22ee22;
// }

// .remove-button {
//     display: inline-block;
//     background-color: #ee2222;
//     margin-left: 8px;
// }

const RandomQuoteItem = ({ todo,inputValue }) => {
    //set the style for the display.
    // const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
    const Container = TodoItemContainer;
    return (
        <Container>
            {/* this is where you show your API response single items. */}
            <h3>{todo.quoteContent}</h3>
            <h4>{todo.quoteAuthor}</h4>
            <h4>{todo.quoteIdentifierString}</h4>
            <p>-------------------------------</p>
            <h4>{todo.quoteIdentifierCompadre}</h4>
            <h4>{todo.dateTimeOfResponse}</h4>
            <h4>{todo.detailsAboutOperation}</h4>
            <p>{inputValue}</p>
            {/* <p>
                Created at:&nbsp;
                {(new Date(todo.createdAt)).toLocaleDateString()}
            </p>
            <ButtonsContainer>
                {todo.isCompleted
                    ? null
                    : <CompletedButton
                        onClick={() => onCompletedPressed(todo.id)}
                        className="completed-button">Mark As Completed</CompletedButton>}
                <RemoveButton
                    onClick={() => onRemovePressed(todo.id)}
                    className="remove-button">Remove</RemoveButton>
            </ButtonsContainer> */}
        </Container>
    );
}

export default RandomQuoteItem;