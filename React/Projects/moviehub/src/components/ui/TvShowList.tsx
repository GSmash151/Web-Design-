import useTvShows from "../../hooks/useTvShows"


const TvShowList = () => {
  const {tvShows} = useTvShows();
  console.log(tvShows)
  return (
    <div>
      Tv Shows List
    </div>
  )
}

export default TvShowList
