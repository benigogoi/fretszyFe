// src/utils/SEOUtils.tsx

import React from 'react';

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

// Although this file doesn't export any React components,
// maintaining the .tsx extension keeps your project consistent
export default {};