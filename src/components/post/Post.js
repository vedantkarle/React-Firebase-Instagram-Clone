import { useRef } from "react";
import Actions from "./Actions";
import Comments from "./Comments";
import Footer from "./Footer";
import Header from "./Header";
import Image from "./Image";

const Post = ({ photo }) => {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={photo?.username} />
      <Image src={photo?.imageSrc} caption={photo?.caption} />
      <Actions
        docId={photo?.id}
        totalLikes={photo?.likes?.length || 0}
        likedPhoto={photo?.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={photo?.caption} username={photo?.username} />
      <Comments
        docId={photo?.id}
        comments={photo?.comments}
        posted={photo?.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
