

const GifyDisplay = ({gify}) => {
    const loaded = () => {
      // console.log(gify.data.images.original.url)
    return (
      <>
      <br />
        <img src={gify.data.images.original.url} alt={gify.data.title} />
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