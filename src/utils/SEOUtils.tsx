// src/utils/SEOUtils.tsx

export const updateTitle = (title: string) => {
    document.title = `${title}`;
  };
  
  export const updateMetaDescription = (description: string) => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  };
  
  export const updateCanonical = (canonicalUrl: string) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  };
  
  export const updateSEO = (title: string, description: string, canonicalUrl: string) => {
    updateTitle(title);
    updateMetaDescription(description);
    updateCanonical(canonicalUrl);
  };
  