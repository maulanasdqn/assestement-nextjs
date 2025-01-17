import { useMediaQuery } from 'react-responsive';

/**
 * Custom hook to determine if the screen width is considered mobile.
 *
 * This hook uses a media query to check if the screen width is 767 pixels or less.
 *
 * @returns {boolean} - Returns `true` if the screen width is 767 pixels or less, otherwise `false`.
 */
export const useIsMobileScreen = (): boolean => {
  return useMediaQuery({ query: '(max-width: 767px)' });
};

/**
 * Capitalizes the first letter of a given string.
 *
 * @param text - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeFirstLetter = (text: string): string => {
  return text
    ? text?.charAt(0).toUpperCase() + text.toLowerCase().slice(1)
    : '';
};

/**
 * Capitalizes the first letter of each word in a sentence.
 *
 * @param sentences - The sentence to capitalize.
 * @returns The capitalized sentence.
 */
export const capitalizeSentence = (sentences: string): string => {
  return sentences
    ? sentences
        .toLowerCase()
        .split(' ')
        .map((text) => capitalizeFirstLetter(text))
        .join(' ')
    : '';
};

export const getWindowQueryParams = (name: string) => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).get(name);
  } else {
    return '';
  }
};

export const searchDropdownOptions = (
  input: string,
  option?: {
    label: string;
    value: string | boolean;
  }
) =>
  typeof option?.label === 'string'
    ? option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    : false;
