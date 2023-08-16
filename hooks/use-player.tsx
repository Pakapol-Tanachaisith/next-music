import { useContext } from "react";
import { PlayerContext } from "@/contexts/player-context";

const usePlayerContext = () => useContext(PlayerContext);

export default usePlayerContext;
