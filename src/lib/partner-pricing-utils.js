import React from 'react';

export const calculatePrices = (prixPartenaireInput, commissionInput) => {
  const prixPartenaireStr = String(prixPartenaireInput === null || prixPartenaireInput === undefined ? "" : prixPartenaireInput).replace(',', '.')
  const commissionStr = String(commissionInput === null || commissionInput === undefined ? "" : commissionInput).replace(',', '.')

  const prixPartenaireNum = parseFloat(prixPartenaireStr)
  const commissionNum = parseFloat(commissionStr)
  
  if (!isNaN(prixPartenaireNum) && !isNaN(commissionNum)) {
    const prixRevendeur = (prixPartenaireNum * (1 + commissionNum / 100)).toFixed(2)
    const prixPublic = (parseFloat(prixRevendeur) * 1.2).toFixed(2)
    
    return {
      prix_revendeur: prixRevendeur.toString().replace('.', ','),
      prix_public: prixPublic.toString().replace('.', ',')
    }
  }
  
  return {
    prix_revendeur: '',
    prix_public: ''
  }
}