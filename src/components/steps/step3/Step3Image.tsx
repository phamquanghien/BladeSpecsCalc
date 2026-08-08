import React from 'react';

interface Step3ImageProps {
    src: string;
    alt: string;
    fallbackText?: string;
    maxHeight?: string;
}

export const Step3Image: React.FC<Step3ImageProps> = ({
    src,
    alt,
    fallbackText = 'Image',
    maxHeight = '500px',
}) => {
    return (
        <div className="container-fluid p-0">
            <div className="card border-0 shadow-sm p-3 mb-4">
                <div className="row g-3">
                    <div className="col-12 col-md-6 mx-auto">
                        <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-white rounded border p-2">
                            <img
                                src={src}
                                alt={alt}
                                className="img-fluid"
                                style={{
                                    maxHeight,
                                    width: '100%',
                                    objectFit: 'contain',
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        `https://via.placeholder.com/300x180?text=${encodeURIComponent(
                                            fallbackText,
                                        )}`;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
