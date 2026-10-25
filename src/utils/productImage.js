export const getProductImage = (product, placeholder) => {

    return (
        product?.images?.find(img => img.primaryImage)?.url
        || product?.images?.[0]?.url
        || placeholder
    );
};