import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ProductsList from '@/components/ProductsList';
import { PageLayout } from '@/components/layout/PageLayout';

const StorePage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Boutique - MDO SERVICES</title>
        <meta name="description" content="Parcourez notre sélection de produits et solutions informatiques. Matériel, logiciels et services pour les professionnels." />
      </Helmet>
      <div className="pt-24 bg-slate-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Notre Boutique
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez notre catalogue de produits soigneusement sélectionnés pour répondre à vos besoins professionnels.
            </p>
          </motion.div>
          <ProductsList />
        </div>
      </div>
    </PageLayout>
  );
};

export default StorePage;