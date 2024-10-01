"use client";

import { createContext, useContext, useState } from "react";

const SidemenuContext = createContext<{
	open: boolean;
	setOpen: (open: boolean) => void;
}>({
	open: false,
	setOpen: () => {},
});

const SidemenuProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);

	return (
		<SidemenuContext.Provider value={{ open, setOpen }}>
			{children}
		</SidemenuContext.Provider>
	);
};

export const useSidemenu = () => {
	return useContext(SidemenuContext);
};

export default SidemenuProvider;
