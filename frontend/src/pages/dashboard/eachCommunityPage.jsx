import { useParams } from "react-router-dom";
import Layout from "./components/Layout";
import RightRail from "./components/RightRail";

export default function EachCommunityPage() {
  const { communityId } = useParams();
  console.log(communityId);

  return (
    <Layout current="communities" right={<RightRail />}>
      <div>
        <h1>Community Details</h1>
        <p>Community ID: {communityId}</p>
      </div>
    </Layout>
  );
}
