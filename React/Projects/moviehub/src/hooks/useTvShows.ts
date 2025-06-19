//Imports:
import apiClients from "../services/api-clients";
import { useEffect,useState } from "react";

export interface TvShowResult {
    adult : boolean;
    id : number;
    original_language : string;
    original_title : string;
    title : string;
    backdrop_path : string;
    poster_path : string;
    overview : string;
    name?: string;
}// Optional, in case the API returns it

const useTvShows = () => {
    // Function to fetch TV shows
    const [tvShowList, setTvShows] = useState<TvShowResult[]>([]);
    const fetchTvShows = async () => {
        try {
            const res = await apiClients.get('discover/tv');
            setTvShows(res.data.results);
            console.log(res.data.results);
        } catch (error) {
            console.error("Error fetching TV shows:", error);
            setTvShows([]);
        }
    };
    // Fetch TV shows when the component mounts
    // This useEffect will run once when the component is mounted
    useEffect(() => {
        fetchTvShows();
    }, []);
    // Return the list of TV shows
    return { tvShowList };
}

// Export the custom hook
export default useTvShows;