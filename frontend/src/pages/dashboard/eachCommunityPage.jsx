import { useParams } from "react-router-dom";
export default function EachCommunityPage() {
  const { communityId } = useParams();
  console.log(communityId);

  return (
    <div>
      <h1>Community Details</h1>
      <p>Community ID: {communityId}</p>
    </div>
  );
}
