import React from "react";
import Header from "../../../components/Header/Header";
import Nav from "../../../components/Nav/Nav";
import Footer from "../../../components/Footer/Footer";

function JobDetail({ post }) {
  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="bg-white p-5 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <h1 className="text-2xl font-bold text-teal-600 mb-2">
              {post.title}
            </h1>

            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {post.author}
              </p>
            </div>

            <p className="mb-6 text-gray-700 text-lg">{post.content}</p>

            {post.image && (
              <img
                src={post.image}
                alt="Job Detail"
                className="w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch(`http://haproxy/job/${params.id}`); // Adjust the URL to match your API endpoint.
  const post = await res.json();

  return {
    props: { post },
  };
}

export default JobDetail;
