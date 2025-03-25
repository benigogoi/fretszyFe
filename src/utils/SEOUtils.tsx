// src/utils/SEOUtils.tsx

// Remove the React import since we're not using any React features
// import React from 'react';

/**
 * Updates the document title
 * @param title The page-specific part of the title
 */
export const updateTitle = (title: string) => {
    document.title = `${title} | Fret Clever - Guitar Fretboard Trainer`;
};

/**
 * Sets the meta description tag
 * @param description The description text
 */
export const updateMetaDescription = (description: string) => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
};

/**
 * Updates both title and description
 */
export const updateSEO = (title: string, description: string) => {
    updateTitle(title);
    updateMetaDescription(description);
};

// No need to export default in this utility file