import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data,loading,error,reFetch} = useFetch("/hotels?featured=true&min=100&max=900")

  return (
    <div className="fp">
     {
      loading ? "loading..." : ( 
        <>
      {data.map((item,index)=>(
      <div className="fpItem" key={item._id}>
        <img
          src={item.photos[0]}
          // src="https://st4.depositphotos.com/35978980/39138/i/450/depositphotos_391388876-stock-photo-high-range-mountain-trees-view.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
    ))}
      </>
     )}
    </div>
  );
};

export default FeaturedProperties;
