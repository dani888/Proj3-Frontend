

const GifyDisplay = ({gify}) => {
    const loaded = () => {
    return (
      <>
      <br />
        <img src={gify.data.image_original_url} alt={gify.data.title} />
      </>
    );
  };
  
  const loading = () => {
    return <h3>Click To Display</h3>;
  };

  // ternary operator will determine which functions JSX we will return
  return gify ? loaded() : loading();
};
  // we must export the Component to use it in other files
  export default GifyDisplay;