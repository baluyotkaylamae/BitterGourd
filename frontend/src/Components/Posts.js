// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const PostCard = ({ post }) => {
//     const [showFullDescription, setShowFullDescription] = useState(false);
//     const [reactions, setReactions] = useState(post.reactions || 0); // Initial reaction count

//     const toggleDescription = () => {
//         setShowFullDescription(!showFullDescription);
//     };

//     const handleReaction = () => {
//         setReactions(reactions + 1); // Increase reaction count on click
//     };

//     return (
//         <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
//             <div className="card product-cart-text prodcard-JSON">
//                 <img
//                     src={post.images[0].url}
//                     alt={post.name}
//                     className="card-img-top product-image"
//                 />
//                 <div className="card-body card-des">
//                     <h6 className="card-title card-title-des">
//                         {post.name}
//                     </h6>
//                     <p className="card-text">
//                         {showFullDescription ? post.description : post.description.slice(0, 100) + '...'}
//                     </p>
//                     <div className="reactions-comments-container">
//                         <div className="reactions">
//                             <button className="reaction-btn" onClick={handleReaction}>
//                                 Like
//                             </button>
//                             <span className="reaction-count">{reactions}</span>
//                         </div>
//                         <div className="comments">
//                             <Link to={`/posts/${post._id}`} className="comment-btn text-black">
//                                 Comment
//                             </Link>
//                         </div>
//                     </div>
//                     {!showFullDescription && (
//                         <Link to={`/posts/${post._id}`} className="btn json-button text-black">
//                             See More
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PostCard;
