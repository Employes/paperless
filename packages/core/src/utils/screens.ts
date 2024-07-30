import screens from '../tailwind/theme/screens';

export type ScreenSize = keyof typeof screens;

export const getScreenSize = (size: ScreenSize) => screens[size];

export const getScreenSizeInRem = (size: ScreenSize) => {
	const screen = getScreenSize(size);
	return parseInt(screen.replace('rem', ''), 10);
};

export const getScreenSizeInPixels = (size: ScreenSize) => {
	const rem = getScreenSizeInRem(size);
	return rem * 16;
};

export const isBiggerThanScreen = (size: ScreenSize) => {
	const pixels = getScreenSizeInPixels(size);
	return window.innerWidth > pixels;
};

export const isSmallerThanScreen = (size: ScreenSize) => {
	const pixels = getScreenSizeInPixels(size);
	return window.innerWidth < pixels;
};

export const isBetweenScreens = (
	smallSize: ScreenSize,
	bigSize: ScreenSize
) => {
	return isBiggerThanScreen(smallSize) && isSmallerThanScreen(bigSize);
};

export const isTouchDevice = () =>
	!!window.matchMedia('(pointer: coarse)').matches;
export const isMobile = () => isTouchDevice() || isSmallerThanScreen('tablet');
export const isTablet = () => isBetweenScreens('tablet', 'desktop-xs');
export const isDesktop = () => isBiggerThanScreen('desktop-xs');
