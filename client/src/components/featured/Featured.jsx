import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  // creating a custom hook
  const {data,loading,error,reFetch} = useFetch("/hotels/countByCity?cities=kolkata,bhubaneshwar,varanasi,agra")

  return (
    <div className="featured">
    {
      loading ? "loading..." :( 
      <>
      <div className="featuredItem">
        <img
          src="https://www.savaari.com/blog/wp-content/uploads/2023/07/Kolkata-India-Victoria-Memorial1.webp"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kolkata</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/300x240/140018337.jpg?k=80836772ef94a6792b148e28a74f0055a7a1fda797517dac82c35106c5c71a2f&o=="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bhubaneshwar</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/300x240/140018255.jpg?k=baa51ba2ca902dbe99733badc9c9effac5ed25707d542afc3f806fb9d476e45a&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Varanasi</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/300x240/140018362.jpg?k=70bb068f5ad374af5d3f628260d998ab0dd71b7e0bfb1ddf53040be6fe8ea4f3&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Agra</h1>
          <h2>{data[3]} properties</h2>
        </div>
      </div>
      </>
      )
    }
    </div>
  );
};

export default Featured;
