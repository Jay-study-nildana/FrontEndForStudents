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
        </Container>
    );
}