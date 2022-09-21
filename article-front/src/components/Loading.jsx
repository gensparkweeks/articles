import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div >
        <div className='altura'></div>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        <span> Loading...</span>
        <div className='altura'></div>
    </div>
    
  );
}

export default Loading;