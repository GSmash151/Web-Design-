import React from "react";
import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome";
import Card from "../components/Card";

const Home = () => {
  const trendingData = useSelector(state => state.movieApp.bannerData);
  const trendingResults = trendingData?.results || [];

  return (
    <div className="home-page">
      <BannerHome />

      {/* Section for displaying trending content cards */}
      <section className="px-2 sm:px-6 lg:px-8 py-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Trending Now</h2>
        {/* MODIFIED: Adjusted grid columns to make cards larger on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingResults.length > 0 ? (
            trendingResults.map((data) => (
              <Card key={data.id} data={data} mediaType={data.media_type} />
            ))
          ) : (
            <p className="text-white col-span-full text-center">No trending data available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
