

const GifyDisplay = ({gify}) => {
    const loaded = () => {
    return (
      <>
        <br/>
        {/* <h1>{gify.data.title}</h1> */}
        <br/>
        <img src={gify.data.image_original_url} alt={gify.data.title} />
      </>
    );
  };
  
  const loading = () => {
    return <h1>Click To Display</h1>;
  };

  // ternary operator will determine which functions JSX we will return
  return gify ? loaded() : loading();
};
  // we must export the Component to use it in other files
  export default GifyDisplay;