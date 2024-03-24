function getTagClass(tag) {
    switch (tag) {
        case "A":
            return "product-tag";
        case "B":
            return "copy-content-tag";
        case "SEO":
            return "seo-tag";
        case "C":
            return "legal-tag";
        case "Optimize":
            return "social-media-tag";
        case "Food":
            return "brainstorming-tag";
        default:
            return "";
    }
}
