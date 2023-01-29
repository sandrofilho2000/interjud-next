import React from 'react'

const LoadingOverlay = () => {
    return (
        <div className='overlay active loadingOverlay'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoadingOverlay