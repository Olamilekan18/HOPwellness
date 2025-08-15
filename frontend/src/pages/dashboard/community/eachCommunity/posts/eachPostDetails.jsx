/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState } from "react";
import EachCommunityLayout from "../eachCommunityLayout";
export default function EachPostDetails() {
  const { communityId, postId } = useParams();
  const [loading, setLoading] = useState(false);
  return (
    <EachCommunityLayout communityId={communityId} setLoading={setLoading}>
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-4">
          Post Details for {postId}
        </h2>
        <p>Details for post {postId} will be displayed here.</p>
      </div>
    </EachCommunityLayout>
  );
}
