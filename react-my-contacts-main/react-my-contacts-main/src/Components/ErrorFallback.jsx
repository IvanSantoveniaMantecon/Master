const ErrorFallback = ({ error }) => {
    return (
      <div className="tc pa4">
        <h2 className="f2 red">I am sorry. Something went wrong:</h2>
        <h3 className="f3">{error.message}</h3>
      </div>
    );
  };
  
  export default ErrorFallback;
  