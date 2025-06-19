// Imports:
import useTvShows from "../../hooks/useTvShows";
import TvShowCard from "./TvShowCard";


const TvShowList = () => {
  const {tvShowList} = useTvShows();
  console.log(tvShowList)
  return (
    <div className="p-3 mb-4">
      <h1 className="text-4x1 font-semibold p-5 py-6" >TvShows</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-y-2" >
        {tvShowList?.map((tvShowList) => (
          <div key={tvShowList.id}>
            <TvShowCard tvShowResult={tvShowList} />
          </div>
        ))}
      </div>     
    </div>
  )
}

export default TvShowList
