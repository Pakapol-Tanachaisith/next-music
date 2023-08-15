import { create } from "zustand";

interface PlaylistModalStore {
  isOpen: boolean;
  onOpen: (props?: OnOpenProps) => void;
  onClose: () => void;
  songId?: string | number;
}

interface OnOpenProps {
  songId?: string | number;
  playlistId?: string | number;
}

const usePlaylistModal = create<PlaylistModalStore>()((set) => ({
  isOpen: false,
  onOpen: (props) => set({ isOpen: true, songId: props?.songId }),
  onClose: () => set({ isOpen: false }),
}));

export default usePlaylistModal;
