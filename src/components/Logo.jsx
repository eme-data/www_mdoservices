import React from 'react'

export function Logo({ className, showText = false, textColorClassName = "text-slate-800 dark:text-white" }) {
  const userProvidedLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/c6eaeb59-1bb1-4c06-acf1-ad5cbbeaa73c/e7f98b528bb286a74840bdddbbca16d0.png";
  
  return (
    <div className={`flex items-center ${className}`}>
      <img src={userProvidedLogoUrl} alt="MDO SERVICES Logo" className="h-full w-auto" />
      {showText && (
        <span className={`ml-2 font-semibold text-lg ${textColorClassName}`}>
          MDO SERVICES
        </span>
      )}
    </div>
  )
}